import { openDb } from "@/db";
import { v4 as uuidv4 } from "uuid";

export type RobotType = "industrial" | "service" | "medical" | "educational" | "other";

export interface Robot {
    id: string;
    name: string;
    label: string;
    year: number;
    type: RobotType;
    created_at: number;
    updated_at: number;
    archived?: boolean; // v3
}

const mapRow = (r: any): Robot => ({
    ...r,
    archived: !!r.archived,
});

export async function listRobots(opts?: { includeArchived?: boolean; q?: string }) {
    const db = await openDb();
    const where: string[] = [];
    const params: any[] = [];

    if (!opts?.includeArchived) where.push("archived = 0");
    if (opts?.q) {
        where.push("(name LIKE ? OR label LIKE ?)");
        params.push(`%${opts.q}%`, `%${opts.q}%`);
    }
    const sql = `
        SELECT id, name, label, year, type, created_at, updated_at, archived
        FROM robots
        ${where.length ? "WHERE " + where.join(" AND ") : ""}
        ORDER BY updated_at DESC;
    `;
    const rows = await db.getAllAsync<any>(sql, params);
    return rows.map(mapRow);
}

export async function getRobot(id: string) {
    const db = await openDb();
    const row = await db.getFirstAsync<any>(
        "SELECT id, name, label, year, type, created_at, updated_at, archived FROM robots WHERE id=?",
        [id]
    );
    return row ? mapRow(row) : null;
}

export async function createRobot(input: Omit<Robot, "id" | "created_at" | "updated_at">) {
    const db = await openDb();
    const now = Date.now();
    const id = uuidv4();

    // unicité stricte (trim/lower)
    const nameNorm = input.name.trim().toLowerCase();
    const existing = await db.getFirstAsync<any>("SELECT id FROM robots WHERE lower(trim(name)) = ?", [nameNorm]);
    if (existing) throw new Error("Un robot avec ce nom existe déjà");

    await db.runAsync(
        `INSERT INTO robots (id, name, label, year, type, created_at, updated_at, archived) VALUES (?,?,?,?,?,?,?,?)`,
        [id, input.name, input.label, input.year, input.type, now, now, input["archived"] ? 1 : 0]
    );
    return await getRobot(id);
}

export async function updateRobot(input: Robot) {
    const db = await openDb();
    const now = Date.now();

    // unicité (hors soi)
    const nameNorm = input.name.trim().toLowerCase();
    const clash = await db.getFirstAsync<any>(
        "SELECT id FROM robots WHERE lower(trim(name))=? AND id<>?",
        [nameNorm, input.id]
    );
    if (clash) throw new Error("Un robot avec ce nom existe déjà");

    await db.runAsync(
        `UPDATE robots SET name=?, label=?, year=?, type=?, updated_at=?, archived=? WHERE id=?`,
        [input.name, input.label, input.year, input.type, now, input.archived ? 1 : 0, input.id]
    );
    return await getRobot(input.id);
}

export async function deleteRobot(id: string) {
    const db = await openDb();
    await db.runAsync("DELETE FROM robots WHERE id=?", [id]);
}

export async function archiveRobot(id: string, archived = true) {
    const db = await openDb();
    const now = Date.now();
    await db.runAsync("UPDATE robots SET archived=?, updated_at=? WHERE id=?", [archived ? 1 : 0, now, id]);
    return await getRobot(id);
}

/** Export/Import JSON — pratique pour la synchro backend plus tard */
export async function exportRobotsToJson(): Promise<string> {
    const all = await listRobots({ includeArchived: true });
    const payload = JSON.stringify({ robots: all }, null, 2);
    // Sauvegarde dans un fichier si tu veux, sinon renvoie la string
    return payload;
}

export async function importRobotsFromJson(json: string) {
    const db = await openDb(); // ou openDatabase si tu as renommé
    const data = JSON.parse(json) as { robots: Robot[] };

    await db.withTransactionAsync(async () => {
        for (const r of data.robots) {
            // upsert naïf
            const found = await db.getFirstAsync("SELECT id FROM robots WHERE id=?", [r.id]);

            if (found) {
                await db.runAsync(
                    `UPDATE robots
             SET name=?, label=?, year=?, type=?, created_at=?, updated_at=?, archived=?
           WHERE id=?`,
                    [r.name, r.label, r.year, r.type, r.created_at, r.updated_at, r.archived ? 1 : 0, r.id]
                );
            } else {
                await db.runAsync(
                    `INSERT INTO robots
             (id, name, label, year, type, created_at, updated_at, archived)
           VALUES (?,?,?,?,?,?,?,?)`,
                    [r.id, r.name, r.label, r.year, r.type, r.created_at, r.updated_at, r.archived ? 1 : 0]
                );
            }
        }
    });
}

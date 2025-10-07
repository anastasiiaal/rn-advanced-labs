import * as FileSystem from "expo-file-system/legacy";
import { Photo } from "./types";

/** Dossier racine : documentDirectory en priorité, sinon cacheDirectory. */
const ROOT_DIR = (FileSystem.documentDirectory ?? FileSystem.cacheDirectory)!;
const PHOTOS_DIR = ROOT_DIR.replace(/\/+$/, "") + "/photos";

/** S'assure que le dossier /photos existe. */
async function ensureDir() {
    const info = await FileSystem.getInfoAsync(PHOTOS_DIR);
    if (!info.exists) {
        await FileSystem.makeDirectoryAsync(PHOTOS_DIR, { intermediates: true });
    }
}

function getExtFromUri(uri: string) {
    const m = uri.match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
    return (m?.[1] || "jpg").toLowerCase();
}

function join(...parts: string[]) {
    const [head, ...rest] = parts;
    return [head!.replace(/\/+$/, ""), ...rest.map((p) => p.replace(/^\/+/, ""))].join("/");
}

function toMs(modOrSec: number) {
    // certaines plateformes renvoient des secondes
    return modOrSec > 10_000_000_000 ? modOrSec : Math.round(modOrSec * 1000);
}

async function statCreatedAtAndSize(uri: string) {
    const info = await FileSystem.getInfoAsync(uri);
    // champs non typés dans certaines defs TS legacy :
    const mod =
        (info as any).modificationTime ??
        (info as any).lastModified ??
        Date.now();
    const size = typeof (info as any).size === "number" ? (info as any).size : undefined;
    return { createdAt: toMs(mod), size };
}

async function resolveById(id: string): Promise<string | null> {
    const candidates = [`${id}.jpg`, `${id}.jpeg`, `${id}.png`].map((f) => join(PHOTOS_DIR, f));
    for (const uri of candidates) {
        const info = await FileSystem.getInfoAsync(uri);
        if (info.exists) return uri;
    }
    return null;
}

export async function savePhoto(tempUri: string): Promise<Photo> {
    await ensureDir();
    const id = String(Date.now());
    const ext = getExtFromUri(tempUri);
    const dest = join(PHOTOS_DIR, `${id}.${ext}`);

    // on copie la photo dans notre sandbox durable
    await FileSystem.copyAsync({ from: tempUri, to: dest });

    const { createdAt, size } = await statCreatedAtAndSize(dest);
    return { id, uri: dest, createdAt, size };
}

export async function listPhotos(): Promise<Photo[]> {
    await ensureDir();
    const files = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    const items = await Promise.all(
        files
            .filter((f) => /\.(jpg|jpeg|png)$/i.test(f))
            .map(async (file) => {
                const uri = join(PHOTOS_DIR, file);
                const { createdAt, size } = await statCreatedAtAndSize(uri);
                const id = file.replace(/\.(jpg|jpeg|png)$/i, "");
                return { id, uri, createdAt, size } as Photo;
            })
    );
    return items.sort((a, b) => b.createdAt - a.createdAt);
}

export async function getPhoto(id: string): Promise<Photo | null> {
    const uri = await resolveById(id);
    if (!uri) return null;
    const { createdAt, size } = await statCreatedAtAndSize(uri);
    return { id, uri, createdAt, size };
}

export async function deletePhoto(id: string): Promise<void> {
    const uri = await resolveById(id);
    if (!uri) return;
    await FileSystem.deleteAsync(uri, { idempotent: true });
}

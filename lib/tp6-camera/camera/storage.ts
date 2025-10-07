// Fallback “INDEX MODE” : pas de documentDirectory/cacheDirectory requis.
// On garde la signature (savePhoto, listPhotos, getPhoto, deletePhoto) inchangée.

import * as FileSystem from "expo-file-system/legacy";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Photo } from "./types";

// Clé de l’index persistant
const INDEX_KEY = "@photos_index_v1";

// Utilitaires index
async function loadIndex(): Promise<Photo[]> {
    try {
        const raw = await AsyncStorage.getItem(INDEX_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw) as Photo[];
        // sécurité: filtre les entrées malformées
        return parsed.filter((p) => p && typeof p.id === "string" && typeof p.uri === "string");
    } catch {
        return [];
    }
}

async function saveIndex(list: Photo[]) {
    await AsyncStorage.setItem(INDEX_KEY, JSON.stringify(list));
}

// Normalise la date de création depuis FileSystem.getInfoAsync
function normalizeCreatedAt(info: any): number {
    const mod =
        info?.modificationTime ??
        info?.lastModified ??
        Date.now();
    // certaines plateformes donnent des secondes → *1000
    return mod > 10_000_000_000 ? mod : Math.round(mod * 1000);
}

async function statOrNull(uri: string): Promise<{ createdAt: number; size?: number } | null> {
    try {
        const info = await FileSystem.getInfoAsync(uri);
        if (!info.exists) return null;
        const createdAt = normalizeCreatedAt(info as any);
        const size = typeof (info as any).size === "number" ? (info as any).size : undefined;
        return { createdAt, size };
    } catch {
        return null;
    }
}

/**
 * Enregistre une photo dans l’index à partir de l’URI retournée par la caméra.
 * ⚠️ On ne déplace pas le fichier : on référence son URI (toujours locale).
 */
export async function savePhoto(tempUri: string): Promise<Photo> {
    const id = String(Date.now());
    const info = await statOrNull(tempUri);
    const photo: Photo = {
        id,
        uri: tempUri,
        createdAt: info?.createdAt ?? Date.now(),
        size: info?.size,
    };

    const list = await loadIndex();
    await saveIndex([photo, ...list]);
    return photo;
}

/**
 * Liste des photos depuis l’index (et nettoyage des URIs cassées).
 */
export async function listPhotos(): Promise<Photo[]> {
    const list = await loadIndex();
    // Nettoie les entrées dont le fichier n’existe plus
    const checked = await Promise.all(
        list.map(async (p) => {
            const st = await statOrNull(p.uri);
            if (!st) return null;
            return { ...p, createdAt: st.createdAt, size: st.size } as Photo;
        })
    );
    const ok = checked.filter((x): x is Photo => !!x);
    // Tri: plus récentes d’abord
    ok.sort((a, b) => b.createdAt - a.createdAt);
    // Si on a supprimé des entrées cassées, on persiste le ménage
    if (ok.length !== list.length) await saveIndex(ok);
    return ok;
}

/**
 * Récupère une photo par id depuis l’index (et vérifie l’existence du fichier).
 */
export async function getPhoto(id: string): Promise<Photo | null> {
    const list = await loadIndex();
    const p = list.find((x) => x.id === id);
    if (!p) return null;
    const st = await statOrNull(p.uri);
    if (!st) {
        // fichier manquant → purge
        await saveIndex(list.filter((x) => x.id !== id));
        return null;
    }
    return { ...p, createdAt: st.createdAt, size: st.size };
}

/**
 * Supprime le fichier cible si présent + enlève l’entrée de l’index.
 */
export async function deletePhoto(id: string): Promise<void> {
    const list = await loadIndex();
    const p = list.find((x) => x.id === id);
    const next = list.filter((x) => x.id !== id);
    await saveIndex(next);

    if (p) {
        try {
            await FileSystem.deleteAsync(p.uri, { idempotent: true });
        } catch {
            // ignore si déjà supprimé
        }
    }
}

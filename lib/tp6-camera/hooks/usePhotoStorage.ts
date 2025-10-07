import { useCallback, useEffect, useState } from "react";
import { Photo } from "../camera/types";
import { listPhotos, savePhoto as save, deletePhoto as remove } from "../camera/storage";

export function usePhotoStorage() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(false);

    const refresh = useCallback(async () => {
        setLoading(true);
        try {
            const data = await listPhotos();
            setPhotos(data);
        } finally {
            setLoading(false);
        }
    }, []);

    const savePhoto = useCallback(async (tempUri: string) => {
        const p = await save(tempUri);
        setPhotos((prev) => [p, ...prev]);
        return p;
    }, []);

    const deletePhoto = useCallback(async (id: string) => {
        await remove(id);
        setPhotos((prev) => prev.filter((p) => p.id !== id));
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return { photos, loading, refresh, savePhoto, deletePhoto };
}

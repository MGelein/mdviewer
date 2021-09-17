import { promises, statSync } from "fs";
import { join } from "path";

const { readdir } = promises;

export async function isDirEmpty(url: string) {
    return (await listFiles(url)).length < 1;
}

export async function listFiles(url: string) {
    return await readdir(url);
}

export function getFileType(url: string, baseDir: string | null) {
    const parts = url.split('.');
    const extension = parts[parts.length - 1];
    if (extension !== url) {
        const ext = extension.toLowerCase();
        if (ext in iconMappings) return iconMappings[ext];
        return 'file';
    }

    if (!baseDir) return 'file';
    const path = join(baseDir, url);
    const stats = statSync(path);
    if (stats.isDirectory()) return 'directory';
    return 'file';
}

export const typeToIcon = (type: string) => {
    if (type in iconMappings) return iconMappings[type];
    return 'help';
}

const iconMappings: Record<string, string> = {
    'directory': 'chevron_right',
    'file': 'insert_drive_file',
    'md': 'article',
}
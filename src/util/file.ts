import { promises, statSync } from "fs";
import { join } from "path";

const { readdir, readFile, writeFile } = promises;

export async function isDirEmpty(url: string) {
    return (await listFiles(url)).length < 1;
}

export async function listFiles(url: string) {
    return await readdir(url);
}

export async function loadFile(url: string, baseDir: string) {
    const path = join(baseDir, url);
    const data = await readFile(path, { encoding: 'utf8' });
    return data;
}

export async function saveFile(url: string, baseDir: string, data: string) {
    return writeFile(join(baseDir, url), data, { encoding: 'utf-8' });
}

export function saveMarkdown(focusFile: string | null, workdir: string | null) {
    const markdownElement = document.querySelector('.md-edit__markdown') as HTMLDivElement;
    if (!markdownElement || !focusFile || !workdir) return;

    saveFile(focusFile, workdir, markdownElement.innerText);
}

export function getFileType(url: string, baseDir: string | null) {
    const parts = url.split('.');
    const extension = parts[parts.length - 1];
    if (extension !== url) {
        const ext = extension.toLowerCase();
        if (iconMappings[ext]) return ext;
        return 'file';
    }

    if (!baseDir) return 'file';
    const path = join(baseDir, url);
    const stats = statSync(path);
    if (stats.isDirectory()) return 'directory';
    return 'file';
}

export function canOpenFileType(type: string) {
    if (type === 'md') return true;
    return false;
}

export const typeToIcon = (type: string) => {
    if (type in iconMappings) return iconMappings[type];
    return iconMappings.file;
}

const iconMappings: Record<string, string> = {
    'directory': 'chevron_right',
    'file': 'insert_drive_file',
    'md': 'article',
}
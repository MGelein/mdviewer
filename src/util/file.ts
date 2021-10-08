import { promises, statSync, existsSync } from "fs";
import { join, dirname, sep } from "path";
import templates from "./templates";

const { readdir, readFile, writeFile, unlink, mkdir } = promises;

export async function isDirEmpty(url: string) {
    return (await listFiles(url)).length < 1;
}

export async function listFiles(url: string) {
    return await readdir(url);
}

export async function createTemplateFolder(baseDir: string) {
    await mkdir(join(baseDir, 'templates'));
    const templateNames = Object.keys(templates);
    templateNames.forEach(name => {
        writeFile(join(baseDir, 'templates', name + '.md'), templates[name], { encoding: 'utf8' });
    });
}

export function hasTemplateFolder(baseDir: string) {
    return fileExists('templates', baseDir);
}

export async function loadTemplates(baseDir: string) {
    return await listFiles(`${baseDir}/templates/`);
}

export async function loadTemplate(name: string, baseDir: string) {
    const path = join(baseDir, 'templates', name.toLowerCase() + '.md');
    if (existsSync(path)) return await readFile(path, { encoding: 'utf8' });
    return '\n';
}

export async function removeFile(url: string, baseDir: string) {
    const path = join(baseDir, url);
    return await unlink(path).catch(() => { });
}

export async function createFileFromTemplate(name: string, templateName: string, baseDir: string | null) {
    if (!baseDir) return;
    const template = (await loadTemplate(templateName, baseDir)).replace(/%%FILENAME%%/gi, name);
    const path = join(baseDir, name.toLowerCase().replace(/\s/g, '-') + ".md");
    await writeFile(path, template, { encoding: 'utf8' });
    return path.replace(dirname(path) + sep, '');
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

export function fileExists(name: string, workdir: string | null) {
    if (!workdir) return false;
    const names = [name, name.toLowerCase().replace(/\s/g, '-')]
    const extended = [...names.map(name => name + '.md'), ...names];
    return !!extended.find(name => existsSync(join(workdir, name)));
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
import { promises } from "fs"

const { readdir } = promises;

export async function isDirEmpty(url: string) {
    return (await listFiles(url)).length < 1;
}

export async function listFiles(url: string) {
    return await readdir(url);
}
export function setLocalStorage<T>(name: string, value: T) {
    localStorage.setItem(name, JSON.stringify(value));
}

export function getLocalStorage<T>(name: string, defaultValue: T) {
    const jsonString = localStorage.getItem(name);
    if (!jsonString) return null;
    return (JSON.parse(jsonString) ?? defaultValue) as T;
}
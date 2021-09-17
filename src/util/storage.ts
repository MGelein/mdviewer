export function setLocalStorage<T>(name: string, value: T) {
    localStorage.setItem(name, JSON.stringify(value));
}

export function getLocalStorage<T>(name: string, defaultValue: T) {
    const jsonString = localStorage.getItem(name);
    if (!jsonString) {
        setLocalStorage(name, defaultValue);
        return null;
    };
    const jsonValue = JSON.parse(jsonString);
    if (jsonValue === null) return defaultValue;
    return jsonValue as T;
}
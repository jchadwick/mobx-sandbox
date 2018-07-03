export const AppCache = {

    clear() {
        localStorage.clear();
    },

    get<T>(key: string) {
        const serialized = localStorage.getItem(key);
        return serialized == null ? null : JSON.parse(serialized);
    },

    set<T>(key: string, value: T) {
        const serialized = value == null ? null : JSON.stringify(value);
        localStorage.setItem(key, serialized);
    }
}
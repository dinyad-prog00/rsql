const LocalStorageService = {
    setObject: function (key: string, value: any) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error storing object in localStorage:', error);
        }
    },
    getObject: function (key: string) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error('Error retrieving object from localStorage:', error);
            return null;
        }
    },
    removeObject: function (key: string) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing object from localStorage:', error);
        }
    }
};

export default LocalStorageService




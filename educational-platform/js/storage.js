// storage.js - Local storage utilities
const Storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Error saving to localStorage', e);
        }
    },

    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Error reading from localStorage', e);
            return null;
        }
    },

    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Error removing from localStorage', e);
        }
    },

    clear: () => {
        try {
            localStorage.clear();
        } catch (e) {
            console.error('Error clearing localStorage', e);
        }
    }
};
export const API_ROOT = "https://jsonplaceholder.typicode.com";

// these functions return the api urls
export const API_URLS = {
    fetchContacts : () => `${API_ROOT}/users`,
    addContact: () => `${API_ROOT}/users`,
    fetchContact: (userId) => `${API_ROOT}/users/${userId}`,
    editContact: (userId) => `${API_ROOT}/users/${userId}`,
    removeContact: (userId) => `${API_ROOT}/users/${userId}`
};

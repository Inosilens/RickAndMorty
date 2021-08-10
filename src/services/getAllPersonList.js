export const getAllPersonList = (apiUrl) => {
    return fetch(apiUrl).then((response) => response.json());
};
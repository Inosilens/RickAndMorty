export const getFilmInfo = (filmApi) => {
    return fetch(filmApi).then((response) => response.json());
};
export const getListFilms = (page) => {
    return fetch(`https://rickandmortyapi.com/api/episode/?page=${page}`).then((response) => response.json());
};
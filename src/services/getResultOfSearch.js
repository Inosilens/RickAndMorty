export const getResultOfSearch = (page,urlSearch,searchInput) => {
    return fetch(`https://rickandmortyapi.com/api/character/?page=${page + urlSearch + searchInput}`).then((response) => response.json());
};
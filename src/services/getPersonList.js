const getPersonList = (page) => {
    return fetch(`https://rickandmortyapi.com/api/character/?page=${page}`).then((response) => response.json());
};

export default getPersonList;

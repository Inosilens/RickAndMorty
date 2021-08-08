const defaultState = {
    data: [],
    infoFilmsData:""

};

const GET_DATA_FILMS = "GET_DATA";
const GET_INFO_FILM = "GET_INFO_FILM"


export const dataFilmsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_DATA_FILMS:
            return { ...state, data: [...action.payload] };
        case GET_INFO_FILM :
            return {...state,infoFilmsData:action.payload}


        default:
            return state;
    }
};

export const getDataFilmsAction = (payload) => ({
    type: GET_DATA_FILMS,
    payload,
});
export const getDataFilmInfoAction = (payload) => ({
    type: GET_INFO_FILM,
    payload,
});



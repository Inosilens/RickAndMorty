const defaultState = {
    data: [],
    inputValue: "",
    currentPersonInfo: "",
    activeDrop : [],
    loading : false
};

const GET_DATA = "GET_DATA";
const GET_INPUT = "GET_INPUT";
const GET_INFO = "GET_INFO";
const SET_ACTIVE_DROP = "SET_ACTIVE_DROP";
const SET_LOADING = "SET_LOADING"

export const dataReducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_DATA:
            return {...state, data: [...action.payload]};
        case GET_INPUT:
            return {...state, inputValue: action.payload};
        case GET_INFO:
            return {...state, currentPersonInfo: action.payload};
        case SET_ACTIVE_DROP:
            return {...state, activeDrop: action.payload};
        case SET_LOADING :
            return {...state, loading: action.payload}
        default:
            return state;
    }
};

export const getDataAction = (payload) => ({
    type: GET_DATA,
    payload,
});

export const getInputAction = (payload) => ({
    type: GET_INPUT,
    payload,
});
export const getInfoPerson = (payload) => ({
    type: GET_INFO,
    payload,
});

export const changeDrop = (payload) => ({
    type: SET_ACTIVE_DROP,
    payload,
});
export const setLoadingAction = (payload) => ({
    type: SET_LOADING,
    payload,
});




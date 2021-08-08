const defaultState = {
    currentPage : 1,
    allPages : 0
}

const CHANGE_PAGE = "CHANGE_PAGE"
const GET_ALL_PAGES = "GET_ALL_PAGES"

export const paginationReducer = (state = defaultState,action)=>{
    switch (action.type){
        case CHANGE_PAGE : return {...state,currentPage: action.payload}
        case GET_ALL_PAGES : return {...state, allPages: action.payload}


        default: return state
    }
}

export const changePageAction = (payload) => ({
    type:CHANGE_PAGE,
    payload
})

export const getAllPagesAction = (payload) => ({
    type:GET_ALL_PAGES,
    payload
})
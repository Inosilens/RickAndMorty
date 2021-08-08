const defaultState = {
  data: [],
  inputValue: "",
};

const GET_DATA = "GET_DATA";
const GET_INPUT = "GET_INPUT";

export const dataReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_DATA:
      return { ...state, data: [...action.payload] };
    case GET_INPUT:
      return { ...state, inputValue: action.payload };

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

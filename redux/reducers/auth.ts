import * as t from "../constants/index";

const initState = {
  loading: false,
  error: null,
  dataSignUp: null,
  loadingSignUp: false,
};

const auth = (state = initState, action: any) => {
  switch (action.type) {
    case t.REGISTER:
      return {
        ...state,
        dataSignUp: action.payload,
        loadingSignUp: false,
        loading: false,
        error: null,
      };
    case t.CLEAR_DATA:
      return {
        ...state,
        [action.payload]: null,
        loading: false,
        error: null,
      };
    case t.LOADING:
      return {
        ...state,
        loading: action.payload,
        loadingSignUp: action?.loadingSignUp
      };
    case t.ERROR:
      return {
        ...state,
        error: action.payload,
        loadingSignUp: false,
        loading: false
      };
    default:
      return { ...state };
  }
};

export default auth;

import { GET_HISTORY, START_GET_HISTORY } from "../../actions/types";

const initialState = {
  history: [],
  loaded: false,
  pages: 0,
  current_page: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_HISTORY:
      return {
        ...state,
        history: action.history,
        loaded: true,
        pages: action.pages,
        current_page: action.current_page
      };
    case START_GET_HISTORY:
      return {
        ...state,
        loaded: false
      };

    default:
      return state;
  }
}

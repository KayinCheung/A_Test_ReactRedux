import { GET_HISTORY, START_GET_HISTORY } from "../../actions/types";
import historyReducer from "./index";

describe("History Reducer", () => {
  it("Should return default state", () => {
    const newState = historyReducer(undefined, {});
    expect(newState).toEqual({
      history: [],
      loaded: false,
      pages: 0,
      current_page: 0
    });
  });

  it("GET_HISTORY should return payload as new state", () => {
    const payload = {
      history: [1, 2, 3, 4, 5],
      loaded: true,
      pages: 7,
      current_page: 5
    };
    const newState = historyReducer(undefined, {
      type: GET_HISTORY,
      ...payload
    });
    expect(newState).toEqual({
      history: [1, 2, 3, 4, 5],
      loaded: true,
      pages: 7,
      current_page: 5
    });
  });

  it("START_GET_HISTORY should return current state, but with loaded = false", () => {
    const currentState = {
      history: [1, 2, 3, 4, 5],
      loaded: true,
      pages: 7,
      current_page: 5
    };
    const newState = historyReducer(currentState, {
      type: START_GET_HISTORY
    });
    expect(newState).toEqual({
      history: [1, 2, 3, 4, 5],
      loaded: false,
      pages: 7,
      current_page: 5
    });
  });
});

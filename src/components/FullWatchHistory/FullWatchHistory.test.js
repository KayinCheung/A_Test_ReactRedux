import React from "react";
import FullWatchHistory from "./index";

import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { mockHistoryData } from "../../mock";

import rootReducer from "../../reducers/index";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router";

configure({ adapter: new Adapter() });

const middleware = [thunk];

/*
3 Tests

1) 10 History entries provided.
2) 5 History entries provided.
3) 0 History entries provided

Test expectationns
1) All 3 tests expect the outer most div to render
2) Test 1 and 2 expects the Table to render. Test 3 expects no table to render
3) Test 1 and 2 expects the number of table rows rendered to equal number of history entries provided. Test 3 should have no rows rendered
*/
describe("Full Watch History Component", () => {
  describe("10 History entries provided", () => {
    const initialState = {
      history: {
        history: mockHistoryData,
        loaded: true,
        pages: 9,
        current_page: 1
      }
    };

    const teststore = createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(...middleware))
    );
    const component = mount(
      <MemoryRouter initialEntries={["/history"]}>
        <FullWatchHistory store={teststore} />
      </MemoryRouter>
    );

    //Ensure the div containing data-test='FullWatchHistory' is rendered once
    it("FullWatchHistory container should render", () => {
      const FullWatchHistoryComponent = component.find(
        `[data-test='FullWatchHistory']`
      );
      expect(FullWatchHistoryComponent.length).toBe(1);
    });

    //Table should render
    it(`FullWatchHistory should have a table rendered`, () => {
      const historyTableComponent = component.find(
        `[data-test='HistoryTable']`
      );
      expect(historyTableComponent.length).toBe(1);
    });

    //If there's 10 history, ensure table rows have 10 history
    it(`FullWatchHistory should render 10 history entries`, () => {
      const historyComponents = component.find(`[data-test='HistoryTableRow']`);
      expect(historyComponents.length).toBe(10);
    });
  });

  describe("5 History entries provided", () => {
    let fiveMockHistory = JSON.parse(JSON.stringify(mockHistoryData));
    fiveMockHistory = fiveMockHistory.slice(0, 5);

    const initialState = {
      history: {
        history: fiveMockHistory,
        loaded: true,
        pages: 9,
        current_page: 1
      }
    };

    const teststore = createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(...middleware))
    );
    const component = mount(
      <MemoryRouter initialEntries={["/history"]}>
        <FullWatchHistory store={teststore} />
      </MemoryRouter>
    );

    //Ensure the div containing data-test='FullWatchHistory' is rendered once
    it("FullWatchHistory container should render", () => {
      const FullWatchHistoryComponent = component.find(
        `[data-test='FullWatchHistory']`
      );
      expect(FullWatchHistoryComponent.length).toBe(1);
    });

    //Table should render
    it(`FullWatchHistory should have a table rendered`, () => {
      const historyTableComponent = component.find(
        `[data-test='HistoryTable']`
      );
      expect(historyTableComponent.length).toBe(1);
    });

    //If there's 5 history, ensure table rows have 5 history
    it(`FullWatchHistory should render 5 history entries`, () => {
      const historyComponents = component.find(`[data-test='HistoryTableRow']`);
      expect(historyComponents.length).toBe(5);
    });
  });

  describe("EMPTY History in store", () => {
    const initialState = {
      history: {
        history: [],
        loaded: true,
        pages: 0,
        current_page: 0
      }
    };

    const teststore = createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(...middleware))
    );
    const component = mount(
      <MemoryRouter initialEntries={["/history"]}>
        <FullWatchHistory store={teststore} />
      </MemoryRouter>
    );

    //Ensure the div containing data-test='FullWatchHistory' is rendered once
    it("FullWatchHistory container should render", () => {
      const FullWatchHistoryComponent = component.find(
        `[data-test='FullWatchHistory']`
      );
      expect(FullWatchHistoryComponent.length).toBe(1);
    });

    //If there's NO history, the table itself should not render
    it(`FullWatchHistory should NOT have a table rendered`, () => {
      const historyTableComponent = component.find(
        `[data-test='HistoryTable']`
      );
      expect(historyTableComponent.length).toBe(0);
    });

    //If there's NO history, ensure table rows have 0 history
    it(`FullWatchHistory should render ZERO history entries`, () => {
      const historyComponents = component.find(`[data-test='HistoryTableRow']`);
      expect(historyComponents.length).toBe(0);
    });
  });
});

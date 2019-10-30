import React from "react";
import Carousell from "./index";

import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { mockEntries } from "../../mock";

import rootReducer from "../../reducers/index";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { MemoryRouter } from "react-router";
import Card from "../Card/index";

configure({ adapter: new Adapter() });

const middleware = [thunk];

const initialState = {
  carousell: {
    entries: mockEntries, //Mock data with 29 movies
    totalCount: mockEntries.length, //29
    loaded: true
  },
  position: {
    selectedPosition: 1,
    lastInteractPosition: 1
  }
};

const teststore = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware))
);

/*
Checks if the Carousell renders, and if number of cards rendered = number of entries
*/

describe("Carousell Component", () => {
  const component = mount(
    <MemoryRouter initialEntries={["/"]}>
      <Carousell store={teststore} />
    </MemoryRouter>
  );
  
  //Ensure the div containing data-test='Carousell' is rendered once
  it("Carousell container should render", () => {
    const CarousellComponent = component.find(`[data-test='Carousell']`);
    expect(CarousellComponent.length).toBe(1);
  });

  //Ensure one card for each movie entry
  it(`Carousell should render 29 Movie Cards`, () => {
    const CardComponents = component.find(Card);
    expect(CardComponents.length).toBe(29);
  });
});

import React from "react";
import Card from "./index";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { mockMovieData } from "../../mock";

configure({ adapter: new Adapter() });

describe("Card Component", () => {
  let props = {
    movie: mockMovieData,
    position: 1,
    selectedPosition: 1
  };
  //Ensure the div containing data-test='Card' is rendered once
  it("Card should render", () => {
    const component = shallow(<Card {...props} />);
    const CardComponent = component.find(`[data-test='Card']`);
    expect(CardComponent.length).toBe(1);
  });
});

import React from "react";
import App, { HomePage } from "../App";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  shallow(<App />);
});

it("renders home image", () => {
  shallow(<HomePage />);
});

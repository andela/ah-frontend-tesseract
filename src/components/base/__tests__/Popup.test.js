import React from "react";
import Popup from "../Popup.js";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  shallow(<Popup message={""} />);
});

it("popup closed when showPopup is false", () => {
  let wrapper = shallow(<Popup message={""} />);
  wrapper.setProps({ history: history });
  wrapper.instance().closePopup();
  expect(wrapper.find(".pop-up").length).toBe(0);
});

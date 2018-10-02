import React from "react";
import Header from "../Header";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
import configureMockStore from "redux-mock-store";

it("renders without crashing", () => {
  const mockStore = configureMockStore();
  const store = mockStore({ authentication: jest.fn() });
  const wrapper = shallow(<Header store={store} />);
  expect(wrapper.dive().find(".navbar-fixed").length).toBe(1);
});

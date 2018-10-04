import React from "react";
import configureMockStore from "redux-mock-store";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Login } from "../LoginContainer";
Enzyme.configure({ adapter: new Adapter() });

describe("login container", () => {
    let store;
    let wrapper;
    let handleSocialResponse = jest.fn();
    const handleResponseMock = jest.fn();
    let history = { push: jest.fn() };

    beforeEach(() => {
        const mockStore = configureMockStore();
        store = mockStore({ authentication: jest.fn() });
    });

    it("renders without crashing", () => {
        shallow(
            <Login
                store={store}
                handleLoginResponse={handleResponseMock}
                handleSocialResponse={handleSocialResponse}
                history={history}
            />
        );
    });

    it("should render social buttons", () => {
        wrapper = shallow(
            <Login
                store={store}
                handleSocialResponse={handleSocialResponse}
                handleLoginResponse={handleResponseMock}
                history={history}
            />
        );
        expect(wrapper.find(".social").length).toBe(1);
    });

});
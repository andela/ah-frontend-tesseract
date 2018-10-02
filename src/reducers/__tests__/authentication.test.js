import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import reducer from "../index";
import { SOCIAL_LOGIN, LOGIN_FAILURE, FETCHING } from "../../actions/types";
Enzyme.configure({ adapter: new Adapter() });

describe("test authentication login actions", () => {
  let intialState, afterState;

  beforeEach(() => {
    intialState = { authentication: { userDetails: {}, isLoggedIn: false } };
  });

  it("should return initial state", () => {
    reduceAction("UNKNOWN", "");
    expect(afterState).toEqual(intialState);
  });

  it("should update state on successful social login", () => {
    reduceAction(SOCIAL_LOGIN, { user: "test", email: "email" });
    expect(afterState).toEqual({
      authentication: {
        userDetails: { user: "test", email: "email" },
        isLoggedIn: true
      }
    });
  });

  it("should update state with errors on failure to login", () => {
    reduceAction(LOGIN_FAILURE, { errors: "errors" });
    expect(afterState).toEqual({
      authentication: { userDetails: { errors: "errors" }, isLoggedIn: false }
    });
  });

  it("should update state on fetch", () => {
    reduceAction(FETCHING, true);
    expect(afterState).toEqual({
      authentication: {
        isFetching: true,
        isLoggedIn: false,
        userDetails: {}
      }
    });
  });

  const reduceAction = (actionType, payload) => {
    const action = { type: actionType, payload: payload };
    afterState = reducer(intialState, action);
  };
});

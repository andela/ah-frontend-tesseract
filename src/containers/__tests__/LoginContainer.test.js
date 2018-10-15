/* eslint-disable no-undef */
import React from 'react';
import configureMockStore from 'redux-mock-store';

import Enzyme, { mount,shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Login, mapStateToProps } from '../LoginContainer';
Enzyme.configure({ adapter: new Adapter() });

describe('login container', () => {
  let store;
  let wrapper;
  const handleSocialResponse = jest.fn();
  const handleResponseMock = jest.fn();
  const history = { push: jest.fn() };


  beforeEach(() => {
    const mockStore = configureMockStore();
    store = mockStore({ authentication: jest.fn() });
  });

  it('renders without crashing', () => {
    shallow(
      <Login
        store={store}
        handleLoginResponse={handleResponseMock}
        handleSocialResponse={handleSocialResponse}
        history={history}
        fetchStatus={true}
      />,
    );
  });

    it('should render social buttons', () => {
        wrapper = mount(
            <Login
                store={store}
                handleSocialResponse={handleSocialResponse}
                handleLoginResponse={handleResponseMock}
                history={history}
                fetchStatus={true}
            />,
        );
        expect(wrapper.find(".social").length).toBe(1);
    });

  it('maps the state to the props successfully', () => {
    const state = {
      authentication: {
        userDetails: {},
        login_error: 'error',
        isFetching: false,
      },
    };
    const expectedProp = {
      auth: {},
      error: 'error',
      fetchStatus: false,
    };
    expect(mapStateToProps(state)).toEqual(expectedProp);
  });
});

/* eslint-disable no-undef */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import ProfileContainer from '../ProfileContainer';
import { Profile, Spinner } from '../../components/profile/Profile';

Enzyme.configure({ adapter: new Adapter() });
const storeFake = state => ({
  default: jest.fn(),
  subscribe: jest.fn(),
  dispatch: jest.fn(),
  getState: () => state,
});

describe('profile container', () => {
  let wrapper;
  let component;
  let container;

  beforeEach(() => {
    jest.resetAllMocks();
    const store = storeFake({ profile: { username: 'test' } });

    wrapper = mount(
      <Provider store={store}>
        <ProfileContainer />
      </Provider>,
    );

    container = wrapper.find(ProfileContainer);
    component = wrapper.find(Profile);
  });

  it('should render both the container and the component ', () => {
    expect(container.length).toBeTruthy();
    expect(component.length).toBeTruthy();
  });

  it('renders the spinner when fetching', () => {
    const otherStore = storeFake({ profile: { isFetchingProfile: true } });
    const otherWrapper = mount(
      <Provider store={otherStore}>
        <ProfileContainer />
      </Provider>,
    );

    expect(otherWrapper.find(ProfileContainer).length).toBeTruthy();
    expect(otherWrapper.find(Spinner).length).toBeTruthy();
  });
});

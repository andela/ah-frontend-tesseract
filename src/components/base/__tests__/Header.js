import React from 'react';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import Header from '../Header';

Enzyme.configure({ adapter: new Adapter() });
describe('header tests', () => {
  const mockStore = configureMockStore();
  let store;
  it('renders without crashing when logged in', () => {
    const profileProps = {
      username: 'test',
      email: 'test@test,com',
      image: 'test@image',
    };
    store = mockStore({ authentication: { isLoggedIn: true }, profile: profileProps });
    const wrapper = shallow(<Header store={store} />);
    expect(wrapper.dive().find('.navbar-fixed').length).toBe(1);
  });

  it('renders without crashing when not logged in', () => {
    store = mockStore({ authentication: { isLoggedIn: false } });
    shallow(<Header isLoggedIn store={store} />);
  });
});

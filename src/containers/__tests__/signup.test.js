/* eslint-disable no-undef */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignUp from '../SignUp';
import store from '../../store';

Enzyme.configure({ adapter: new Adapter() });

describe('sign-up-form container', () => {
  const createUser = jest.fn();
  const handleSocialResponse = jest.fn();

  it('should render', () => {
    const wrapper = shallow(<SignUp
      createUser={createUser}
      handleSocialResponse={handleSocialResponse}
      store={store}
    />);
    expect(wrapper).toMatchSnapshot();
  });
});

/* eslint-disable no-undef */
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import LoginForm from '../Login';

Enzyme.configure({ adapter: new Adapter() });

describe('LoginForm', () => {
  it('renders without crashing', () => {
    shallow(<LoginForm />);
  });
});

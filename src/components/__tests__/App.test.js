import React from 'react';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App, { HomePage } from '../App';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const getUserFromToken = jest.fn();
  shallow(<App getUserFromToken={getUserFromToken} />);
});

it('renders home image', () => {
  shallow(<HomePage />);
});

import React from 'react';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProfileDropDown from '../ProfileDropDown';

Enzyme.configure({ adapter: new Adapter() });

describe('profile dropdown tests', () => {
  it('renders without crashing when not logged in', () => {
    shallow(<ProfileDropDown />);
  });
});

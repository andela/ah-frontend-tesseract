/* eslint-disable no-undef */
import React from 'react';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SocialButtons from '../SocialButtons';

Enzyme.configure({ adapter: new Adapter() });

describe('social buttons component', () => {
  let handleSocialResponse; let
    history;

  beforeEach(() => {
    handleSocialResponse = jest.fn();
    history = { push: jest.fn() };
  });

  it('renders without crashing', () => {
    shallow(<SocialButtons handleSocialResponse={handleSocialResponse} history={history} />);
  });
});

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Profile, ProfileForm, Spinner, SaveButton } from '../Profile';


Enzyme.configure({ adapter: new Adapter() });

describe('profile components', () => {
  const props = {
    profile: {
      bio: 'test bio',
      location: 'test location',
      occupation: 'test occupation',
    },
    saveProfile: jest.fn(),
    finishEditing: jest.fn(),
  };

  const event = {
    preventDefault() {},
    target: { value: 'test', id: 'location' },
  };

  it('renders profile without crashing', () => {
    shallow(<Profile {...props} />);
  });

  it('renders profile form without crashing', () => {
    shallow(<ProfileForm {...props} />);
  });

  it('renders the spinner without crashing', () => {
    shallow(<Spinner />);
  });

  it('renders the button without crashing', function () {
    shallow(<SaveButton />);
  });

  it('simulates a change in the form', () => {
    const wrapper = shallow(<ProfileForm {...props} />);
    // wrapper.instance().handleChange = jest.fn();
    wrapper.find('#location').simulate('change', event);
    expect(wrapper.instance().state.location).toEqual(event.target.value);
  });

  it('simulates submitting the form', () => {
    const wrapper = shallow(<ProfileForm {...props} />);
    wrapper.simulate('submit', event);
    expect(props.saveProfile).toHaveBeenCalled();
    expect(props.finishEditing).toHaveBeenCalled();
  });
});

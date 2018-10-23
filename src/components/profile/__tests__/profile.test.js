import React from 'react';
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Profile, ProfileForm, Spinner, SaveButton } from '../Profile';
import UsersList, {UserCard} from "../UsersList";
import configureMockStore from "redux-mock-store";


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
    user:{image:"",username:""},
    index:0,
      onFollow:jest.fn(),
      onUnFollow:jest.fn()
  };
   const mockStore = configureMockStore();
  const store = mockStore({ authentication: { isLoggedIn: true }, profile: {} });

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
    wrapper.find('#location').simulate('change', event);
    expect(wrapper.instance().state.location).toEqual(event.target.value);
  });

  it('simulates submitting the form', () => {
    const wrapper = shallow(<ProfileForm {...props} />);
    wrapper.simulate('submit', event);
    expect(props.saveProfile).toHaveBeenCalled();
    expect(props.finishEditing).toHaveBeenCalled();
  });

  it('renders UsersList crashing', function () {
    mount(<UsersList store={store}/>);
  });

  it('renders UserCard crashing', function () {
      // let component =;
      expect( shallow(<UserCard {...props} follows={false}/>).find('#user0').exists()).toBe(true);
      expect( shallow(<UserCard {...props} follows={false}/>).find('#user0').exists()).toBe(true);
      shallow(<UserCard {...props} follows={true}/>).find('#rbutton0').simulate('click');
      shallow(<UserCard {...props} follows={false}/>).find('#gbutton0').simulate('click');
  });
});

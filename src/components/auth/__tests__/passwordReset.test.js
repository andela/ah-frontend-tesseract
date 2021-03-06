/* eslint-disable no-undef,max-len,import/named,import/no-duplicates */
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { PasswordReset, mapStateToProps, Button } from '../passwordReset';
import { PasswordResetForm, ResetButton } from '../PasswordResetForm';
import { mapStateToProps as Mapper } from '../PasswordResetForm';
import { handlePasswordReset } from '../../../actions';


Enzyme.configure({ adapter: new Adapter() });

const msgProp = { message: ' An Email has been sent' };

describe('PasswordReset', () => {
  const props = {
    handleRequestReset: jest.fn(),
    msg: { message: ' An Email has been sent' },
  };

  it('renders well without crashing', () => {
    const event = {
      preventDefault() {},
      target: { value: 'test@gmail.com' },
    };
    const wrapper = shallow(<PasswordReset {...props} />);
    wrapper.instance().handleChange = jest.fn();
    wrapper.find('#email').simulate('change', event);
  });

  it('maps the state to the props', () => {
    const state = {
      passwordReset: {
        message: 'initial',
        processing: false,
        error: 'initial',
      },
    };
    const expectedProp = {
      msg: 'initial',
      processing: false,
      error: 'initial',
    };
    expect(mapStateToProps(state)).toEqual(expectedProp);
  });
});

describe('PasswordResetForms ', () => {
  it('renders password reset forms without crashing', () => {
    const wrapper = shallow(<PasswordResetForm handleRequestReset={handlePasswordReset()} msg={msgProp} />);
    wrapper.instance().handleChange({ target: {} });

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('#comfirmPassword').text()).toBe('');
  });

  it('maps the state to the props', () => {
    const state = {
      confirmPasswordReset: {
        message: 'initial',
        processing: false,
        error: 'initial',
      },
    };
    const expectedProp = {
      msg: 'initial',
      processing: false,
      error: 'initial',
    };
    expect(Mapper(state)).toEqual(expectedProp);
  });
});

describe('PasswordResetForms Button', () => {
  it('renders comfirm password button without crashing', () => {
    const wrapper = shallow(<ResetButton handleSubmit={jest.fn()} processing />);
    expect(wrapper.find('.muted').text()).toBe('The password must be at least 8 characters long and contain numbers and letters');
  });
});

describe('PasswordReset Button', () => {
  it('renders password reset button without crashing', () => {
    const wrapper = shallow(<Button handleSubmit={handlePasswordReset()} processing />);
    expect(wrapper.find('.muted').text()).toBe('The email must be in the correct format e.g abc@gmail.com');
  });
});

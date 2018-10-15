/* eslint-disable no-undef */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignUp from "../SignUp";
import configureMockStore from "redux-mock-store";

Enzyme.configure({ adapter: new Adapter() });

describe('sign-up-form container',()=>{
    let signup_conponent;
    const createUser = jest.fn();
    let test_store;


    beforeEach(() => {
        const mockStore = configureMockStore();
        test_store = mockStore({ authentication: jest.fn(), create_user: {user: {token: "j"}} });
        signup_conponent=mount(
            <SignUp
                history={{ push: jest.fn() }}
                createUser={createUser}
                store={test_store}
                handleSocialResponse={jest.fn()}
                />
        );
    });

    it('should render', () => {
        expect(signup_conponent).toHaveLength(1);
    });

    it('should render social buttons ', () => {
        expect(signup_conponent.find(".container")).toHaveLength(1);

    })
});

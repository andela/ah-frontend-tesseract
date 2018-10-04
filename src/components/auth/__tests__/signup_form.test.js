import Enzyme,  {shallow}  from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import SignUpForm from "../SignUpForm";

Enzyme.configure({ adapter: new Adapter() });

describe("sign_up form component",()=>{
    let component;
    const createUser = jest.fn();
    beforeEach(()=>{
        component=shallow(<SignUpForm createUser={createUser} />);
    });

    it('renders without crashing', () => {
        expect(component).toHaveLength(1)
    });

    it('test rendering loading status', () => {
        shallow(<SignUpForm loading_status={true} />);
    });


    it('should fail validations with empty fields', () =>{
        component.instance().setState(
            {
                username:"",
                email:"",
                password:"",
                confirm:""
            }
        );
        component.find("#sign-up-form").simulate("submit");
        expect(createUser).toBeCalledTimes(0);
    });

    it('should fail validations with incorect inputs', () =>{
        component.instance().setState(
            {
                username:"hey",
                email:"mail.com",
                password:"1234",
                confirm:"1238"
            }
        );
        component.find("#sign-up-form").simulate("submit");
        expect(createUser).toBeCalledTimes(0);

        component.instance().setState(
            {
                username:"hey",
                email:"mail.com",
                password:"abchjhghjkjhj",
                confirm:"abcghjklhgjkhj"
            }
        );
        component.find("#sign-up-form").simulate("submit");
        expect(createUser).toBeCalledTimes(0);

        component.instance().setState(
            {
                username:"hey",
                email:"mail.com",
                password:"12345433454",
                confirm:"12341234543"
            }
        );
        component.find("#sign-up-form").simulate("submit");
        expect(createUser).toBeCalledTimes(0);
    });

    it('should submit form', () => {

        component.instance().setState(
            {
                username:"mikeo",
                email:"mikeo@mail.com",
                password:"hello1234",
                confirm:"hello1234"
            }
        );
        expect(createUser).toBeCalledTimes(0);
        component.find("#sign-up-form").simulate("submit");
        expect(createUser).toBeCalledTimes(1);

    });

});
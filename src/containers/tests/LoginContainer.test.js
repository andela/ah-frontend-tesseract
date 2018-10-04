import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Login} from "../LoginContainer";
import React from "react";

Enzyme.configure({adapter: new Adapter() });

describe('LoginContainer', () => {

    it('renders without crashing', function () {
        const handleResponseMock = jest.fn();
        shallow(<Login handleLoginResponse={handleResponseMock}/>);
    });
});
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LoginForm from "../Login";
import React from "react";

Enzyme.configure({adapter: new Adapter() });

describe('LoginForm', () => {

    it('renders without crashing', function () {
        shallow(<LoginForm/>);
    });
});
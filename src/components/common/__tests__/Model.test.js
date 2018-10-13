import Enzyme, {shallow,mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from "react";
import store from "../../../store";
import Modal from "../Modal";

Enzyme.configure({adapter: new Adapter() });

describe('Model Tests', () => {

it('should render  without crashing', function () {
        mount(<Modal store={store} />);
    })

});
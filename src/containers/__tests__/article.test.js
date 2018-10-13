import React from "react";
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from "../../store";
import Article from "../articles/Article";

Enzyme.configure({ adapter: new Adapter() });

describe("articles container",()=>{
    let createArticle=jest.fn();
    let onSubmit = jest.fn();
    let component;

    it('should render', () => {
        component=mount(<Article createArticle={createArticle} store={store} onEdit={true}/> );
    });

    it('should render call submit', () => {
        const wrapper = shallow(
            <Article store={store} />
        );
        wrapper.dive().instance().onSubmit();
    });

    it('should render call onPreviewEdit', () => {
        const wrapper = shallow(
            <Article store={store} />
        );
        wrapper.dive().instance().onPreviewEdit();
    });

    it('should render call updateArticle', () => {
        const wrapper = shallow(
            <Article store={store} />
        );
        wrapper.dive().instance().updateArticle();
    });

    it('should render call preview', () => {
        const wrapper = shallow(
            <Article store={store} />
        );
        wrapper.dive().instance().preview();
    });


});
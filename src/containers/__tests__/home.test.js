/* eslint-disable no-undef */
import React from 'react';
import Enzyme, { mount,shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from "redux-mock-store";
import {CallToAction, Footer, HavenPromoText, HomePage, HomeSlider} from "../home";

Enzyme.configure({ adapter: new Adapter() });

describe('test home container',()=>{
    let home_container;

    let test_store;
    let story=[{author: {id: 1, username: "user1"},
        average_rating: 3,
        body: "this is the body",
        created_at: "2018-09-20T13:06:56.580470Z",
        description: "this is a description",
        read_time: "less than 1 min",
        slug: "this-is-my-title",
        title: "this is my title"}];

    beforeEach(() => {
        const mockStore = configureMockStore();
        test_store = mockStore({ authentication: jest.fn(), landing: {stories:[story],isFetching:false,user:"user1",following:[]} });
        home_container=shallow(
            <HomePage
                getProfile={jest.fn()}
                getFollowing={jest.fn()}
                getRandomArticles={jest.fn()}
                searchArticles={jest.fn()}
                user={"user1"}
                stories={[story]}
            />
        );

    });

    it('should render', () => {
        expect(home_container).toHaveLength(1);
    });

    it('should render footer', () => {
        mount(<Footer/>);
    });

    it('should render CallToAction', () => {
        mount(<CallToAction/>);
    });

    it('should render PromoText', () => {
        mount(<HavenPromoText/>);
    });

    it('should render homeslider', () => {
        mount(<HomeSlider/>);
    });


});

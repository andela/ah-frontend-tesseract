import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import {axiosInstance} from "../../globals";
import {FETCH_LANDING_PROFILE, FETCH_LANDING_STORIES, FETCH_USER_FOLLOWING, FETCHING} from "../types";
import {getFollowing, getProfile, getRandomArticles, searchArticles} from "../landingPageStoriesAction";

Enzyme.configure({ adapter: new Adapter() });

describe("test landing page action", () => {
    let store, httpMock,responseData, followingResponceData,stories;
    const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

    beforeEach(() => {
        const mockStore = configureMockStore();
        store = mockStore({ article: jest.fn() });
        stories=[{title:"sample title",body:"sample body"}];
        responseData={username:"mike",profile:{following:[{username:"moses"}]}};
        followingResponceData = {profile:{following:[{username:"moses"}]}};
        httpMock = new MockAdapter(axiosInstance);
    });

    it("should get profile", async () => {
        httpMock.onGet('/user/').reply(200,responseData);
        getProfile()(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual([
            {payload: true,type:FETCHING},
            {payload: responseData.username,type:FETCH_LANDING_PROFILE},
            {type:FETCHING,payload:false},
        ])
    });

    it("should fail to get profile", async () => {
        httpMock.onGet('/user/').reply(400,responseData);
        getProfile()(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual([
            {payload: true,type:FETCHING},
            {type:FETCHING,payload:false},
        ])
    });

    it("should get getFollowing", async () => {
        httpMock.onGet('/profiles/user/mike').reply(200,followingResponceData);
        getFollowing("mike")(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual([
            {payload: true,type:FETCHING},
            {payload:followingResponceData.profile.following,type:FETCH_USER_FOLLOWING},
            {type:FETCHING,payload:false},
        ])
    });

    it("should fail to get getFollowing", async () => {
        httpMock.onGet('/profiles/user/mike').reply(400,followingResponceData);
        getFollowing("mike")(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual([
            {payload: true,type:FETCHING},
            {type:FETCHING,payload:false},
        ])
    });

    it("should search for articles", async () => {
        httpMock.onGet('/articles/search/?author=mike').reply(200,stories);
        searchArticles("mike")(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual([
            {payload: true,type:FETCHING},
            {payload:stories,type:FETCH_LANDING_STORIES},
            {type:FETCHING,payload:false},
        ])
    });

    it("should fail search for articles", async () => {
        httpMock.onGet('/articles/search/?author=mike').reply(400,stories);
        searchArticles("mike")(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual([
            {payload: true,type:FETCHING},
            {type:FETCHING,payload:false},
        ])
    });

    it("should get all articles", async () => {
        httpMock.onGet('/articles').reply(200,{articles:stories});
        getRandomArticles()(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual([
            {payload: true,type:FETCHING},
            {payload:stories,type:FETCH_LANDING_STORIES},
            {type:FETCHING,payload:false},
        ])
    });

    it("should fail to get articles", async () => {
        httpMock.onGet('/articles').reply(400,{articles:stories});
        getRandomArticles()(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual([
            {payload: true,type:FETCHING},
            {type:FETCHING,payload:false},
        ])
    });



});

import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import {axiosInstance} from "../../globals";
import {
    CHANGE_EDIT_COMMENT,
    CREATE_COMMENT, CREATE_COMMENT_ERROR, DELETE_COMMENT,
    FETCHING,
    FETCHING_COMMENTS,
    FETCHING_COMMENTS_ERROR,
    SET_EDDITING
} from "../types";
import {createComment, deleteComment, editComment, fetchComments, setCommentEdit} from "../commentAction";


Enzyme.configure({ adapter: new Adapter() });

describe("test comments action", () => {
    let store, httpMock,responseData,comment;
    const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

    beforeEach(() => {
        comment={id:2,body:"hey there"};
        responseData={comments:[comment]};
        const mockStore = configureMockStore();
        store = mockStore({ article: jest.fn() });
        httpMock = new MockAdapter(axiosInstance);
    });

    it("should get comments", async () => {
        httpMock.onGet('/article/test_slug/comments').reply(200,responseData);
        fetchComments("test_slug")(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual([
            {payload: true,type:FETCHING},
            {payload: responseData.comments,type:FETCHING_COMMENTS},
            {type:FETCHING,payload:false},
        ])
    });

    it("should fail to get comments", async () => {
        httpMock.onGet('/article/test_slug/comments').reply(400,{});
        fetchComments("test_slug")(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual([
            {payload: true,type:FETCHING},
            {payload: {},type:FETCHING_COMMENTS_ERROR},
            {type:FETCHING,payload:false},
        ])
    });


    it("should create a comment", async () => {
        httpMock.onPost(`/article/test_slug/comments`,comment).reply(201,responseData);
        createComment(comment,"test_slug")(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual([
            {payload: true,type:FETCHING},
            {payload: true,type:CREATE_COMMENT},
            {type:FETCHING,payload:false},
        ])
    });

    it("should fail to create a comment", async () => {
        httpMock.onPost(`/article/test_slug/comments`,comment).reply(400,{});
        createComment(comment,"test_slug")(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual([
            {payload: true,type:FETCHING},
            {payload: {},type:CREATE_COMMENT_ERROR},
            {type:FETCHING,payload:false},
        ])
    });

    it("should dispatch set comment edit", () => {
        setCommentEdit("hey",10)(store.dispatch);
        flushAllPromises();
        expect(store.getActions()).toEqual([
            {payload: {body:"hey",id:10},type:CHANGE_EDIT_COMMENT},
            {type:SET_EDDITING,payload:true},
        ])
    });

    it("should edit a comment", async () => {
        httpMock.onPut(`/article/test_slug/comments/10`,comment).reply(200,responseData);
        editComment(comment,'test_slug',10)(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual([
            {type:SET_EDDITING,payload:false},
            {payload: true,type:FETCHING},
            {type:FETCHING,payload:false},
        ])
    });

    it("should fail edit a comment", async () => {
        httpMock.onPut(`/article/test_slug/comments/10`,comment).reply(400,responseData);
        editComment(comment,'test_slug',10)(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual([
            {type:SET_EDDITING,payload:false},
            {payload: true,type:FETCHING},
            {type:FETCHING,payload:false},
        ])
    });


    it("should fail edit a comment", async () => {
        httpMock.onPut(`/article/test_slug/comments/10`,comment).reply(400,responseData);
        editComment(comment,'test_slug',10)(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual([
            {type:SET_EDDITING,payload:false},
            {payload: true,type:FETCHING},
            {type:FETCHING,payload:false},
        ])
    });

    it("should delete a comment", async () => {
        httpMock.onDelete(`/article/test_slug/comments/10`).reply(200,responseData);
        deleteComment(10,'test_slug')(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual([
            {payload: true,type:FETCHING},
            {type:DELETE_COMMENT,payload:true},
            {type:FETCHING,payload:false},
        ])
    });

    it("should fail to delete a comment", async () => {
        httpMock.onDelete(`/article/test_slug/comments/10`).reply(400,responseData);
        deleteComment(10,'test_slug')(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual([
            {payload: true,type:FETCHING},
            {type:FETCHING,payload:false},
        ])
    });



});

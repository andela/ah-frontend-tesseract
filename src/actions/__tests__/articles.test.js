import React from "react";
import Enzyme from "enzyme";
import {
    deleteArticle,
    getArticle,
    getArticles,
    getArticleTags,
    publishArticle,
    updateArticle
} from "../articles";
import Adapter from "enzyme-adapter-react-16";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import { axiosInstance } from "../../globals";
import {
  ARTICLE_FAILURE,
  ARTICLE_SUCCESS,
  DELETE_ARTICLE,
  EDIT_ARTICLE,
  FETCHING,
  PAGINATION_DATA,
  PREVIEW_ARTICLE,
  UPDATE_SLUG,
  UPDATE_STORE_ARTICLE,
  VIEW_ARTICLE,
  VIEW_ARTICLES,
    ARTICLE_TAGS
} from "../types";
import { EditorState, convertFromRaw } from "draft-js";

Enzyme.configure({ adapter: new Adapter() });

export const testPaginationData = {
  currentPage: 1,
  hasNextPage: true,
  hasPreviousPage: false,
  nextPage: 2,
  previousPage: 0,
  range: [1, 2, 3, 4, 5],
  totalPages: 5
};

describe("test articles", () => {
  let store,
    get_response,
    get_article,
    update_response,
    response_data,
    httpMock,
    post_article,
    list_response,
    tags_response,
    delete_response;
  const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

  beforeEach(() => {
    const mockStore = configureMockStore();
    store = mockStore({ article: jest.fn() });
    const editorBody =
      '{"blocks":[{"key":"1ulv2","text":"Where ","type":"header-five","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}';
    const contentState = convertFromRaw(JSON.parse(editorBody));
    const body = EditorState.createWithContent(contentState);
    post_article = {
      title: "title",
      body: body,
      slug: "fake_slug",
      description: "description"
    };
        tags_response = {tags:["tag","tag1"]};
     response_data = {
      title: "title",
      body: editorBody,
      slug: "fake_slug",
      error: { response: { data: { errors: "" } } }
    };

    update_response = {
      title: "title",
      body: editorBody,
      slug: "fake_slug",
      description: "description"
    };

    get_article = {
      title: "title",
      body: body,
      slug: "fake_slug",
      description: "description",
      author: { username: "mike" }
    };
    get_response = {
      title: "title",
      body: editorBody,
      slug: "fake_slug",
      description: "description",
      author: { username: "mike" }
    };

    httpMock = new MockAdapter(axiosInstance);

    list_response = {
      articles: [],
      number_of_pages: 5,
      error: { response: { data: { errors: "" } } }
    };
    delete_response = {message:"Deleted successfully"}
  });

  it("should create article", async () => {
    httpMock.onPost("/article/create").reply(201, response_data);
    publishArticle(post_article)(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()).toEqual([
      { payload: true, type: FETCHING },
      { payload: response_data.slug, type: UPDATE_SLUG },
      { type: ARTICLE_SUCCESS, payload: "Article published successfully" },
      { type: FETCHING, payload: false }
    ]);
  });

  it("test create article with error", async () => {
    httpMock.onPost("/article/create").reply(400, response_data);
    publishArticle(post_article)(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()).toEqual([
      { payload: true, type: FETCHING },
      { type: ARTICLE_FAILURE, payload: "Failed to publish Article" },
      { type: FETCHING, payload: false }
    ]);
  });

  it("should update article", async () => {
    httpMock
      .onPut("/article/edit/" + post_article.slug)
      .reply(200, update_response);
    updateArticle(post_article)(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()).toEqual([
      { payload: true, type: FETCHING },
      { type: UPDATE_STORE_ARTICLE, payload: post_article },
      { type: ARTICLE_SUCCESS, payload: "Article updated successfully" },
      { type: EDIT_ARTICLE, payload: false },
      { type: FETCHING, payload: false }
    ]);
  });

  it("update article should fail", async () => {
    httpMock
      .onPut("/article/edit/" + post_article.slug)
      .reply(400, response_data);
    updateArticle(post_article)(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()).toEqual([
      { payload: true, type: FETCHING },
      { type: ARTICLE_FAILURE, payload: "Failed to update Article" },
      { type: FETCHING, payload: false }
    ]);
  });

  it("should get articles list", async () => {
    httpMock.onGet("/articles?page=1").reply(200, list_response);
    getArticles(1)(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()).toEqual([
      { type: FETCHING, payload: true },
      { type: PREVIEW_ARTICLE, payload: false },
      { type: VIEW_ARTICLES, payload: list_response.articles },
      { type: PAGINATION_DATA, payload: testPaginationData },
      { type: FETCHING, payload: false }
    ]);
  });

  it("test fail to get articles list", async () => {
    httpMock.onGet("/articles").reply(400, list_response);
    getArticles(true)(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()).toEqual([
      { type: FETCHING, payload: true },
      { type: ARTICLE_FAILURE, payload: "Failed to get Articles" },
      { type: FETCHING, payload: false }
    ]);
  });

  it("should update article", async () => {
    httpMock
      .onPut("/article/edit/" + post_article.slug)
      .reply(200, update_response);
    updateArticle(post_article)(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()).toEqual([
      { payload: true, type: FETCHING },
      { type: UPDATE_STORE_ARTICLE, payload: post_article },
      { type: ARTICLE_SUCCESS, payload: "Article updated successfully" },
      { type: EDIT_ARTICLE, payload: false },
      { payload: false, type: FETCHING }
    ]);
  });

  it("should get an article", async () => {
    httpMock
      .onGet(`/article/get/${post_article.slug}`)
      .reply(200, get_response);
    getArticle(post_article.slug)(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()).toEqual([
      { payload: true, type: FETCHING },
      { type: UPDATE_STORE_ARTICLE, payload: get_article },
      { payload: true, type: VIEW_ARTICLE },
      { type: FETCHING, payload: false }
    ]);
  });

  it("should fail to get an article", async () => {
    httpMock
      .onGet(`/article/get/${post_article.slug}`)
      .reply(400, list_response);
    getArticle()(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()).toEqual([
      { payload: true, type: FETCHING },
      { type: ARTICLE_FAILURE, payload: "Failed to get Article" },
      { type: FETCHING, payload: false }
    ]);
  });

     it("should delete an article", async () => {
        httpMock.onDelete('/article/delete/slug-a').reply(200,delete_response);
        deleteArticle('slug-a')(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual([
                {payload: true,type:DELETE_ARTICLE},
                {type:ARTICLE_SUCCESS,payload:"Deleted successfully"},
            {type:DELETE_ARTICLE, payload:false}
            ]
        )
    });

    it("should fail delete an article", async () => {
        httpMock.onDelete(`/article/delete/${post_article.slug}`).reply(400,list_response);
        deleteArticle(post_article.slug)(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual([
                {payload: true,type:DELETE_ARTICLE},
                {type:ARTICLE_FAILURE,payload:"Failed to delete Article"}
            ]
        )
    });

        it("should get list of tags", async () => {
        httpMock.onGet('/article/tags').reply(200,tags_response);
        getArticleTags(true)(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual([
            {payload: true,type:FETCHING},
            {type:ARTICLE_TAGS,payload:tags_response.tags},
            {type:FETCHING,payload:false},
            ]
        )
    });


        it("should fail to get a list tags", async () => {
        httpMock.onGet('/article/tags').reply(400,"Failed to get Tags");
        getArticleTags(true)(store.dispatch);
        await flushAllPromises();
        expect(store.getActions()).toEqual([
            {payload: true,type:FETCHING},
            {type:ARTICLE_FAILURE,payload:"Failed to get Tags"},
            {type:FETCHING,payload:false},
            ]
        )
    });

});

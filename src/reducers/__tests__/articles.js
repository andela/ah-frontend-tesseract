import {articleReducer,articleState} from "../articles";
import {
    ARTICLE_FAILURE,
    ARTICLE_SUCCESS,
    CREATE_ARTICLE,
    DELETE_ARTICLE,
    EDIT_ARTICLE, FETCHING,
    PREVIEW_ARTICLE, UPDATE_AUTHOR, UPDATE_STORE_ARTICLE,
    VIEW_ARTICLE, VIEW_ARTICLES
} from "../../actions/types";
import {EditorState} from "draft-js";

describe('test articles reducer', () => {
    let article={title:"title",body:EditorState.createEmpty(),description:"this is it"};
    let beforeState;

    beforeEach(() => {
        beforeState = articleState
    });

    it('returns initial state', () => {
        expect(articleReducer(undefined, {})).toEqual(beforeState);
    });

    it('test updating create article',  () => {
        const action = {type: CREATE_ARTICLE, payload: article};
        const afterState = articleReducer(beforeState, action);
        beforeState.title=article.title;
        beforeState.body=article.body;
        beforeState.description=article.description;
        expect(afterState).toEqual(beforeState);
    });

    it('test preview article', () => {
        const action = {type: PREVIEW_ARTICLE, payload: true};
        const afterState = articleReducer(beforeState, action);
        beforeState.onPreview=true;
        expect(afterState).toEqual(beforeState);
    });

    it('test view article', () => {
        const action = {type: VIEW_ARTICLE, payload: true};
        const afterState = articleReducer(beforeState, action);
        beforeState.onView=true;
        expect(afterState).toEqual(beforeState);
    });

    it('test edit article', () => {
        const action = {type: EDIT_ARTICLE, payload: true};
        const afterState = articleReducer(beforeState, action);
        beforeState.onEdit=true;
        expect(afterState).toEqual(beforeState);
    });

    it('test delete article', () => {
        const action = {type: DELETE_ARTICLE, payload: true};
        const afterState = articleReducer(beforeState, action);
        beforeState.onDelete=true;
        expect(afterState).toEqual(beforeState);
    });

    it('test view articles', () => {
        const action = {type: VIEW_ARTICLES, payload: [article,article]};
        const afterState = articleReducer(beforeState, action);
        beforeState.articlesList=[article,article];
        beforeState.showList=true;
        expect(afterState).toEqual(beforeState);
    });

    it('test article success articles', () => {
        const action = {type: ARTICLE_SUCCESS, payload: "hello world"};
        const afterState = articleReducer(beforeState, action);
        beforeState.message="hello world";
        expect(afterState).toEqual(beforeState);
    });

    it('test update storage', () => {
        const action = {type: UPDATE_STORE_ARTICLE, payload: article};
        const afterState = articleReducer(beforeState, action);
        beforeState.apiArticle=article;
        expect(afterState).toEqual(beforeState);
    });

    it('test article failure', () => {
        const action = {type: ARTICLE_FAILURE, payload: "hello test"};
        const afterState = articleReducer(beforeState, action);
        beforeState.message="hello test";
        expect(afterState).toEqual(beforeState);
    });

    it('test update author failure', () => {
        const action = {type: UPDATE_AUTHOR, payload: "steve"};
        const afterState = articleReducer(beforeState, action);
        beforeState.isOwner="steve";
        expect(afterState).toEqual(beforeState);
    });

    it('test fetching failure', () => {
        const action = {type: FETCHING, payload: true};
        const afterState = articleReducer(beforeState, action);
        beforeState.fetchStatus=true;
        expect(afterState).toEqual(beforeState);
    });

});
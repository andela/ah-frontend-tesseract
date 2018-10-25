import commentsReducer,{initialState} from "../commentsReducer";
import {
    CHANGE_EDIT_COMMENT,
    CREATE_COMMENT,
    CREATE_COMMENT_ERROR, DELETE_COMMENT,
    FETCHING_COMMENTS,
    FETCHING_COMMENTS_ERROR, SET_EDDITING
} from "../../actions/types";

describe('test landing reducer', () => {
    let comments,comment;
    let beforeState;
    beforeEach(() => {
        comment={body:"hey test",id:10};
        comments=[comment];
        beforeState = initialState
    });

    it('returns initial state', () => {
        expect(commentsReducer(undefined, {})).toEqual(beforeState);
    });

    it('test fetching comments',  () => {
        const action = {type: FETCHING_COMMENTS, payload: comments};
        const afterState = commentsReducer(beforeState, action);
        beforeState.comments=comments;
        expect(afterState).toEqual(beforeState);
    });

    it('test creating comment',  () => {
        const action = {type: CREATE_COMMENT, payload: true};
        const afterState = commentsReducer(beforeState, action);
        beforeState.commentCreated=true;
        expect(afterState).toEqual(beforeState);
    });

    it('test fetching comment error',  () => {
        const action = {type: FETCHING_COMMENTS_ERROR, payload: "error"};
        const afterState = commentsReducer(beforeState, action);
        beforeState.fetchingError="error";
        expect(afterState).toEqual(beforeState);
    });

    it('test creating comment error',  () => {
        const action = {type: CREATE_COMMENT_ERROR, payload: "create error"};
        const afterState = commentsReducer(beforeState, action);
        beforeState.createError="create error";
        expect(afterState).toEqual(beforeState);
    });

    it('test changing edited comment',  () => {
        const action = {type: CHANGE_EDIT_COMMENT, payload:{body:'here it is',id:12}};
        const afterState = commentsReducer(beforeState, action);
        beforeState.editedComment={body:'here it is',id:12};
        expect(afterState).toEqual(beforeState);
    });

    it('test set editing',  () => {
        const action = {type: SET_EDDITING, payload:true};
        const afterState = commentsReducer(beforeState, action);
        beforeState.isEditing=true;
        expect(afterState).toEqual(beforeState);
    });

    it('test delete comment',  () => {
        const action = {type: DELETE_COMMENT, payload:true};
        const afterState = commentsReducer(beforeState, action);
        beforeState.commentDeleted=true;
        expect(afterState).toEqual(beforeState);
    });


});
import {
    CHANGE_EDIT_COMMENT,
    CREATE_COMMENT, CREATE_COMMENT_ERROR,
    DELETE_COMMENT,
    FETCHING,
    FETCHING_COMMENTS, FETCHING_COMMENTS_ERROR,
    SET_EDDITING
} from "../actions/types";

export const initialState = {
    comments: [],
    articleSlug:'',
    editedComment:{},
    isEditing:false,
    isFetching: false,
    fetchingError:'',
    createError:'',
    commentCreated:false,
    commentDeleted:false,
};

const commentsReducer = (state=initialState,action) =>{
    switch (action.type) {
        case FETCHING_COMMENTS:
            return {
                ...state,
                comments: action.payload
            };

        case CREATE_COMMENT:
            return {
                ...state,
                commentCreated:action.payload
            };

        case FETCHING_COMMENTS_ERROR:
            return {
                ...state,
                fetchingError:action.payload
            };

        case CREATE_COMMENT_ERROR:
            return {
                ...state,
                createError:action.payload
            };

        case CHANGE_EDIT_COMMENT:
            return {
                ...state,
                editedComment:action.payload
            };

        case SET_EDDITING:
            return {
                ...state,
                isEditing:action.payload
            };

        case DELETE_COMMENT:
            return {
                ...state,
                commentDeleted:action.payload
            };

        case FETCHING:
            return {
                ...state,
                isFetching: action.payload
            };

        default:
            return state
    }
};

export default commentsReducer;

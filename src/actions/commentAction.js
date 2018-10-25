import {
    CHANGE_EDIT_COMMENT,
    CREATE_COMMENT,
    CREATE_COMMENT_ERROR,
    DELETE_COMMENT,
    FETCHING_COMMENTS,
    FETCHING_COMMENTS_ERROR, SET_EDDITING
} from "./types";
import {axiosInstance} from "../globals";
import {fetching} from "./landingPageStoriesAction";

const comments= payload => {
    return {
        type:FETCHING_COMMENTS,
        payload
    }
};

const commentsFetchingError= payload => {
    return {
        type:FETCHING_COMMENTS_ERROR,
        payload
    }
};

const commentDispatch = payload=>{
    return {
        type:CREATE_COMMENT,
        payload
    }
};

const handleDelete = payload=>{
    return {
        type:DELETE_COMMENT,
        payload
    }
};

const editCommentDispatch = payload=>{
    return {
        type:CREATE_COMMENT_ERROR,
        payload
    }
};


const commetToEdit = payload=>{
    return {
        type:CHANGE_EDIT_COMMENT,
        payload
    }
};

const isEditting = payload=>{
    return {
        type:SET_EDDITING,
        payload: payload
    }
};


export const fetchComments=(articleSlug)=>async (dispatch)=>{
    dispatch(fetching(true));
    return await axiosInstance
        .get(`/article/${articleSlug}/comments`)
        .then(response=>{
            dispatch(comments(response.data.comments));
            dispatch(fetching(false));
        })
        .catch(error=>{
            try {
                dispatch(commentsFetchingError(error.response.data));
            }catch(error){

            }
            dispatch(fetching(false));
        })
};


export const createComment = (comment,slug) =>async (dispatch)=>{
    let url=`/article/${slug}/comments`;
    dispatch(fetching(true));
    return await axiosInstance
        .post(url,comment)
        .then(response=>{
            dispatch(commentDispatch(true));
            dispatch(fetching(false));
        })
        .catch(error=>{
            try{
                dispatch(editCommentDispatch(error.response.data));
            }catch (e) {

            }
            dispatch(fetching(false));
        })
};

export const setCommentEdit=(comment,commentId)=>(dispatch)=>{
    dispatch(commetToEdit({body:comment,id:commentId}));
    dispatch(isEditting(true));
};

export const editComment = (comment,articleSlug,commentId) =>async (dispatch)=>{
    dispatch(isEditting(false));
    dispatch(fetching(true));
    return await axiosInstance
        .put(`/article/${articleSlug}/comments/${commentId}`,comment)
        .then(response=>{
            dispatch(fetching(false));
        })
        .catch(error=>{
            dispatch(fetching(false));
        })
};

export const deleteComment = (commentId,articleSlug) =>async (dispatch)=>{
    dispatch(fetching(true));
    return await axiosInstance
        .delete(`/article/${articleSlug}/comments/${commentId}`)
        .then(response=>{
            dispatch(handleDelete(true));
            dispatch(fetching(false));
        })
        .catch(error=>{
            dispatch(fetching(false));
        })
};


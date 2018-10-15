import { LIKE, DISLIKE, FETCHING, ERROR, UNLIKE, UNDISLIKE, LIKECOUNT,DISLIKECOUNT } from '../actions/types';

const IntialState = {
liked:false,
fetching:false,
error:'',
dislikeCount:0,
likeCount:0
}

export const LikeDisLikeReducer = (state = IntialState, action) => {
    switch (action.type) {
        default:
            return state
        case LIKE:
            return {
                ...state,
                liked: action.payload
            }
        
        case ERROR:
            return{
                ...state ,
                error: action.payload
            }
        case FETCHING:
            return{
                ...state,
                fetching: action.payload
            }
        
        case LIKECOUNT:
        return{
            ...state,
            likeCount:action.payload
        }
        case DISLIKECOUNT:
        return{
            ...state,
            dislikeCount:action.payload
        }
    }
}

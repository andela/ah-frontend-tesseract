import {FETCH_LANDING_PROFILE, FETCH_LANDING_STORIES, FETCH_USER_FOLLOWING, FETCHING} from "../actions/types";

export const initialState = {
    stories: [],
    user:"",
    following:[],
    isFetching: false,
};

const landingReducer = (state=initialState,action) =>{
    switch (action.type) {
        case FETCH_LANDING_STORIES:
            return {
                ...state,
                stories: action.payload
            };

        case FETCH_LANDING_PROFILE:
            return {
                ...state,
                user: action.payload
            };

        case FETCH_USER_FOLLOWING:
            return {
                ...state,
                following: action.payload
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

export default landingReducer;

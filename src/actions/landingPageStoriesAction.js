import {axiosInstance} from "../globals";
import {FETCH_LANDING_PROFILE, FETCH_LANDING_STORIES, FETCH_USER_FOLLOWING, FETCHING} from "./types";

const articles= payload => {
    return {
        type:FETCH_LANDING_STORIES,
        payload
    }
};

const followingList = payload =>{
    return {
        type:FETCH_USER_FOLLOWING,
        payload
    }
};

const userProfile= payload => {
    return {
        type:FETCH_LANDING_PROFILE,
        payload
    }
};

const fetching =payload =>{
    return{
        type:FETCHING,
        payload
    }
};

export const getProfile = () => async (dispatch) =>{
    dispatch(fetching(true));
    return await axiosInstance
        .get("/user/")
        .then(response=>{
           dispatch(userProfile(response.data.username));
           dispatch(fetching(false));
        })
        .catch(error => {
            dispatch(fetching(false));
        })

};

export const getFollowing = (username) => async (dispatch) => {
        dispatch(fetching(true));
        return await axiosInstance
            .get(`/profiles/user/${username}`)
            .then(response => {
               let following = response.data.profile.following;
               dispatch(followingList(following));
               dispatch(fetching(false));
            })
            .catch(error => {
                console.log("Followers info", error.response);
                dispatch(fetching(false));
            })

};

export const searchArticles = (author) => async (dispatch) => {
    dispatch(fetching(true));
    return await axiosInstance
        .get(`/articles/search/?author=${author}`)
        .then(response=>{
            dispatch(articles(response.data));
            dispatch(fetching(false));
        })
        .catch(error=>{
            dispatch(fetching(false));
        })
};


export const getRandomArticles = () => async (dispatch) =>{
    dispatch(fetching(true));
    return await axiosInstance
        .get(`/articles`)
        .then(response=>{
            dispatch(articles(response.data.articles));
            dispatch(fetching(false));
        })
        .catch(error=>{
            dispatch(fetching(false));
        })
};
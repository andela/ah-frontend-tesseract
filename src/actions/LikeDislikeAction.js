import { LIKE, DISLIKE, FETCHING, ERROR, UNLIKE, UNDISLIKE, LIKECOUNT, DISLIKECOUNT } from './types';
import { axiosInstance } from '../globals';


const likeAction = payload => {
    return {
      type: LIKE,
      payload: payload
    };
  };

export const likesCountAction = payload => {
return {
    type: LIKECOUNT,
    payload:payload
};
};

const DislikeAction = payload => {
return {
    type: DISLIKE,
    payload: payload
};
};
export const DislikeCountAction = (payload) => {
    return {
        type: DISLIKECOUNT,
        payload:payload
    };
};

const FetchingAction = payload => {
    return {
      type: FETCHING,
      payload: payload
    };
  };


const ErrorAction = payload =>{
    return{
        type: ERROR,
        payload
    }
};


export const HandleLikesCount = (article) => async (dispatch) => {

    dispatch(FetchingAction(true));
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('TOKEN')
    }
    return await (
        axiosInstance.get('/article/get/'+article)
            .then((response) => {
                console.log(response.data.likes)
                console.log(response.data.dislikes)
                dispatch(FetchingAction(false));
                dispatch(likesCountAction(response.data.likes))
                dispatch(DislikeCountAction(response.data.dislikes))

            })

            .catch((error) => {
                console.log(error.response)

            })
    )
};

  export const LikeDislikeArticles = (articleData) => async (dispatch) => {

    dispatch(FetchingAction(true));
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('TOKEN')
    }
    return await (
        axiosInstance.post('/article/like', articleData,{headers: headers})
            .then((response) => {
                console.log(response)
                dispatch(FetchingAction(false));
                dispatch(likeAction(true));
            })

            .catch((error) => {
                console.log(error.response)
                ErrorAction(error.response)
                dispatch(FetchingAction(false));

            })
    )
};



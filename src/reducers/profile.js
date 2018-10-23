import {
    EDITING_PROFILE,
    FETCHING_PROFILE,
    PROFILE_ERROR,
    SAVING_PROFILE,
    SET_PROFILE,
    USERS_LIST
} from '../actions/types';

const setProfile = payload => ({
    email: payload.email,
    username: payload.username,
    bio: payload.bio,
    image: payload.image,
    location: payload.location,
    occupation: payload.occupation,
});

export const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCHING_PROFILE:
            return {...state, isFetchingProfile: action.payload};
        case SET_PROFILE:
            return {...state, ...setProfile(action.payload), profileErrors: undefined};
        case SAVING_PROFILE:
            return {...state, isSavingProfile: action.payload, profileErrors: undefined};
        case EDITING_PROFILE:
            return {...state, isEditing: action.payload, profileErrors: undefined};
        case PROFILE_ERROR:
            return {...state, profileErrors: action.payload};
        case USERS_LIST:
            const newState = onFollowUser(action,state).newState;
            const followData = onFollowUser(action,state).followData;
            return {
                ...state,
                usersList: newState || action.payload.data.users,
                followers: followData.followers || 0,
                following: followData.following || 0
            };
        default:
            return state;
    }
};


const onFollowUser = (action, state) => {

    let followData, newState;

    if (action.payload.data.users) {
        followData = {
            followers: action.payload.data.users[0].followers.length,
            following: action.payload.data.users[0].following.length
        };
    } else {
        newState = state.usersList.map(user => user.username === action.payload.followedUser ? ({
            ...user,
            follows: action.payload.follow
        }) : user);

        followData = {
            followers: state.followers,
            following: action.payload.follow ? state.following + 1 : state.following - 1
        }
    }

    return {followData, newState}
};



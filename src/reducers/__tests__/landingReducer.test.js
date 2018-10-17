import {FETCH_LANDING_PROFILE, FETCH_LANDING_STORIES, FETCH_USER_FOLLOWING, FETCHING} from "../../actions/types";
import landingReducer, {initialState} from "../landingStories";

describe('test landing reducer', () => {

    let beforeState;
    let stories=[{"title":"hey","author":"user2"}];
    beforeEach(() => {
        beforeState = initialState
    });

    it('returns initial state', () => {
        expect(landingReducer(undefined, {})).toEqual(beforeState);
    });

    it('test updating stories',  () => {
        const action = {type: FETCH_LANDING_STORIES, payload: stories};
        const afterState = landingReducer(beforeState, action);
        beforeState.stories=stories;
        expect(afterState).toEqual(beforeState);
    });

    it('test fetching profile', () => {
        const action = {type: FETCH_LANDING_PROFILE, payload: "user5"};
        const afterState = landingReducer(beforeState, action);
        beforeState.user="user5";
        expect(afterState).toEqual(beforeState);
    });


    it('test fetching following', () => {
        const action = {type: FETCH_USER_FOLLOWING, payload: [{user:"user2"}]};
        const afterState = landingReducer(beforeState, action);
        beforeState.following=[{user:"user2"}];
        expect(afterState).toEqual(beforeState);
    });


});
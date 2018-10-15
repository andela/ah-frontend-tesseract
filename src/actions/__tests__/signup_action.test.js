import configureMockStore from 'redux-mock-store';
import  {createUser} from '../signupActions'
import {CREATE_NORMAL_USER, FETCHING, SIGNUP_ERROR} from "../types";
import MockAdapter from 'axios-mock-adapter';
import {axiosInstance} from '../../globals';

describe('sign_up action',()=>{
    let store;
    let httpMock;
    let requestUrl;

    const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

    beforeEach(()=>{
        httpMock = new MockAdapter(axiosInstance);
        requestUrl= "/users/";
        const mockStore = configureMockStore();
        store = mockStore({}); // pass it the initial state
        });

    it('sign up user', async () => {
        let response_data={
            "token":"sample token"
        };

        httpMock.onPost(requestUrl).reply(201,response_data);
        createUser()(store.dispatch);
        await flushAllPromises();

        expect(store.getActions()).toEqual(
            expectedResponse(CREATE_NORMAL_USER,response_data)
        )

    });


    it('sign up with errors', async () => {

        httpMock.onPost(requestUrl).reply(400,undefined);
        createUser()(store.dispatch);
        await flushAllPromises();

        expect(store.getActions()).toEqual(
            [
                {type:FETCHING,payload:true},
                {type:SIGNUP_ERROR,payload: {"error": "Check your internet connection"}},

            ]
        )
    });

    it('sign up with errors', async () => {

        httpMock.onPost(requestUrl).reply(400,{});
        createUser()(store.dispatch);
        await flushAllPromises();

        expect(store.getActions()).toEqual(
            expectedResponse(SIGNUP_ERROR,undefined)
        )

    })
});

const expectedResponse = (action,value) =>{
    return (
        [
            {type:FETCHING,payload:true},
            {type:action,payload: value},
            {type:FETCHING,payload:false}
        ]
    )
};



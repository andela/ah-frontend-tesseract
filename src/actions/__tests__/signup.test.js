import configureMockStore from 'redux-mock-store';
import  {createUser} from '../signupActions'
import {CREATE_NORMAL_USER, IS_LOADING} from "../types";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {SIGN_UP_URL} from "../../components/globals";


describe('sign_up action',()=>{
    let store;
    let httpMock;

    const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

    beforeEach(()=>{
        httpMock = new MockAdapter(axios);
        const mockStore = configureMockStore();
        store = mockStore({}); // pass it the initial state
        });

    it('sign up user', async () => {
        let response_data={
            "token":"sample token"
        };

        httpMock.onPost(SIGN_UP_URL).reply(201,response_data);
        createUser()(store.dispatch);
        await flushAllPromises();

        expect(store.getActions()).toEqual(
            [
                {type:IS_LOADING,payload:true},
                {type:CREATE_NORMAL_USER,payload:response_data},
                {type:IS_LOADING,payload:false}
            ]
        )


    })
})




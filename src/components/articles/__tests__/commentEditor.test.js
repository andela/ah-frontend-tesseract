import Enzyme, {shallow,mount} from 'enzyme';

import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import CommentEditor from "../commentEditor";
import {userDetails} from "./comments.test";

Enzyme.configure({adapter: new Adapter() });

describe('comment Editor Tests', () => {

    let editorComponent;


    const saveEditChanges = jest.fn();
    const createComment = jest.fn();

    beforeEach(() => {
        editorComponent = mount(<CommentEditor isEditing={false}
                                                editedComment={{body:'hy there',id:10}}
                                                isLoggedIn={true}
                                                articleSlug={"sample_slug"}
                                                userDetails={userDetails}
                                                saveEditChanges={saveEditChanges}
                                                createComment={createComment} />);
    });

    it('renders without crashing', () => {
        expect(editorComponent).toHaveLength(1);
    });


    it('should fail validations with empty fields', () => {
        editorComponent.instance().setState(
            {
                usersComment: '',
            },
        );
        editorComponent.find('#create-comment-btn').simulate('click');
        expect(createComment).toBeCalledTimes(0);
    });

    it('should pass and call create comment empty fields', () => {
        editorComponent.instance().setState(
            {
                usersComment: 'hello there',
            },
        );
        editorComponent.find('#create-comment-btn').simulate('click');
        expect(createComment).toBeCalledTimes(1);
    });


});
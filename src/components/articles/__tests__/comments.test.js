import Enzyme, {shallow,mount} from 'enzyme';

import React from "react";
import ShowComments from "../comments";
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter() });

export let userDetails={
    id: 38,
    username: 'byarus45',
    image:'sample.png',
};

describe('test comments', () => {

    let commentsComponent;

    let comments=[{
        "id": 78,
        "created_at": "2018-10-25T16:15:26.358319Z",
        "updated_at": "2018-10-25T16:15:26.358371Z",
        "body": "hey there",
        "author": {
            "id": 38,
            "username": "byarus45"
        },
        "replies": [
            {
                "id": 80,
                "created_at": "2018-10-25T16:34:31.592269Z",
                "updated_at": "2018-10-25T16:34:31.592316Z",
                "body": "new reply",
                "author": 1
            }
        ]
    },
        {
            "id": 81,
            "created_at": "2018-10-25T16:34:50.981501Z",
            "updated_at": "2018-10-25T16:34:50.981556Z",
            "body": "ksk",
            "author": {
                "id": 38,
                "username": "byarus45"
            },
            "replies": []
        }];

    const handleEditing = jest.fn();
    const handleDeleteComment = jest.fn();

    beforeEach(() => {
        commentsComponent = mount(<ShowComments comments={comments}
                                                userDetails={userDetails}
                                                handleEditing={handleEditing}
                                                articleSlug={"sampleSlug"}
                                                deleteComment={handleDeleteComment} />);
    });

    it('renders without crashing', () => {
        expect(commentsComponent).toHaveLength(1);
    });

});
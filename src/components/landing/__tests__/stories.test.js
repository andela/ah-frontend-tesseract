/* eslint-disable no-undef,import/no-named-as-default */
import Enzyme,  {shallow, mount}  from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Stories from "../Stories";

Enzyme.configure({ adapter: new Adapter() });

describe('test stories form component', () => {
    let component;
    const stories = [{author: {id: 1, username: "user1"},
        average_rating: 3,
        body: "this is the body",
        created_at: "2018-09-20T13:06:56.580470Z",
        description: "this is a description",
        read_time: "less than 1 min",
        slug: "this-is-my-title",
        title: "this is my title"}];

    beforeEach(() => {
        component = mount(<Stories stories={stories} fetchStatus={false} />);
    });

    it('renders without crashing', () => {
        expect(component).toHaveLength(1);
    });


});

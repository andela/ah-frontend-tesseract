import React from "react";
import SocialButtons from "../SocialButtons";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

describe('social buttons component', ()=> {
    let handleSocialResponse, history;

    beforeEach(() => {
    handleSocialResponse = jest.fn();
    history = { push: jest.fn() };

  });

    it("renders without crashing", () => {
        shallow(<SocialButtons handleSocialResponse={handleSocialResponse} history={history}/>);
    });

});

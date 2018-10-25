import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RatingStars from '../Rating';

Enzyme.configure({ adapter: new Adapter() });

describe('rating components', () => {
  let props;

  beforeEach(() => {
    props = {
      averageRating: 2,
      prevUserRating: 3,
      isLoggedIn: true,
      isOwner: false,
      ratingInfo: { rating: 3 },
      handleRating: jest.fn(),
      getArticle: jest.fn(),
    };
  });

  it('renders rating stars without crashing', () => {
    shallow(<RatingStars {...props} />);
  });

  it('simulates successful rating', () => {
    const wrapper = shallow(<RatingStars
      {...props}
      prevUserRating={null}
    />);

    wrapper.find('#star1').simulate('click');
    expect(props.handleRating).toHaveBeenCalled();
  });

  it('simulates unsuccessful clicking', () => {
    props.ratingInfo.error = 'There was an error';
    const wrapper = shallow(<RatingStars
      {...props}
      prevUserRating={null}
    />);

    wrapper.find('#star1').simulate('click');
  });
});

import React from 'react';
import M from 'materialize-css';
import PropTypes from "prop-types";

export default class RatingStars extends React.Component {
  onRate = async (rating) => {
    const {
      handleRating, ratingInfo, slug, getArticle, prevUserRating,
    } = this.props;

    if (prevUserRating) return;
    const ratingData = {
      article: slug,
      rating,
    };
    await handleRating(ratingData);
    getArticle(slug);
    if (ratingInfo.error) {
      M.toast({
        html: 'There was an error, please try again or check your internet connection',
        classes: 'red darken-3',
      });
    }
  };

  render() {
    const {
      averageRating, prevUserRating, isLoggedIn, isOwner,
    } = this.props;
    const rating = prevUserRating || 0;
    const stars = [1, 2, 3, 4, 5];
    return (
      <div>
        <div>
          <span className="badge left">
          Average Rating:
            {` ${averageRating}/5`}
          </span>
        </div>
        <ul className="list-inline">
          {isLoggedIn && !isOwner && stars.map(star => (
            <li key={star} onClick={() => this.onRate(star)} id={`star${star}`}>
              <i className={`material-icons ${!prevUserRating && 'btn-flat'} yellow-text`}>
                {star <= rating ? 'star' : 'star_border'}
              </i>
            </li>
          ))
          }
        </ul>
      </div>
    );
  }
}

RatingStars.propTypes = {
  averageRating: PropTypes.number.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isOwner: PropTypes.bool.isRequired,
};

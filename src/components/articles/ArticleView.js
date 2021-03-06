import React from "react";
import { Editor } from "draft-js";
import { styleMap } from "./BodyEditor";
import {
  deleteAction,
  deleteArticle,
  editArticle,
  getArticle,
  updateArticle,
  viewArticle
} from "../../actions";
import Modal from "../common/Modal";

import { connect } from "react-redux";
import M from "materialize-css";
import Popup from "../base/Popup";
import PropTypes from "prop-types";
import RatingStars from './Rating';
import { handleRating } from "../../actions/rating";

class ArticleView extends React.Component {

  componentWillMount() {
    this.props.getArticle(this.props.match.params.slug);
  }

  confirmDelete = async () => {
    await this.props.deleteArticle(this.props.article.slug);
    // do something when delete in the API is successful or not

    this.props.history.push("/articles");
    M.toast({ html: this.props.message, classes: "green darken-3" });
  };

  onEditArticle = async event => {
    event.preventDefault();
    this.props.editArticle(true);
    this.props.viewArticle(false);
    this.props.history.push("/article-create");
  };

  onDeleteArticle = event => {
    event.preventDefault();
    this.props.deleteAction(true);
  };

  showArticle = () => {
    const { match } = this.props;
    const { slug } = match.params;
    return (
      <div className={" container article-view"} id={"article-container"}>
        {localStorage.getItem("token") &&
          this.props.isOwner &&
          AuthActions(
            this.props.onDelete,
            this.onDeleteArticle,
            this.onEditArticle
          )}
        <h5>{this.props.article.title}</h5><br/>
        <img  className="article-image center" src={this.props.article.image} width="900" crop="scale" align="middle" id="image" />
        <div>
          <Editor
            customStyleMap={styleMap}
            editorState={this.props.article.body}
            readOnly={true}
            ref={"editor"}
          />
        </div>
          <div >
          <br/><br/>
           {this.props.article.tagsList.map(tag=>{ return tag !== ""?<div className="chip ">{tag}</div>:"" })}
          </div>
        <div className="right">
          <RatingStars
            averageRating={this.props.article.average_rating}
            prevUserRating={this.props.article.users_rating}
            ratingInfo={this.props.rating}
            handleRating={this.props.handleRating}
            slug={slug}
            getArticle={this.props.getArticle}
            isLoggedIn={this.props.auth.isLoggedIn}
            isOwner={this.props.isOwner}
          />
        </div>

        <Modal
          confirm={this.confirmDelete}
          header={"Confirm Delete"}
          description={"Are you sure you want to delete this Article? "}
        />
      </div>
    );
  };

  render() {
    if (this.props.onView) {
      return this.showArticle();
    }
    return (
      <div className={"container"}>
        <Popup history={this.props.history} />
      </div>
    );
  }
}

ArticleView.propTypes = {
  onView: PropTypes.bool.isRequired,
  onDelete: PropTypes.bool.isRequired,
  isOwner: PropTypes.bool.isRequired,
  getArticle: PropTypes.func.isRequired,
  deleteAction: PropTypes.func.isRequired,
  editArticle: PropTypes.func.isRequired,
  viewArticle: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  rating: PropTypes.object.isRequired,
  handleRating: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    isLoggedIn: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = state => {
  return {
    article: state.article.apiArticle,
    onEdit: state.article.onEdit,
    onDelete: state.article.onDelete,
    message: state.article.message,
    onView: state.article.onView,
    isOwner: state.article.isOwner,
    rating: state.articleRating,
    auth: state.authentication,
  };
};

export default connect( mapStateToProps,
  {
    viewArticle,
    editArticle,
    updateArticle,
    deleteAction,
    deleteArticle,
    getArticle,
    handleRating
  }
)(ArticleView);

const AuthActions = (onDelete, onDeleteArticle, onEditArticle) => {
  return (
    <div>
      <div className={onDelete ? "modal-overlay" : ""} />
      <span onClick={onDeleteArticle} className={"right edit-delete-icons"}>
        <i
          data-target="modal1"
          className=" modal-trigger material-icons edit-area"
        >
          delete
        </i>
      </span>
      <span onClick={onEditArticle} className={"right edit-delete-icons"}>
        <i className="material-icons edit-area">edit</i>
      </span>
    </div>
  );
};

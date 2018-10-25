import React from "react";
import { Editor } from "draft-js";
import { styleMap } from "./BodyEditor";
import {
    deleteAction,
    deleteArticle,
    editArticle, getArticle,
    updateArticle, updateStoreArticle,
    viewArticle
} from "../../actions";
import Modal from "../common/Modal";

import { connect } from "react-redux";
import M from "materialize-css";
import Popup from "../base/Popup";
import PropTypes from "prop-types";
import {createComment, deleteComment, editComment, fetchComments, setCommentEdit} from "../../actions/commentAction";
import ShowComments from "./comments";
import CommentEditor from "./commentEditor";

class ArticleView extends React.Component {

    componentDidMount() {
         this.props.getArticle(this.props.match.params.slug);
         this.props.fetchComments(this.props.match.params.slug);
    }

  componentWillUnmount() {
    // Initialize state on exiting the component
    this.props.updateStoreArticle({});
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

  createComment=async (comment,slug)=>{
      await this.props.createComment(comment,slug);

      if (this.props.isCommentCreated){
          this.props.fetchComments(slug);
      }

  };

  handleDeleteComment = async (commentId,slug)=>{
      await this.props.deleteComment(commentId,slug);
        console.log(this.props.isCommentDeleted);
      if (this.props.isCommentDeleted){
          this.props.fetchComments(slug);
      }

  };

  handleEditing=(comment,commentId)=>{
        this.props.setCommentEdit(comment,commentId);
  };

  saveEditChanges=async (comment,articleSlug,commentId)=>{
     await this.props.editComment(comment,articleSlug,commentId);
      this.props.fetchComments(articleSlug);
  };

  showArticle = () => {
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

          <CommentEditor isEditing={this.props.isEditing}
                         editedComment={this.props.editedComment}
                         isLoggedIn={this.props.isLoggedIn}
                         articleSlug={this.props.article.slug}
                         userDetails={this.props.userDetails}
                         saveEditChanges={this.saveEditChanges}
                         createComment={this.createComment} />

          <ShowComments  comments={this.props.comments}
                         userDetails={this.props.userDetails}
                         handleEditing={this.handleEditing}
                         articleSlug={this.props.article.slug}
                         deleteComment={this.handleDeleteComment}  />

          <Modal confirm={this.confirmDelete} header={"Confirm Delete"} description={"Are you sure you want to delete this Article? "}/>
      </div>

    );
  };

  render() {

      if (this.props.onView){
          return this.showArticle()
      }
      return <div className={"container"} ><Popup
              history={this.props.history}
              /></div>

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
  })
};

const mapStateToProps = state => {
  return {
    article: state.article.apiArticle,
    onEdit: state.article.onEdit,
    onDelete: state.article.onDelete,
    message: state.article.message,
    onView: state.article.onView,
    isOwner: state.article.isOwner,
    comments:state.comment.comments,
    isCommentCreated:state.comment.commentCreated,
    isCommentDeleted:state.comment.commentDeleted,
    editedComment:state.comment.editedComment,
    isEditing:state.comment.isEditing,
    userDetails:state.authentication.userDetails,
    isLoggedIn:state.authentication.isLoggedIn,
  };
};

export default connect(
  mapStateToProps,
  {
    viewArticle,
    editArticle,
    updateArticle,
    deleteAction,
    deleteArticle,
    getArticle,
    updateStoreArticle,
    fetchComments,
    createComment,
    deleteComment,
    setCommentEdit,
    editComment,
  }
)(ArticleView);

const AuthActions = (onDelete,onDeleteArticle,onEditArticle) =>{
return ( <div>
              <div className={onDelete? "modal-overlay":""} />
          <span onClick={onDeleteArticle} className={"right edit-delete-icons"}>
          <i data-target="modal1" className=" modal-trigger material-icons edit-area">delete</i>
        </span>
        <span onClick={onEditArticle} className={"right edit-delete-icons"}>
          <i className="material-icons edit-area">edit</i>
        </span>
    </div>
  );
};

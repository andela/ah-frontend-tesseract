import React from "react";
import BodyEditor from "./BodyEditor";
import PropTypes from "prop-types";


class ArticleForm extends React.Component {

    checkEmpty = str =>{
    return !str||!str.trim();
};

  render() {
    return (
      <form>
        <input type={"text"} name={"title"}
          placeholder={"Title"} value={this.props.article.title}
          onChange={this.props.handleInputChange} required={true}
        />
        <div onClick={this.focus} >
          <BodyEditor
             editorState={this.props.article.body}
             ref={"editor"}
             onChange={this.props.onChange}/>
        </div>
        <SubmitButtons
          article={this.props.article}
          onEdit={this.props.onEdit}
          checkEmpty={this.checkEmpty}
          preview={this.props.preview}
          handleInputChange={this.props.handleInputChange}
          updateArticle={this.props.updateArticle}
        />
      </form>
    );
  }
}

ArticleForm.propTypes = {
  onEdit: PropTypes.bool.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  updateArticle: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired
};

const SubmitButtons = props => {
  return (<div>
      {props.onEdit ? (
          <div className={"description"}>
          <label>Description</label>
          <textarea
            name={"description"}
            onChange={props.handleInputChange}
            value={props.article.description}
            minLength={5}
            maxLength={300} />
              {props.fetchStatus ? (<button className={"row waves-effect waves-light btn disabled"}>
               saving...........
            </button>) : (<button
          className={"row waves-effect waves-light btn"}
          onClick={props.updateArticle}>
          Save Changes
        </button>)} </div>
      ) : (!props.checkEmpty(props.article.body.getCurrentContent().getPlainText()) && (
          <button
            className={"row waves-effect waves-light btn"}
            onClick={props.preview}>
            PREVIEW ARTICLE
          </button>))}
    </div>)};

export default ArticleForm;

import React from 'react';
import { Editor }from 'draft-js';
import { styleMap } from './BodyEditor';
import PropTypes from 'prop-types';
import {DescriptionTagField} from './CreateArticle';

/**
 *
 */
class ArticlePreview extends React.Component {
  /**
   *
   * @returns {{label: T, value: T}[]}
   */

  render() {
    return (
      <div className={"row col s12"}>
        <StoryPreview edit={this.props.edit} article={this.props.article} />
        <div className={"row col s1"} />
        <div className={"col s4 description"}>

          <DescriptionTagField {...this.props}/>

          <form onSubmit={this.props.onSubmit}>
            {!this.props.fetchStatus ? (
              <button className={"row waves-effect waves-light btn"}>
                Publish now <i className={"material-icons right"}>send</i>
              </button>
            ) : (
              <button className={"row waves-effect waves-light btn disabled"}>
                Publishing ...........
              </button>
            )}
          </form>
        </div>
      </div>
    ) }
}

/**
 *
 */
class StoryPreview extends React.Component {
  render() {
    return (
      <div className={"col s7 article-preview"}>
        <div className={"row"}>
          <h5>Story Preview</h5>
          <span onClick={this.props.edit}>
            <i className="material-icons right edit-area">edit</i>
          </span>
        </div>
        <div>
          <h5>{this.props.article.title}</h5>
          <Editor
            readOnly={true}
            editorState={this.props.article.body}
            customStyleMap={styleMap}
            ref={"editor"}
          />
        </div>
      </div>
    );
  }
}

ArticlePreview.propTypes = {
  article: PropTypes.object.isRequired,
  edit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  fetchStatus: PropTypes.bool.isRequired,
  history: PropTypes.shape({
  push: PropTypes.func.isRequired,
  go: PropTypes.func.isRequired
    })
};

export default ArticlePreview;

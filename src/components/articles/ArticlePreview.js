import React from "react";
import { Editor }from "draft-js";
import {styleMap} from "./BodyEditor";
import M from 'materialize-css';

class ArticlePreview extends React.Component {

  render() {
      return <div className={"row col s12"}>
          <StoryPreview edit={this.props.edit} article={this.props.article}/>
          <div className={"row col s1"}/>
          <div className={"col s4 description"}>
              <h5>Add description</h5>
              <textarea
                  name={"description"}
                  onChange={this.props.handleInputChange}
                  value={this.props.article.description}
                  maxLength={300} />
              <form onSubmit={this.props.onSubmit}>
                  {!this.props.fetchStatus ?
                      <button className={"row waves-effect waves-light btn"}>
                          Publish now <i className={"material-icons right"}>send</i>
                      </button> :
                      <button className={"row waves-effect waves-light btn disabled"}>
                          Publishing ...........
                      </button>}
              </form>
          </div>
      </div>;
  }
}
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
        )
    }
}



export default ArticlePreview;

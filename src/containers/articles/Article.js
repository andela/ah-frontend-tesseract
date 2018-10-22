import React from "react";
import ArticleForm from "../../components/articles/CreateArticle";
import "../../components/styles/articles.scss";
import { connect } from "react-redux";
import {
  createArticle,
  previewArticle,
  publishArticle,
  viewArticle,
  updateArticle,
  clearMessage,
  getArticleTags
} from "../../actions";
import ArticlePreview from "../../components/articles/ArticlePreview";
import M from "materialize-css";
import PropTypes from "prop-types";


class Article extends React.Component {
  async componentWillMount() {
    await this.props.getArticleTags(true);
  }

  componentDidMount() {
    if (this.props.onEdit) {
      this.props.createArticle(this.props.storeArticle);
    }
  }

  onChange = editorState => {
    this.props.createArticle({ body: editorState });
  };

  getOptions = () => {
    return this.props.tags
      ? this.props.tags.map(tag => {
          return { label: tag, value: tag };
        })
      : "";
  };

  handleInputChange = event => {
    switch (event.target.name) {
      case "title":
        this.props.createArticle({ title: event.target.value });
        break;
      case "description":
        this.props.createArticle({ description: event.target.value });
        break;
      default:
          break;
    }
  };

  onTagChange = selectedTags => {
    this.props.createArticle({
      tagsList: selectedTags.map(value => {
        return value.value;
      })
    });
  };

  preview = () => {
    this.props.previewArticle(true);
  };

  onSubmit = async event => {
    event.preventDefault();

    await this.props.publishArticle(this.props.article);
    if (this.props.article.slug) {
      this.props.viewArticle(false);
      this.props.history.push(`/articles/${this.props.article.slug}`);
      M.toast({ html: this.props.message, classes: "green darken-3" });
      this.props.previewArticle(false);
    } else {
      M.toast({ html: this.props.message, classes: "red darken-3" });
    }
  };

  onPreviewEdit = async event => {
    event.preventDefault();
    this.props.previewArticle(false);
  };

  updateArticle = async event => {
    event.preventDefault();
    await this.props.updateArticle(this.props.article);

    if (this.props.article.slug) {
      this.props.history.push(`/articles/${this.props.article.slug}`);
      M.toast({ html: this.props.message, classes: "green darken-3" });
    } else {
      M.toast({ html: this.props.message, classes: "red darken-3" });
    }
  };

  render() {
    return (
      <div className={"container"} id={"article-container"}>
        {this.props.onPreview ? (
          <ArticlePreview
            options={this.getOptions()}
            article={this.props.article}
            message={this.props.message}
            onTagChange={this.onTagChange}
            fetchStatus={this.props.fetchStatus}
            edit={this.onPreviewEdit}
            handleInputChange={this.handleInputChange}
            onSubmit={this.onSubmit}
          />
        ) : (
          <ArticleForm
            options={this.getOptions()}
            onTagChange={this.onTagChange}
            article={this.props.article}
            onEdit={this.props.onEdit}
            fetchStatus={this.props.fetchStatus}
            updateArticle={this.updateArticle}
            onChange={this.onChange}
            handleInputChange={this.handleInputChange}
            preview={this.preview}
          />
        )}
      </div>
    );
  }
}

Article.propTypes = {
  article: PropTypes.object.isRequired,
  onEdit: PropTypes.bool.isRequired,
  fetchStatus: PropTypes.bool.isRequired,
  onPreview: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  clearMessage: PropTypes.func.isRequired,
  createArticle: PropTypes.func.isRequired,
  publishArticle: PropTypes.func.isRequired,
  previewArticle: PropTypes.func.isRequired,
  viewArticle: PropTypes.func.isRequired,
  updateArticle: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

const mapStateToProps = state => {
  return {
    article: state.article,
    tags: state.article.apiTags,
    storeArticle: state.article.apiArticle,
    onPreview: state.article.onPreview,
    onView: state.article.onView,
    onEdit: state.article.onEdit,
    message: state.article.message,
    fetchStatus: state.authentication.isFetching
  };
};

export default connect(
  mapStateToProps,
  {
    createArticle,
    previewArticle,
    publishArticle,
    viewArticle,
    updateArticle,
    clearMessage,
    getArticleTags
  }
)(Article);

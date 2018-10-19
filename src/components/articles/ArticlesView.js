import React from "react";
import { connect } from "react-redux";
import {getArticle, getArticles, viewArticle} from "../../actions";
import PropTypes from "prop-types";

class ArticlesView extends React.Component {

    async componentWillMount() {
        await this.props.getArticles(true);
    }

   viewArticle = slugToView => {
         this.props.history.push(`/articles/${slugToView}`);
         this.props.history.go()
    };

    render() {
        return (
            <div className={"container article-view"}>
                {
                this.props.articles.map((article, index) => {
                    return (
                <div className="row"  key={index}>
                <div className="col s12 m12">
                    <div role={'button'} className="card" onClick={()=>{this.viewArticle(article.slug)}}>
                        <div>
                </div>
                        <div className="card-content">
                            <span className="card-title"><h5>{article.title}</h5></span>
                            <p>{article.description}</p>
                        </div>
                        <div className="card-action">
                            {article.read_time} read
                        </div>
                    </div>
                </div>
            </div>);
                })}
            </div>
        );
    }
}

ArticlesView.propTypes = {
  articles: PropTypes.array.isRequired,
  getArticles: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired
  })
};

const mapStateToProps = state => {
    return {
        article: state.article,
        articles: state.article.articlesList,
        message: state.article.message,
    };
};

export default connect(
    mapStateToProps,
    {getArticles,viewArticle, getArticle}
)(ArticlesView);

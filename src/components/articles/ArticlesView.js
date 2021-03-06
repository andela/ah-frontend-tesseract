import React from "react";
import { connect } from "react-redux";
import {getArticle, getArticles, viewArticle} from "../../actions";
import PropTypes from "prop-types";
import Paginate from "./Paginate";

class ArticlesView extends React.Component {

    async componentWillMount() {
        await this.props.getArticles(1);

    }

   viewArticle = slugToView => {
         this.props.history.push(`/articles/${slugToView}`);
         this.props.history.go()
    };

    render() {
        return (
            <div>{ this.props.paginationData.totalPages > 0 ? (<div className={"container article-view"}>
                {
                this.props.articles.map((article, index) => {
                    return (
                <div className="row article-list"  key={index}>
                <div className="col s12 m12">
                    <div role={'button'} className="card" onClick={()=>{this.viewArticle(article.slug)}}>
                    <div className="row">
                        <div className={article.image?'card-content col s8':'card-content'}>
                            <span className="card-title"><h5>{article.title}</h5></span>
                            <p>{article.description}</p>
                        </div>
                        {article.image && <div className={'card-content col s4'}>
                            <img className="responsive-img card-content" src={article.image} />
                    </div> }

                        </div>
                           
                        <div className="card-action">
                            {article.read_time} read
                        </div>
                        <div className="card-action ">
                            {article.tagsList.map(tag=>{ return tag !== ""?<div className="chip ">{tag}</div>:"" })}
                        </div>
                    </div>

                  
                </div>
                
            </div>);
                })}

                <div className={"pagination center"}>
                    <Paginate paginationData={this.props.paginationData} getArticles={this.props.getArticles}/>
                </div>
            </div>) :<p> </p> }
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
        paginationData: state.article.paginationData,
        articles: state.article.articlesList,
        message: state.article.message,
    };
};

export default connect(
    mapStateToProps,
    {getArticles,viewArticle, getArticle}
)(ArticlesView);

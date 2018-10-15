import React, { Component } from 'react';
import { connect } from "react-redux";
import { LikeDislikeArticles, HandleLikesCount } from '../../actions/LikeDislikeAction';

class LikeDislike extends Component {
    constructor(props) {
        super(props);
       
    }

    componentDidMount(){
        this.props.HandleLikesCount("this-is-my-title")
         console.log(this.props.dislikeCount)
    }
    
     handleLike = async ()=>{
        const {LikeDislikeArticles, articleSlug} = this.props
        
       await LikeDislikeArticles({"article" : articleSlug, "like" : true})

        if (this.props.liked) {
           await this.props.HandleLikesCount(articleSlug)
        }
    
    }

    handleDisLike= async ()=>{
        const {LikeDislikeArticles, articleSlug} = this.props
       await LikeDislikeArticles({"article":articleSlug,"like": false})
       if (this.props.liked) {
        await this.props.HandleLikesCount(articleSlug)
     }
    }

    render() { 
        const {LikeCount, dislikeCount} = this.props
        return ( 
            <div className="card-action row">
            <div className = "col m6">    
                <div className="col m3" >
                    <h5 className="col "> {LikeCount} </h5>    
                    <a  className="btn-floating green">
                        <i onClick = {this.handleLike} className="material-icons">thumb_up</i>
                    </a>
                </div>
                <div className="col m3">
                    <a className="btn-floating red ">
                        <i onClick={this.handleDisLike} className="material-icons">thumb_down</i>  
                    </a>
                    <h5 className="col"> {dislikeCount}</h5>
                </div> 
            </div>   
        </div>
         );
    }
}
 
export const mapStateToProps = (state)=> ({
    liked: state.LikeDisLike.liked,
    LikeCount: state.LikeDisLike.likeCount,
    dislikeCount: state.LikeDisLike.dislikeCount,
});

export default connect(mapStateToProps, { LikeDislikeArticles, HandleLikesCount })(LikeDislike);


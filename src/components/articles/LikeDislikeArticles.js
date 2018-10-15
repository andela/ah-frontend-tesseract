import React, { Component } from 'react';
import { connect } from "react-redux";
import { LikeDislikeArticles, HandleLikesCount } from '../../actions/LikeDislikeAction';

class LikeDisLike extends Component {
    constructor(props) {
        super(props);
        
    }
    componentDidMount(){
        this.props.HandleLikesCount("this-is-my-title")
         console.log(this.props.dislikeCount)
    }
    
     handleLike = async ()=>{
        const {LikeDislikeArticles} = this.props
        
       await LikeDislikeArticles({"article" : "this-is-my-title", "like" : true})

        if (this.props.liked) {
           await this.props.HandleLikesCount("this-is-my-title")
        }
    
    }
    handleDisLike= async ()=>{
        const {LikeDislikeArticles} = this.props
       await LikeDislikeArticles({"article":"this-is-my-title","like": false})
       if (this.props.liked) {
        await this.props.HandleLikesCount("this-is-my-title")
     }
    }
    render() {
        
        return (
            <div className="card-action">
                <div >
                <span  > {this.props.LikeCount} likes</span>    
                <a  className="btn-floating green">
                    <i onClick = {this.handleLike} className="material-icons">thumb_up</i>
                </a>
                
                </div>
                <div >
                <span> {this.props.dislikeCount} dislikes</span>
                <a className="btn-floating red">
                    <i onClick={this.handleDisLike} className="material-icons">thumb_down</i>  </a>
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

export default connect(mapStateToProps, { LikeDislikeArticles, HandleLikesCount })(LikeDisLike);

import React from "react";
import M from "materialize-css";
import {getDate} from "../landing/Stories";
import SingleComment from "./SingleComment";

class ShowComments extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let elem = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elem, {inDuration:300});
    }

    deleteComment=(commentId)=>{
        this.props.deleteComment(commentId,this.props.articleSlug);
    };

    renderComments =()=>this.props.comments.map((comment,index)=>
        (
            <li key={index}>
                <div className="collapsible-header">
                    <SingleComment comment={comment} userDetails={this.props.userDetails} handleCommentEditting={this.props.handleEditing} deleteComment={this.deleteComment}/>

                </div>
                <div className="collapsible-body">
                    {comment.replies.length<1 ?
                        (<div className="date_read">no replies</div>)
                        :
                        comment.replies.map((reply,index)=>{
                            return (
                                <div className="row comment" key={index}>
                                    <div className="col s12" >
                                        <div className="col s1 m1">
                                            <img src={reply.author.image} alt="img"
                                                 className="circle responsive-img" />
                                        </div>
                                        <div className="col s11 m11">
                                            <p>{reply.author.username}</p>
                                            <p className="date_read">{getDate(reply.created_at)}</p>
                                        </div>
                                        <div className="col s11 m11 ">

                                            {reply.body}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </li>)
    );


    render(){
        return (

            <div className="card-action comments-card">
                <h6 className="title">Comments:</h6>
                {this.props.comments.length>0 ?
                    (
                <ul className="collapsible">
                    {this.renderComments()}
                </ul>)
                        :
                    ( <p>No comments</p>)
                }
            </div>

        )}
}


export default ShowComments;
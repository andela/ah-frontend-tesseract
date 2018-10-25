import React from "react";
import {getDate} from "../landing/Stories";

class SingleComment extends React.Component{
    constructor(props){
        super(props);
    }

    handleEditComment=()=>{
        this.props.handleCommentEditting(this.props.comment.body,this.props.comment.id)
    };

    handleDeleteComment=()=>{
        this.props.deleteComment(this.props.comment.id)
    };

    render(){
        return(
            <div className="row comment">
                <div className="col s12">

                        {this.props.comment.author.image?
                            <div className="col s2 m2">
                            <img src={this.props.comment.author.image} alt="img"
                                 className="circle responsive-img comments-photo" />
                            </div>
                            :
                            null
                        }


                    <div className="col s10 m10">
                        <p>{this.props.comment.author.username}</p>
                        <p className="date_read">{getDate(this.props.comment.created_at)}</p>

                    </div>
                    <div className="col s10 m10 ">

                        {this.props.comment.body.toString()}

                        {this.props.userDetails.username===this.props.comment.author.username &&
                        <span className=" edit-elemements ">
                            <a href="#" style={{width:'30px'}} onClick={this.handleEditComment}><i className="small material-icons grey-text text-lighten-1">edit</i></a>
                            <a className="link" onClick={this.handleDeleteComment} ><i className="small material-icons grey-text ">delete</i></a>
                        </span>
                        }

                    </div>

                </div>
            </div>
        )
    }
}

export default SingleComment;
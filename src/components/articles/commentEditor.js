import React from "react";
import M from "materialize-css";

class CommentEditor extends React.Component{
    constructor(props){
        super(props);
        this.state={
            usersComment:"",
            editing:false,
            editingComment:"",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange=(e)=>{
        if (e) this.setState({[e.target.name]:e.target.value});
    };



    handleSubmit=(e)=>{
        if (e)  e.preventDefault();
        if(this.state.usersComment.length<1){
            M.toast({html:"please enter your comment"});
        }else{
            let comment= {"comment": {"body": this.state.usersComment}};
            //    call submit method
            this.setState({usersComment:""});
            if(this.props.isEditing){
                this.props.saveEditChanges(comment,this.props.articleSlug,this.props.editedComment.id)
            }else{
                this.props.createComment(comment,this.props.articleSlug);
            }

        }

    };

    componentWillReceiveProps(nextProps, nextContext){
        if(nextProps.isEditing){
            this.setState({usersComment:this.props.editedComment.body});
        }
    }

    render() {

        console.log(this.props.isEditing);
        return (
            <div className="comments-editor custom-card">
                {this.props.isLoggedIn ?
                    <form className="col s12" onSubmit={e => this.handleSubmit(e)} method="post">
                        <div className="row" style={{paddingTop: '2%'}}>
                            <div className="col s1">
                                <img src={this.props.userDetails.image} alt=""
                                     className="circle responsive-img comments-photo"/>
                            </div>
                            <p className="col s10">{this.props.userDetails.username}</p>
                            <div className="input-field col s12 comments-textarea">
                            <textarea id="usersComment" name="usersComment" className="materialize-textarea"
                                      placeholder="Write your comment..." value={this.state.usersComment}
                                      onChange={e => this.handleChange(e)} />

                            </div>
                            <div className="input-field col s12 comment-btn">
                                <button id="create-comment-btn" className="btn comment-btn" type="submit" onClick={e => this.handleSubmit(e)}
                                        name="action">{this.props.isEditing?
                                    (<span>update Comment</span>)
                                    :
                                    <span>Comment</span>
                                }
                                    <i className="material-icons right">comment</i>
                                </button>
                            </div>
                        </div>
                    </form>
                    :(<p><a href="/login">Login to comment</a></p>)
                }
            </div>
        )
    }
};

export default CommentEditor;
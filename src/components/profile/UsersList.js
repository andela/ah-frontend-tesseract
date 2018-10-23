import React from 'react';
import {connect} from "react-redux";
import {followUser, getUsers, unFollowUser} from "../../actions/profile";
import Popup from "../base/Popup";
import PropTypes from "prop-types";

class UsersList extends React.Component {

    onFollow = async user => {
        await this.props.followUser(user);
    };

    onUnFollow = async (user) => {
        await this.props.unFollowUser(user);
    };

    render() {
        const className = this.props.isFetchingProfile ? 'btn disabled' : ' btn ';
        return (
            <div className={'container'} style={{border: 'thin solid #e0e0e0'}}>
                <ul className="collection row">
                    {this.props.users ? this.props.users.map((user, index) => {
                        return (
                            <UserCard follows={user.follows} user={user} className={className} onUnFollow={this.onUnFollow}
                                      onFollow={this.onFollow} index={index} key={index}/>
                        )
                    }) : <Popup history={this.props.history}/>
                    }
                </ul>
            </div>
        );
    }
}

export const UserCard = (props) => {
    return (
        <li id={`user${props.index}`} key={props.index} className="collection-item card col s6 m6">
            <div className="user-follow">
                <div className="card-content">
                                        <span><img src={props.user.image} alt=""
                                                   className="circle responsive-img small"/></span>
                    <span className="card-title">{props.user.username}</span>
                </div>
                <div className="card-action">
                    {props.follows ?
                        <button id={`rbutton${props.index}`}  onClick={() => {
                            props.onUnFollow(props.user.username)
                        }} key={props.index}
                                className={`red lighten-1 ${props.className}`}>UnFollow</button> :
                        <button id={`gbutton${props.index}`} onClick={() => {
                            props.onFollow(props.user.username)
                        }} key={props.index}
                                className={props.className}
                        >Follow</button>
                    }
                </div>
            </div>
        </li>
    )
};

UsersList.propTypes = {
  isFetchingProfile: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  unFollowUser: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

const mapStateToProps = state => {
    return {
        users: state.profile.usersList,
        isFetchingProfile: state.profile.isFetchingProfile
    }
};
export default connect(
    mapStateToProps,
    {
        getUsers,
        followUser,
        unFollowUser
    }
)(UsersList);


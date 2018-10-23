/* eslint-disable react/prop-types,react/destructuring-assignment */
import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import M from 'materialize-css';
import {logoutUser} from '../../actions';
import ProfileDropDown from './ProfileDropDown';
import {getUsers} from "../../actions/profile";


class Header extends React.Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isLoggedIn !== prevProps.isLoggedIn) {
            const elems = document.querySelectorAll('.sidenav');
            M.Sidenav.init(elems, {draggable: true});
        }
    }

    async componentWillMount() {
        await this.props.getUsers('');
    }

    logout = () => {
        if (localStorage.getItem('token')) {
            this.props.logoutUser();
            this.props.history.push('/login');
        }
    };

    render() {
        return (
            <div>
                <div className="navbar-fixed">
                    <nav>
                        <div className="nav-wrapper blue-grey darken-4 row">
                            {this.props.isLoggedIn && (
                                <a data-target="slide-out" className="sidenav-trigger show-on-large">
                                    <i className="material-icons">menu</i>
                                </a>
                            )}
                            <div className="brand-logo center">
                                <Link to="/">
                                    Authors Haven
                                    {' '}
                                    <i className="material-icons left">book</i>
                                </Link>
                            </div>
                            <ul className="nav-content right hide-on-med-and-down">
                                <li><Link to="/" className="waves-effect">Home</Link></li>
                                <li><Link to="/articles" className="waves-effect">Articles</Link></li>
                                {localStorage.getItem('token') &&
                                <li><Link to="/article-create" className="waves-effect">Write</Link></li>}
                                {!this.props.isLoggedIn && <li><Link to="/sign-up">Register</Link></li>}
                                {!this.props.isLoggedIn && <li><Link to="/login">Login</Link></li>}
                                {this.props.isLoggedIn && <ProfileDropDown logout={this.logout}/>}
                            </ul>
                        </div>
                    </nav>
                </div>
                <SideNav
                    isLoggedIn={this.props.isLoggedIn}
                    username={this.props.profile.username}
                    email={this.props.profile.email}
                    image={this.props.profile.image}
                    followers={this.props.profile.followers}
                    following={this.props.profile.following}
                />
            </div>
        );
    }
}

const SideNav = (props) => {
    const {
        isLoggedIn, username, email, image,
    } = props;

    if (!isLoggedIn) return null;
    return (
        <ul id="slide-out" className="sidenav">
            <li className="left-align">
                <div className="user-view blue-grey darken-4 waves-ripple">
                    <img className="circle" alt="" src={image}/>
                    <a><span className="blue-grey-text name">{username}</span></a>
                    <a><span className="blue-grey-text email">{email}</span></a>
                    <FollowData followers={props.followers} following={props.following}/>
                </div>
            </li>
            <li className="sidenav-close left-align">
                <Link to={'/article-create'}>Write</Link>
                <Link to={'/users'}>Users</Link>
            </li>
            <li>
                <div className="divider"/>
            </li>
        </ul>
    )
};

export const FollowData = (props) => {
    return (
        <div className={'row'}>
            <div className={'col s6'}>
                <Link to={'/users'}>Followers <br/><span className={'btn'}> {props.followers}</span></Link>
            </div>
            <div className={'col s6'}>
                <Link to={'/users'}>Following <br/><span className={'btn'}>  {props.following}</span></Link>
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    isLoggedIn: state.authentication.isLoggedIn,
    profile: state.profile,
});


export default connect(mapStateToProps, {logoutUser, getUsers})(Header);

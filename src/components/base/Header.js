/* eslint-disable react/prop-types,react/destructuring-assignment */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import M from 'materialize-css';
import { logoutUser } from '../../actions';
import ProfileDropDown from './ProfileDropDown';


class Header extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.isLoggedIn !== prevProps.isLoggedIn) {
      const elems = document.querySelectorAll('.sidenav');
      M.Sidenav.init(elems, { draggable: true });
    }
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
              <a href="#!" data-target="slide-out" className="sidenav-trigger show-on-large">
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
                {localStorage.getItem('token') && <li><Link to="/article-create" className="waves-effect">Write</Link></li>}
                {!this.props.isLoggedIn && <li><Link to="/sign-up">Register</Link></li>}
                {!this.props.isLoggedIn && <li><Link to="/login">Login</Link></li>}
                {this.props.isLoggedIn && <ProfileDropDown logout={this.logout} />}
              </ul>
            </div>
          </nav>
        </div>
        <SideNav
          isLoggedIn={this.props.isLoggedIn}
          username={this.props.profile.username}
          email={this.props.profile.email}
          image={this.props.profile.image}
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
          <img
            className="circle"
            alt=""
            src={image}
          />
          <a href="#!"><span className="blue-grey-text name">{username}</span></a>
          <a href="#!"><span className="blue-grey-text email">{email}</span></a>
        </div>
      </li>
      <li className="sidenav-close left-align">
        <Link to="/article-create">Write</Link>
      </li>
      <li>
        <div className="divider" />
      </li>
    </ul>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.authentication.isLoggedIn,
  profile: state.profile,
});


export default connect(mapStateToProps, { logoutUser })(Header);

/* eslint-disable react/prop-types,react/destructuring-assignment */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions';


const Header = (props) => {
  const logout = () => {
    if (props.isLoggedIn) {
      props.logoutUser();
    }
  };

  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper blue-grey darken-4 row">

          <div className="col s1 left ">
            <a href="#" data-target="slide-out" className="sidenav-trigger show-on-large right">
              <i className="material-icons">menu</i>
            </a>
          </div>

          <div className="brand-logo center">
            <Link to="/">
                            Authors Haven
              {' '}
              <i className="material-icons left">book</i>
            </Link>
          </div>
          <ul className="nav-content right hide-on-med-and-down">
            <li><Link to="/" className="waves-effect">Home</Link></li>
            <li>
              <Link to="/login" onClick={logout} className="waves-effect">
                {props.isLoggedIn ? 'Logout' : 'Login'}
              </Link>
            </li>
            <li><Link to="/sign-up">Register</Link></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = state => ({ isLoggedIn: state.authentication.isLoggedIn });

export default connect(mapStateToProps, { logoutUser })(Header);

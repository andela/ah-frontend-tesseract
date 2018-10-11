import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import M from 'materialize-css';


// This route ensures that a user is logged in before they access a particular page
class AuthRequiredRoute extends Route {
  render() {
    if (!this.props.isLoggedIn && !this.props.isFetchingUserFromToken) {
      M.toast({ html: 'You need to login to view that page', classes: 'red darken-3' });
      return <Redirect to="/login" />;
    }

    const Component = this.props.component;
    return <Component />;
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.authentication.isLoggedIn,
  isFetchingUserFromToken: state.authentication.isFetchingUserFromToken,
});

export default connect(mapStateToProps)(AuthRequiredRoute);

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUserFromToken } from '../actions';
import App from '../components/App';
import { handleGetProfileResponse } from '../actions/profile';

const mapDispatchToProps = dispatch => ({
  getUserFromToken: () => {
    const token = localStorage.getItem('token');
    if (!token || token === '') return;
    dispatch(getUserFromToken(token));
  },
  getProfile: dispatch(handleGetProfileResponse(true)),
});

export default withRouter(connect(null, mapDispatchToProps)(App));

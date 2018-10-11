/* eslint-disable react/prop-types,object-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import M from 'materialize-css';
import { Profile, ProfileForm, Spinner } from '../components/profile/Profile';
import {
  handleGetProfileResponse,
  handleEditProfile,
  ToggleEditingAction,
  handleGetSpecificUserProfile,
} from '../actions/profile';

export class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);

    const { getProfile, getSpecificUserProfile } = this.props;
    this.username = null;
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment,prefer-destructuring
    if (this.props.match) this.username = this.props.match.params.username;

    if (!this.username) getProfile();
    else getSpecificUserProfile(this.username);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { profile } = this.props;
    if (!prevProps.profile.profileErrors && profile.profileErrors && this.username) {
      M.toast({ html: 'This user was not found', classes: 'red darken-3' });
    }
  }

    saveProfile = (profileData) => {
      const { saveProfile } = this.props;
      saveProfile(profileData);
    };

    render() {
      const { profile, toggleEditingProfile } = this.props;
      if (profile.isFetchingProfile) {
        return (
          <div className="card-panel">
            <Spinner />
          </div>
        );
      }

      if (profile.profileErrors && this.username) {
        return <div />;
      }

      return (
        <ProfileDiv
          profile={profile}
          toggleEditingProfile={toggleEditingProfile}
          saveProfile={this.saveProfile}
          username={this.username}
        />
      );
    }
}

const ProfileDiv = (props) => {
  const {
    profile, toggleEditingProfile, saveProfile, username } = props;
  return (
    <div className="container hoverable col l4">
      <div className="">
        <div>
          <h4 className="blue-grey-textcol">{profile.username}</h4>
          <img src={profile.image} alt="" />
        </div>
        <div>
          <EmailField email={profile.email} />
          <ShowProfileOrProfileForm
            profile={profile}
            toggleEditingProfile={toggleEditingProfile}
            saveProfile={saveProfile}
          />
        </div>
        <EditButton
          profile={profile}
          toggleEditingProfile={toggleEditingProfile}
          username={username}
        />
      </div>
    </div>
  );
};

const EmailField = (props) => {
  const { email } = props;
  return (email
    ? (
      <div>
        <h5 className="blue-grey-text subheader">Email</h5>
        <p>{email}</p>
      </div>
    )
    : null
  );
};

const ShowProfileOrProfileForm = (props) => {
  const { profile, toggleEditingProfile, saveProfile } = props;
  return (
    profile.isEditing
      ? (
        <ProfileForm
          saveProfile={saveProfile}
          profile={profile}
          finishEditing={toggleEditingProfile}
        />
      )
      : <Profile profile={profile} />
  );
};

const EditButton = (props) => {
  const { profile, username, toggleEditingProfile } = props;
  return (
    profile.isEditing || username
      ? null
      : (
        <button
          type="button"
          className="row waves-effect waves-light btn edit-button"
          onClick={() => toggleEditingProfile(!profile.isEditing)}
        >
          Edit
        </button>
      )
  );
};


ProfileContainer.propTypes = {
  getProfile: PropTypes.func.isRequired,
  saveProfile: PropTypes.func.isRequired,
  toggleEditingProfile: PropTypes.func.isRequired,
  getSpecificUserProfile: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(handleGetProfileResponse()),
  saveProfile: profileData => dispatch(handleEditProfile(profileData)),
  toggleEditingProfile: toggle => dispatch(ToggleEditingAction(toggle)),
  getSpecificUserProfile: username => dispatch(handleGetSpecificUserProfile(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);

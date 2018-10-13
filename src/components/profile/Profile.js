/* eslint-disable react/prop-types */
import React from 'react';

export class Profile extends React.Component {
  render() {
    const { profile } = this.props;
    return (
      <div>
        <BioField profile={profile} />
        <LocationField profile={profile} />
        <OccupationField profile={profile} />
      </div>
    );
  }
}

const BioField = (props) => {
  const { profile } = props;
  return (
    profile.bio
      ? (
        <div>
          <h5 className="blue-grey-text subheader">Bio</h5>
          <p>
            {profile.bio}
          </p>
        </div>
      )
      : null
  );
};

const LocationField = (props) => {
  const { profile } = props;
  return (
    profile.location
      ? (
        <div>
          <h5 className="blue-grey-text subheader">Location</h5>
          <span>{profile.location}</span>
        </div>
      )
      : null
  );
};

const OccupationField = (props) => {
  const { profile } = props;
  return (
    profile.occupation
      ? (
        <div>
          <h5 className="blue-grey-text subheader">Occupation</h5>
          <span>{profile.occupation}</span>
        </div>
      )
      : null
  );
};

export class ProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bio: this.props.profile.bio,
      location: this.props.profile.location,
      occupation: this.props.profile.occupation,
      image:this.props.profile.image
    };
  }

    handleChange = (event) => {
      event.preventDefault();

      this.setState({ [event.target.id]: event.target.value });
    };

    handleSubmit = (event) => {
      event.preventDefault();

      this.props.saveProfile({ user: { ...this.state } });
      this.props.finishEditing(false);
    };

    handleUpload = ()=>{
      const widget = window.cloudinary.openUploadWidget({
        cloud_name: process.env.REACT_APP_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
        cropping: true, folder: 'widgetdocs',
        sources: ['local', 'url', 'camera', 'facebook', 'dropbox', 'search', 'instagram'],
      }, (error, result) => {
        if (result.event === "success") {
          this.setState({image:result.info.secure_url});
          widget.close();
        }
      })
      widget.open()
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <div onClick = {this.handleUpload}  >
          <img id ="profile-image" value={this.state.image}
          className = "profile-image"
          src={this.state.image}
           alt="add-image"
          />
            <i className="material-icons small grey-text">edit </i>
          </div>
          <div className="input-field">
            <textarea id="bio" className="materialize-textarea" value={this.state.bio} onChange={this.handleChange} />
            <label htmlFor="bio" className="active">Enter your bio</label>
          </div>

          <div className="input-field">
            <input id="location" placeholder="location" value={this.state.location} onChange={this.handleChange} />
            <label htmlFor="location" className="active">Enter your location</label>
          </div>

          <div className="input-field">
            <input id="occupation" placeholder="occupation" value={this.state.occupation} onChange={this.handleChange} />
            <label htmlFor="location" className="active">Enter your occupation</label>
          </div>

          <SaveButton isSavingProfile={this.props.profile.isSavingProfile} />
        </form>
      );
    }
}

export const SaveButton = (props) => {
  const { isSavingProfile } = props;
  return (
    <div className="col s12 social" style={{ paddingTop: '20px' }}>
      {isSavingProfile
        ? (
          <button type="submit" className="row waves-effect waves-light btn disabled">
          Saving ...
          </button>
        )
        : (
          <button type="submit" className="row waves-effect waves-light btn">
          Save
          </button>
        )
    }
    </div>
  );
};

export const Spinner = () => (
  <div className="preloader-wrapper small active valign-wrapper">
    <div className="spinner-layer spinner-green-only">
      <div className="circle-clipper left">
        <div className="circle" />
      </div>
      <div className="gap-patch">
        <div className="circle" />
      </div>
      <div className="circle-clipper right">
        <div className="circle" />
      </div>
    </div>
  </div>
);

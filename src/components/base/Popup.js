import React from "react";
import PropTypes from "prop-types";

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showPopup: true };
  }

  closePopup = () => {
    // On closing the popup refresh the login page to reset state
    this.setState({ showPopup: false });
    this.props.history.go();
  };

  render() {
    return (
      <div>
        {this.state.showPopup && (
          <div className={"pop-up card"}>
            <button className="close" onClick={this.closePopup}>
              ✖
            </button>
            <h6>{this.props.message}</h6>
            {this.props.loading && <img src={this.props.loading} alt={"..."} />}
          </div>
        )}
      </div>
    );
  }
}

Popup.propTypes = {
  message: PropTypes.string.isRequired
};

export default Popup;

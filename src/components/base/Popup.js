import React from 'react';
import { Spinner } from '../profile/Profile';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showPopup: true };
  }

  closePopup = () => {
    this.setState({ showPopup: false });
  };

  render() {
    return (
      <div>
        {this.state.showPopup && (
          <div className="outer-box">
            <Spinner />
          </div>
        )}
      </div>
    );
  }
}

export default Popup;

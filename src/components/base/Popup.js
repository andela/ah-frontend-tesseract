import React from "react";

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
          <div className='outer-box'>
            <div className='preloader-wrapper small active valign-wrapper '>
                <div className='spinner-layer spinner-green-only'>
                    <div className='circle-clipper left'>
                        <div className='circle'/>
                    </div>
                    <div className='gap-patch'>
                        <div className='circle'/>
                    </div>
                    <div className='circle-clipper right'>
                        <div className='circle'/>
                    </div>
                </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Popup;

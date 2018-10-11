import React from 'react';
import M from 'materialize-css';
import { Link } from 'react-router-dom';

export default class ProfileDropDown extends React.Component {
  componentDidMount() {
    const elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, { hover: true, coverTrigger: false });
  }

  render() {
    const { logout } = this.props;

    return (
      <li>
        <a href="#!" className="dropdown-trigger" data-target="dropdown">
          <i className="material-icons">person</i>
        </a>

        <ul id="dropdown" className="dropdown-content">
          <li>
            <Link to="/profile" className="waves-effect">
              Profile
            </Link>
          </li>
          <li>
            <a href="#!" onClick={logout} className="waves-effect">Logout</a>
          </li>
        </ul>
      </li>
    );
  }
}

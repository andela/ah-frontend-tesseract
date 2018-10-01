import React from 'react'
import {Link} from "react-router-dom";

const Header = () =>  {
    return (

        <nav>

            <div className="row blue-grey darken">

                <Link to='/'><div className="col s4">
                    <div className="col s1">
                        <i className="material-icons left">book</i>
                    </div>

                    <div className="col s3">
                        <a className="brand-logo">
                            Authors Haven
                        </a>
                    </div>
                </div>
                </Link>

                <div className="col s8 hide-on-med-and-down">

                    <div className="col s6">
                        <ul className="right">
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/login'>Login</Link></li>
                    </ul>
                    </div>

                    <div className="col 2 right">
                        <input type="text" className="nav-search " placeholder="Search here" />
                    </div>

                </div>

            </div>

        </nav>

    )
};

export { Header as default};
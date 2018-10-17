import haven_slider1 from "../static/ah-slider1.jpg";
import haven_slider2 from "../static/ah-slider2.jpg";
import haven_slider3 from "../static/ah-slider3.jpg";
import haven6 from "../static/haven6.jpg";
import React, {Component} from 'react';
import M from 'materialize-css';
import Stories from "../components/landing/Stories";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getProfile, getFollowing, searchArticles, getRandomArticles} from "../actions/landingPageStoriesAction";


export class HomePage extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.getProfile();
    }

    getProfile = async () =>{
        await this.props.getProfile();

        if (this.props.user){
            await this.props.getFollowing(this.props.user);
            if (this.props.following.length>0){
                 await this.props.searchArticles(this.props.following[0].username)
            }else{
                await this.props.getRandomArticles();
            }

        }else {
            await this.props.getRandomArticles();
        }
    };

    render() {
        return (
            <div>
                <HomeSlider />
                <HavenPromoText />
                <Stories stories={this.props.stories} fetchStatus={this.props.fetchStatus}/>
                <CallToAction isLoggedIn={this.props.isLoggedIn} />
                <Footer />
            </div>
        );
    }
}

export class HomeSlider extends Component{


    componentDidMount() {
        let elem = document.querySelectorAll('.slider');
         M.Slider.init(elem, {
             full_width: true,
             interval: 5000,
             indicators: false
         });
    }


    render(){
        return (
        <div className="slider">
            <ul className="slides ">
                <li >
                        <img src={haven_slider1} alt="slider1" className="responsive-img" />
                        <div className="caption center-align">
                            <h3>Authors' Haven</h3>
                            <h5 className="light grey-text text-lighten-3">A social platform for the creative at heart.</h5>
                        </div>
                </li>
                <li >
                    <img src={haven_slider2} alt="slider1" className="responsive-img" />
                    <div className="caption center-align">
                        <h3>Our Vision</h3>
                        <h5 className="light grey-text text-lighten-3">
                            To create a community of like minded authors to foster inspiration and innovation by leveraging the modern web.
                        </h5>
                    </div>
                    </li>
                    <li >
                        <img src={haven_slider3} alt="slider1" className="responsive-img" />
                        <div className="caption center-align">
                            <h3 className="cyan-text text-lighten-2">Want to share?</h3>
                            <h5 className="light teal-text text-lighten-3">Join thousands of other writers sharing their stories with the rest of the world.</h5>
                        </div>
                    </li>
            </ul>
        </div>
    )}
}


export class HavenPromoText extends Component {
    render() {

        return (
            <div className="container">
            <div className="row">
                <div className="col s12">
                    <h5 > What do you want to write about?</h5>
                </div>
                <PromoCols/>
            </div>
            </div>
        );
    }
}

const PromoCols = () => {
    return(
        <div>
            <div className="col s4">
                <i className="medium material-icons teal-text text-lighten-3">memory</i>
                <h3>Technology</h3>
                <p>Is it about a AI, security, gadgets or AI? <br/>
                    You can write about it here.</p>
            </div>
            <div className="col s4">
                <i className="medium material-icons teal-text text-lighten-3">network_wifi</i>
                <h3>Life</h3>
                <p>Having an amazing life story to share?
                    <br/>This is the right place to have it read.</p>
            </div>
            <div className="col s4">
                <i className="medium material-icons teal-text text-lighten-3">tag_faces</i>
                <h3>Happiness</h3>
                <p>What makes you happy?
                    <br/> Share the fun with the rest of the world.
                </p>
            </div>
        </div>
    )
}

export class CallToAction extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className="container">
                <div className="row valign-wrapper">
                    <div className="col s6">
                       <img src={haven6} alt="image" className="responsive-img"/>

                    </div>
                    <div className="col s6 left-align">
                       <h3>Authors Haven</h3>
                        <p>A social platform for the creative at heart.
                        </p>
                        <p >
                            Our mission is to create a community of like minded authors to
                            foster inspiration and innovation by leveraging the modern web
                        </p>

                        <a className="waves-effect btn"  {...this.props.isLoggedIn ? {href: '/article-create'} : {href: '/sign-up'}} >Get Started</a>
                    </div>

                </div>
            </div>
        );
    }
}

export class Footer extends Component {
    getYear(){
        const today = new Date();
        return today.getFullYear();
    }

    render() {
        return (
            <footer className="page-footer  grey lighten-2">
                <div className="container">
                    <div className="row">
                        <div className="col l6 s12">
                            <h5 className="white-text">Authors Haven</h5>
                            <p className="grey-text text-lighten-1">A social platform for the creative at heart</p>
                        </div>
                        <div className="col l4 offset-l2 s12 left-align">
                            <h5 className="white-text">Quick links</h5>
                            <ul>
                                <li><a className="grey-text text-lighten-1" href="/sign-up">Signup</a></li>
                                <li><a className="grey-text text-lighten-1" href="/login">Login</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright darken-4">
                    <div className="container">
                        © {this.getYear()} Authors Haven
                    </div>
                </div>
            </footer>
        );
    }
}

HomePage.propTypes = {
    getProfile:PropTypes.func.isRequired,
    getFollowing:PropTypes.func.isRequired,
    searchArticles:PropTypes.func.isRequired,
    getRandomArticles:PropTypes.func.isRequired,

};

const mapStateToProps = (state) => {
    return{
        stories:state.landing.stories,
        fetchStatus: state.landing.isFetching,
        user:state.landing.user,
        following:state.landing.following,
        isLoggedIn:state.authentication.isLoggedIn,
    }
};

export default connect(mapStateToProps,{getProfile,getFollowing,searchArticles,getRandomArticles})(HomePage);

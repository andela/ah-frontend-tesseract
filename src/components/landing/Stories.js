import React, {Component} from 'react';
import Popup from "../base/Popup";
class Stories extends Component {
    constructor(props){
        super(props);

    }
    render() {
        return (
                <div className="container ">
                    <div className="row">

                        <div className="col s12 m12">
                            <h4 >Stories</h4>
                            {this.props.fetchStatus?(
                                <Popup />
                            )
                            :
                                <StoryDisplay stories={this.props.stories} />
                            }

                        </div>
                    </div>
                </div>

        );
    }
}

const StoryDisplay = (props) =>{

    return (
        <ul className="collection" >
            {props.stories.map((story, index)=>{
                if (index<=7){
                    return (<li className="collection-item avatar" key={ index }>
                        <a href={`/articles/${story.slug}`}>
                        <p className="story-title left-align">{capitalizeFirstLetter(story.title)}</p>
                        <p className="left-align">{capitalizeFirstLetter(story.description)}</p>

                        <p className="left-align author">{capitalizeFirstLetter(story.author.username)}</p>
                        <p className="date_read left-align">{getDate(story.created_at)}. {story.read_time} read </p>
                        </a>
                    </li>);
                }
            })}
        </ul>
    );
};

const getDate =(dateValue)=>{

    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateValue).toLocaleDateString('en-US', DATE_OPTIONS);
   };

const capitalizeFirstLetter = (string) =>{
   return string.charAt(0).toUpperCase() + string.slice(1)
};

export default Stories;
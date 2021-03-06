import React from "react";
import BodyEditor from "./BodyEditor";
import CreatableSelect from "react-select/lib/Creatable";
import PropTypes from "prop-types";


class ArticleForm extends React.Component {
    checkEmpty = str => {
        return !str || !str.trim();
    };

    render() {
        return (
            <form>
                <div >
                    <i id = "image-icon" onClick={this.props.handleUpload} className="small material-icons" >add_a_photo</i>
                </div>
                <input
                    type={"text"} name={"title"}
                    placeholder={"Title"}
                    value={this.props.article.title}
                    onChange={this.props.handleInputChange}
                    required={true} />

                <div onClick={this.focus}>
                    <BodyEditor
                        editorState={this.props.article.body}
                        ref={"editor"}
                        onChange={this.props.onChange} />
                </div>

                <SubmitButtons
                    article={this.props.article} options={this.props.options}
                    onTagChange={this.props.onTagChange} onEdit={this.props.onEdit}
                    checkEmpty={this.checkEmpty} preview={this.props.preview}
                    handleInputChange={this.props.handleInputChange}
                    updateArticle={this.props.updateArticle}
                />
            </form>
        ) } }

ArticleForm.propTypes = {
    onEdit: PropTypes.bool.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    updateArticle: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired
};

const SubmitButtons = props => {
    return (
        <div>
            {props.onEdit ? (
                <div className={"description"}>
                    <DescriptionTagField {...props}/>
                    {props.fetchStatus ? (
                        <button className={"row waves-effect waves-light btn disabled"}>
                            saving...........
                        </button>
                    ) : (
                        <button
                            className={"row waves-effect waves-light btn"}
                            onClick={props.updateArticle}>
                            Save Changes
                        </button>
                    )}{" "}
                </div>
            ) : !props.checkEmpty( props.article.body.getCurrentContent().getPlainText() ) &&
                    <button
                        className={"row waves-effect waves-light btn"}
                        onClick={props.preview}>
                        PREVIEW ARTICLE
                    </button> }
        </div> ) };

export const DescriptionTagField = props => {
    return (
        <div>
            <label><h6>Add tags (Optional)</h6></label>
            <CreatableSelect
                isMulti
                allowCreate={true}
                value={props.article.tagsList}
                options={props.options}
                onChange={props.onTagChange}
            /><br/>
            <label><h6>Add Description</h6></label>
            <textarea
                name={"description"}
                onChange={props.handleInputChange}
                value={props.article.description}
                minLength={5}
                maxLength={300}
            />

        </div>
    );
};

export default ArticleForm;

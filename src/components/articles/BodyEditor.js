import React from "react";
import { Editor, RichUtils } from "draft-js";
class BodyEditor extends React.Component {
  focus = () => this.refs.editor.focus();
  onChange = editorState => this.props.onChange(editorState);

  handleKeyCommand = command => {
    const newState = RichUtils.handleKeyCommand(
      this.props.editorState,
      command
    );
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };

  onTab = e => {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.props.editorState, maxDepth));
  };

  toggleBlockType = blockType => {
    this.onChange(RichUtils.toggleBlockType(this.props.editorState, blockType));
  };

  toggleInlineStyle = inlineStyle => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle)
    );
  };

  render() {
    return (
      <div className="RichEditor-root">
        <EditStyleControl
          editorState={this.props.editorState}
          toggleBlock={this.toggleBlockType}
          toggleInLine={this.toggleInlineStyle}
        />
        <div className={"RichEditor-editor"} onClick={this.focus}>
          <Editor
            customStyleMap={styleMap}
            editorState={this.props.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            placeholder="Tell a story..."
            ref="editor"
            spellCheck={true}
          />
        </div>
      </div>
    );
  }
}

// Component which handles in line control styles

const EDIT_STYLES = [
  { label: "Bold", style: "BOLD", type: "inline" },
  { label: "Italic", style: "ITALIC", type: "inline" },
  { label: "Underline", style: "UNDERLINE", type: "inline" },
  { label: "Header", style: "header-five", type: "block" },
  { label: "list", style: "ordered-list-item", type: "block" },
  { label: "code", style: "code-block", type: "block" },
  { label: "blockquote", style: "blockquote", type: "block" }
];

export const EditStyleControl = props => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {EDIT_STYLES.map((editStyle,index) => (
          <div className={"EditStyle"} key={index}>
            <StyleButton
          key={editStyle.label}
          active={
            editStyle.type === "inline"
              ? currentStyle.has(editStyle.style)
              : editStyle.style === blockType}
          label={editStyle.label}
          onToggle={editStyle.type === "inline" ? props.toggleInLine : props.toggleBlock}
          style={editStyle.style}/>
          </div>))}
    </div>
  )};

// Custom overrides for "code" style.
export const styleMap = {
  "code-block": {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    wordWrap: "break-word",
    padding: 2
  }
};

// component for styling the  style editors

export const StyleButton = props => {
  const onToggle = event => {
    event.preventDefault();
    props.onToggle(props.style);
  };
  return (
    <span
      className={
        props.active ? " RichEditor-activeButton" : "RichEditor-styleButton"
      }
      onMouseDown={onToggle}
    >
      <i className={"material-icons"}>{props.label}</i>
    </span>
  );
};

export default BodyEditor;

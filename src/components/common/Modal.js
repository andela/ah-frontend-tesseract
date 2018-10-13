import React from "react";
import { connect } from "react-redux";
import { deleteAction } from "../../actions";

const Modal = ({ confirm, header, description, onDelete, deleteAction }) => (
  <div
    id="modal1"
    className={onDelete ? "modal modal-open" : "modal"}
  >
    <div className="modal-content">
      <h5>{header}</h5>
      <p>{description}</p>
    </div>
    <div className="modal-footer">
      <a
        onClick={confirm}
        className={"modal-close  btn-flat"}
      >
        Yes
      </a>
      <a
        onClick={e => {
          e.preventDefault();
          deleteAction(false);
        }}
        className={" modal-close  btn-flat"}
      >
        Cancel
      </a>
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    onDelete: state.article.onDelete
  };
};
export default connect(
  mapStateToProps,
  { deleteAction }
)(Modal);

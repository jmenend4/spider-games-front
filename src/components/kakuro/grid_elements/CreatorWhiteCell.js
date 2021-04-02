import React from "react";
import PropTypes from "prop-types";
import "./grid_elements.css";

const CreatorWhiteCell = (props) => (
  <div
    id={"actual" + props.id}
    className="cell white-cell"
    draggable="true"
    onDragStart={props.onDrag}
    onDragEnter={props.ondragover}
    onDragOver={props.ondragover}
    onDrop={props.ondrop}
    onClick={props.onClick}
  ></div>
);

CreatorWhiteCell.propTypes = {
  id: PropTypes.string.isRequired,
  onDrag: PropTypes.func,
  ondragover: PropTypes.func.isRequired,
  ondrop: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default CreatorWhiteCell;

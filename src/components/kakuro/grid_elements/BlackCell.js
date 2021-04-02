import React from "react";
import PropTypes from "prop-types";
import "./grid_elements.css";

const BlackCell = (props) => {
  return (
    <div
      id={"actual" + props.id}
      className="cell black-cell"
      draggable="true"
      onDragStart={props.onDrag}
      onDragEnter={props.ondragover}
      onDragOver={props.ondragover}
      onDrop={props.ondrop}
      onClick={props.onClick}
    ></div>
  );
};

BlackCell.propTypes = {
  id: PropTypes.string.isRequired,
  onDrag: PropTypes.func,
  ondragover: PropTypes.func.isRequired,
  ondrop: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default BlackCell;

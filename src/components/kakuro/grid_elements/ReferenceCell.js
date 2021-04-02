import React, { useState } from "react";
import PropTypes from "prop-types";
import "./grid_elements.css";

const ReferenceCell = ({ rigthReference, downReference, ...props }) => {
  const [isMouseHovering, setIsMouseHovering] = useState(false);

  const mouseOver = () => {
    setIsMouseHovering(true);
  };

  const mouseOut = () => {
    setIsMouseHovering(false);
  };

  return (
    <div
      className="reference-container"
      draggable="true"
      onDragStart={props.onDrag}
      onDragEnter={props.ondragover}
      onDragOver={props.ondragover}
      onDrop={props.ondrop}
    >
      <div
        className={
          (isMouseHovering ? "cell cell-hover " : "cell ") + "reference-cell"
        }
      >
        <div
          className="reference-number rigth-reference-number"
          onDragEnter={props.ondragover}
          onDragOver={props.ondragover}
          onDrop={props.ondrop}
        >
          {rigthReference}
        </div>
        <div
          className="reference-number down-reference-number"
          onDragEnter={props.ondragover}
          onDragOver={props.ondragover}
          onDrop={props.ondrop}
        >
          {downReference}
        </div>
      </div>
      <div
        className="reference-division"
        onMouseEnter={mouseOver}
        onMouseLeave={mouseOut}
        onDragEnter={props.ondragover}
        onDragOver={props.ondragover}
        onDrop={props.ondrop}
      ></div>
    </div>
  );
};

ReferenceCell.propTypes = {
  rigthReference: PropTypes.number,
  downReference: PropTypes.number,
  onDrag: PropTypes.func,
  ondragover: PropTypes.func.isRequired,
  ondrop: PropTypes.func.isRequired
};

export default ReferenceCell;

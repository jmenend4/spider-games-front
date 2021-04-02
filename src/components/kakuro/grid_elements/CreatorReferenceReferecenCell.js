import React, { useState } from "react";
import PropTypes from "prop-types";
import "./grid_elements.css";

const ReferenceCell = (props) => {
  const [isMouseHovering, setIsMouseHovering] = useState(false);
  const mouseOver = () => {
    setIsMouseHovering(true);
  };

  const mouseOut = () => {
    setIsMouseHovering(false);
  };
  return (
    <div
      id={"actual" + props.id}
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
      ></div>
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
  id: PropTypes.string.isRequired,
  onDrag: PropTypes.func.isRequired,
  ondragover: PropTypes.func.isRequired,
  ondrop: PropTypes.func.isRequired
};

export default ReferenceCell;

import React, { useState } from "react";
import PropTypes from "prop-types";
import "./grid_elements.css";

const ReferenceCell = (props) => {
  const [isMouseHovering, setIsMouseHovering] = useState(false);
  const [references, setReferences] = useState({
    rightReference: props.cell.rightReference,
    downReference: props.cell.downReference
  });

  function handleReferenceChange({ target }) {
    const { name, value } = target;
    const regex = /^[0-9\b]{1,2}$/;
    const _references = { ...references, [name]: value.replace(/^0+/, "") };
    if (value === "" || regex.test(value)) {
      setReferences(_references);
    }
    const n = parseInt(value, 10);
    if ((n > 2 && n < 46) || value === "") {
      props.onReferenceChange(_references);
    }
  }

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
      onClick={props.onClick}
    >
      <div
        className={
          (isMouseHovering ? "cell cell-hover " : "cell ") + "reference-cell"
        }
      >
        <input
          className="reference-number rigth-reference-number"
          type="number"
          name="rightReference"
          value={references.rightReference}
          minLength={0}
          maxLength={2}
          min={3}
          max={45}
          onChange={handleReferenceChange}
          onDragEnter={props.ondragover}
          onDragOver={props.ondragover}
          onDrop={props.ondrop}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
        <input
          className="reference-number down-reference-number"
          type="number"
          name="downReference"
          value={references.downReference}
          maxLength={2}
          min={3}
          max={45}
          onChange={handleReferenceChange}
          onDragEnter={props.ondragover}
          onDragOver={props.ondragover}
          onDrop={props.ondrop}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
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
  id: PropTypes.string.isRequired,
  onDrag: PropTypes.func,
  ondragover: PropTypes.func.isRequired,
  ondrop: PropTypes.func.isRequired,
  onReferenceChange: PropTypes.func,
  cell: PropTypes.object,
  onClick: PropTypes.func.isRequired
};

export default ReferenceCell;

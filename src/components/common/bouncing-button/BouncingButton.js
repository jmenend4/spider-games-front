import React from "react";
import PropTypes from "prop-types";
import "./bouncing-button.css";

const BouncingButton = ({
  containedComponent,
  sideLengthPx,
  bouncingProportion,
  id,
  selectedId,
  onSelect
}) => {
  return (
    <div
      id={id}
      className="bouncing-button"
      style={{
        "--sideLength": sideLengthPx,
        "--bouncingProportion": bouncingProportion ? bouncingProportion : 0.03
      }}
      onClick={(e) => onSelect(e)}
    >
      <div
        className="border-container"
        style={{ visibility: id === selectedId ? "visible" : "hidden" }}
      >
        <div className="top-left-border"></div>
        <div className="top-right-border"></div>
      </div>
      {containedComponent}
      <div
        className="border-container"
        style={{ visibility: id === selectedId ? "visible" : "hidden" }}
      >
        <div className="bottom-left-border"></div>
        <div className="bottom-right-border"></div>
      </div>
    </div>
  );
};

BouncingButton.propTypes = {
  containedComponent: PropTypes.object.isRequired,
  sideLengthPx: PropTypes.number.isRequired,
  bouncingProportion: PropTypes.number, //proportion of sideLenght for horizontal and vertical movement: 0 no movement / 0.5 all corners will meet at the center
  id: PropTypes.string.isRequired,
  selectedId: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default BouncingButton;

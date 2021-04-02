import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./bouncing-button.css";

const BouncingButton = ({
  containedComponent,
  sideLengthPx,
  bouncingProportion,
  refocus,
  name,
  selectedId,
  onFocus
}) => {
  const btn = useRef(null);
  useEffect(() => {
    if (name === selectedId) {
      document.activeElement.blur();
      btn.current.focus();
    }
  }, [refocus]);

  return (
    <button
      ref={btn}
      name={name}
      className="bouncing-button"
      style={{
        "--sideLength": sideLengthPx,
        "--bouncingProportion": bouncingProportion ? bouncingProportion : 0.03
      }}
      onMouseEnter={() => {
        document.activeElement.blur();
        btn.current.focus();
      }}
      onFocus={(e) => {
        if (onFocus) {
          onFocus(e);
        }
      }}
    >
      <div className="border-container">
        <div className="top-left-border"></div>
        <div className="top-right-border"></div>
      </div>
      {containedComponent}
      <div className="border-container">
        <div className="bottom-left-border"></div>
        <div className="bottom-right-border"></div>
      </div>
    </button>
  );
};

BouncingButton.propTypes = {
  containedComponent: PropTypes.object.isRequired,
  sideLengthPx: PropTypes.number.isRequired,
  bouncingProportion: PropTypes.number, //proportion of sideLenght for horizontal and vertical movement: 0 no movement / 0.5 all corners will meet at the center
  refocus: PropTypes.number,
  name: PropTypes.string.isRequired,
  selectedId: PropTypes.string.isRequired,
  onFocus: PropTypes.func
};

export default BouncingButton;

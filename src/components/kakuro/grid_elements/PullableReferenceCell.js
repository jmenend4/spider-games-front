import React from "react";
import PropTypes from "prop-types";
import "./grid_elements.css";

const PullableReferenceCell = ({ x, y, xOffset, yOffset }) => {
  return (
    <div
      className="reference-container pullable"
      style={{
        "--x": x,
        "--y": y,
        "--x-offset": xOffset,
        "--y-offset": yOffset
      }}
    >
      <div className="cell"></div>
      <div className="reference-division"></div>
    </div>
  );
};

PullableReferenceCell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  xOffset: PropTypes.number.isRequired,
  yOffset: PropTypes.number.isRequired
};

export default PullableReferenceCell;

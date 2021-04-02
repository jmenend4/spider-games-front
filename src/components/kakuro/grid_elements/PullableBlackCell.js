import React from "react";
import PropTypes from "prop-types";
import "./grid_elements.css";

const PullableBlackCell = ({ x, y, xOffset, yOffset }) => {
  return (
    <div
      className="cell black-cell pullable"
      style={{
        "--x": x,
        "--y": y,
        "--x-offset": xOffset,
        "--y-offset": yOffset
      }}
    ></div>
  );
};

PullableBlackCell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  xOffset: PropTypes.number.isRequired,
  yOffset: PropTypes.number.isRequired
};

export default PullableBlackCell;

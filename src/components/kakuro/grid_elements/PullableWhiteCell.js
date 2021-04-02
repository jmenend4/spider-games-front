import React from "react";
import PropTypes from "prop-types";
import "./grid_elements.css";

const PullableWhiteCell = ({ x, y, xOffset, yOffset }) => (
  <div
    className="cell white-cell pullable"
    style={{
      "--x": x,
      "--y": y,
      "--x-offset": xOffset,
      "--y-offset": yOffset
    }}
  ></div>
);

PullableWhiteCell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  xOffset: PropTypes.number.isRequired,
  yOffset: PropTypes.number.isRequired
};

export default PullableWhiteCell;

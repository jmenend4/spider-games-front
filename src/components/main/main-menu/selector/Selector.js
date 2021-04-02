import React from "react";
import PropTypes from "prop-types";
import "./selector.css";

const Selector = ({ id, selectedId, containerWidth }) => (
  <div
    key={id}
    style={{
      visibility: id === selectedId ? "visible" : "hidden",
      "--container-width": containerWidth
    }}
    className="selector"
  >
    <div
      className="hifen"
      style={{ width: id === selectedId ? containerWidth * 0.02 + "px" : "" }}
      onTransitionEnd={(e) => e.stopPropagation()}
    ></div>
    <div className="rhombus">
      <div className="dot"></div>
    </div>
  </div>
);

Selector.propTypes = {
  id: PropTypes.string.isRequired,
  selectedId: PropTypes.string.isRequired,
  containerWidth: PropTypes.number.isRequired
};

export default Selector;

import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./expandable-button.css";

const ExpandableButton = ({
  fontSizePt,
  widthPx,
  outerBorder,
  onClick,
  label,
  backgroundColor,
  backgroundOnHover,
  refocus,
  name,
  selectedId,
  onFocus,
  textAlignment
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
      type="button"
      name={name}
      ref={btn}
      className="expandable-button"
      style={{
        "--fontSize": fontSizePt,
        "--width": widthPx,
        "--outerBorderWidth": outerBorder ? 1 : 0,
        "--backgroundColor": backgroundColor ? backgroundColor : "transparent",
        "--backgroundOnHover": backgroundOnHover
          ? backgroundOnHover
          : "transparent"
      }}
      onClick={(e) => {
        onClick(e);
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
      <div className={"border-container border-container-left"}>
        <div className="upper-left-border"></div>
        <div className="lower-left-border"></div>
      </div>

      <div
        className="label"
        style={{ textAlign: textAlignment ? textAlignment : "left" }}
      >
        {label}
      </div>
      <div className={"border-container border-container-right"}>
        <div className="upper-right-border"></div>
        <div className="lower-right-border"></div>
      </div>
    </button>
  );
};

ExpandableButton.propTypes = {
  fontSizePt: PropTypes.number.isRequired,
  widthPx: PropTypes.number.isRequired,
  outerBorder: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  backgroundOnHover: PropTypes.string,
  refocus: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  selectedId: PropTypes.string.isRequired,
  onFocus: PropTypes.func,
  textAlignment: PropTypes.string
};

export default ExpandableButton;

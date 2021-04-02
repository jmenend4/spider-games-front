import React from "react";
import PropTypes from "prop-types";
import "./expandable-selector.css";

const ExpandableSelector = ({
  fontSizePt,
  textAlignment,
  widthPx,
  outerBorder,
  backgroundColor,
  backgroundOnHover,
  label,
  id,
  selectedId,
  onSelect
}) => {
  const drawBorders = () => {
    if (id === selectedId) {
      return (
        <>
          <div className={"border-container border-container-left"}>
            <div className="upper-left-border"></div>
            <div className="lower-left-border"></div>
          </div>

          <div
            className="label"
            style={{ textAlign: textAlignment ? textAlignment : "center" }}
          >
            {label}
          </div>
          <div className={"border-container border-container-right"}>
            <div className="upper-right-border"></div>
            <div className="lower-right-border"></div>
          </div>
        </>
      );
    } else {
      return (
        <div
          className="lonely-label"
          style={{ textAlign: textAlignment ? textAlignment : "center" }}
        >
          {label}
        </div>
      );
    }
  };

  return (
    <div
      id={id}
      className={
        id === selectedId
          ? "expandable-selector selected-background"
          : "expandable-selector"
      }
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
        onSelect(e);
      }}
    >
      {drawBorders()}
    </div>
  );
};

ExpandableSelector.propTypes = {
  fontSizePt: PropTypes.number.isRequired,
  textAlignment: PropTypes.string,
  widthPx: PropTypes.number.isRequired,
  outerBorder: PropTypes.bool,
  backgroundColor: PropTypes.string,
  backgroundOnHover: PropTypes.string,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  selectedId: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default ExpandableSelector;

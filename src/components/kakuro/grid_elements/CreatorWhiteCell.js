import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./grid_elements.css";

const CreatorWhiteCell = ({
  id,
  onDrag,
  ondragover,
  ondrop,
  onClick,
  values
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (value === "") {
      setValues();
    }
  });

  const setValues = () => {
    let index;
    const count = values.reduce((a, b, i) => {
      if (b) {
        index = i;
        return ++a;
      }
      return a;
    }, 0);
    if (count == 1) {
      index++;
      setValue(index.toString());
      return;
    }
    if (values.length === 9) {
      setValue(
        <div className="draft-values-grid">
          <div className="draft-value" style={{ gridArea: "_1" }}>
            {values[0] ? "1" : " "}
          </div>
          <div className="draft-value" style={{ gridArea: "_2" }}>
            {values[1] ? "2" : " "}
          </div>
          <div className="draft-value" style={{ gridArea: "_3" }}>
            {values[2] ? "3" : " "}
          </div>
          <div className="draft-value" style={{ gridArea: "_4" }}>
            {values[3] ? "4" : " "}
          </div>
          <div className="draft-value" style={{ gridArea: "_5" }}>
            {values[4] ? "5" : " "}
          </div>
          <div className="draft-value" style={{ gridArea: "_6" }}>
            {values[5] ? "6" : " "}
          </div>
          <div className="draft-value" style={{ gridArea: "_7" }}>
            {values[6] ? "7" : " "}
          </div>
          <div className="draft-value" style={{ gridArea: "_8" }}>
            {values[7] ? "8" : " "}
          </div>
          <div className="draft-value" style={{ gridArea: "_9" }}>
            {values[8] ? "9" : " "}
          </div>
        </div>
      );
    }
  };

  return (
    <div
      id={"actual" + id}
      className="cell white-cell"
      draggable="true"
      onDragStart={onDrag}
      onDragEnter={ondragover}
      onDragOver={ondragover}
      onDrop={ondrop}
      onClick={onClick}
    >
      {value}
    </div>
  );
};

CreatorWhiteCell.propTypes = {
  id: PropTypes.string.isRequired,
  onDrag: PropTypes.func,
  ondragover: PropTypes.func.isRequired,
  ondrop: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  values: PropTypes.array
};

export default CreatorWhiteCell;

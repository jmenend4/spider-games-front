import React from "react";
import WhiteCell from "./CreatorWhiteCell";
import PropTypes from "prop-types";
import cellTypes from "./cellTypes";
import ReferenceCell from "./CreatorReferenceCell";
import ReferenceReferenceCell from "./CreatorReferenceReferecenCell";
import BlackCell from "./BlackCell";

const Cell = ({ cell, ...props }) => {
  const changeCellReference = ({ rightReference, downReference }) => {
    props.onCellChange(props.row, props.column, {
      ...cell,
      rightReference,
      downReference
    });
  };

  const drag = (ev) => {
    ev.dataTransfer.setData(
      "cellType",
      cell.type === cellTypes.REFERENCE_REFERENCE
        ? cellTypes.REFERENCE
        : cell.type
    );
  };

  const allowDrop = (ev) => {
    if (!props.irreplaceable) {
      ev.preventDefault();
    }
  };

  const onDrop = async (ev) => {
    ev.preventDefault();
    let toChangeCellType = ev.dataTransfer.getData("cellType");
    const _cell = { ...cell, type: toChangeCellType };
    props.onCellChange(props.row, props.column, _cell);
  };

  const handleClick = () => {
    props.onClick(props.id, props.row, props.column, cell);
  };

  if (cell.type === cellTypes.BLACK) {
    return (
      <BlackCell
        id={"cell" + props.id}
        onDrag={drag}
        ondragover={allowDrop}
        ondrop={onDrop}
        onClick={handleClick}
      />
    );
  }
  if (cell.type === cellTypes.REFERENCE) {
    return (
      <ReferenceCell
        id={"cell" + props.id}
        onDrag={drag}
        ondragover={allowDrop}
        ondrop={onDrop}
        onReferenceChange={changeCellReference}
        cell={cell}
        onClick={handleClick}
      />
    );
  }
  if (cell.type === cellTypes.REFERENCE_REFERENCE) {
    return (
      <ReferenceReferenceCell
        id={"cell" + props.id}
        onDrag={drag}
        ondragover={allowDrop}
        ondrop={onDrop}
      />
    );
  }
  return (
    <WhiteCell
      id={"cell" + props.id}
      onDrag={drag}
      ondragover={allowDrop}
      ondrop={onDrop}
      onClick={handleClick}
    />
  );
};

Cell.propTypes = {
  id: PropTypes.string,
  cell: PropTypes.object.isRequired,
  row: PropTypes.number,
  column: PropTypes.number,
  irreplaceable: PropTypes.bool,
  onCellChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Cell;

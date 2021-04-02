import actionsTypes from "./actionTypes";
import * as api from "../../api/kakurosApi";
import cellTypes from "../../components/kakuro/grid_elements/cellTypes";

export function initializeSuccess(height, width) {
  return { type: actionsTypes.INITIALIZE_KAKURO, height, width };
}

export function changeKakuroCellSuccess(row, column, cell) {
  return {
    type: actionsTypes.CHANGE_KAKURO_CELL,
    row,
    column,
    cell
  };
}

export function initialize(height, width) {
  return function (dispatch) {
    dispatch(initializeSuccess(height, width));
  };
}

export function changeKakuroCell(row, column, cell) {
  return function (dispatch) {
    dispatch(changeKakuroCellSuccess(row, column, cell));
  };
}

export function saveKakuro(kakuroGrid, difficulty) {
  const kakuro = {
    difficulty,
    height: kakuroGrid.length,
    width: kakuroGrid[0].length,
    status: "DRAFT",
    grid: []
  };
  kakuroGrid.forEach((row) => {
    kakuro.grid.push(row.map(cellMapper));
  });
  return api.save(kakuro);
}

const cellMapper = (cell) => {
  switch (cell.type) {
    case cellTypes.BLACK: {
      return {
        celltype: cellTypes.BLACK
      };
    }
    case cellTypes.WHITE: {
      return {
        cellType: cellTypes.WHITE
      };
    }
    case cellTypes.REFERENCE: {
      return {
        celltype: cellTypes.REFERENCE,
        rightReference: cell.rightReference,
        downReference: cell.downReference
      };
    }
  }
};

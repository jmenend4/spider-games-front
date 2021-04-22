import actionsTypes from "./actionTypes";
import * as api from "../../api/kakurosApi";
import cellTypes from "../../components/kakuro/grid_elements/cellTypes";

export function initializeSuccess(height, width, grid) {
  return { type: actionsTypes.INITIALIZE_KAKURO, height, width, grid };
}

export function changeKakuroCellSuccess(row, column, cell) {
  return {
    type: actionsTypes.CHANGE_KAKURO_CELL,
    row,
    column,
    cell
  };
}

export function updateKakuroSolutionSuccess(solutionGrid) {
  return { type: actionsTypes.UPDATE_KAKURO_SOLUTION, solutionGrid };
}

export function initialize(height, width, grid) {
  return function (dispatch) {
    dispatch(initializeSuccess(height, width, grid));
  };
}

export function changeKakuroCell(row, column, cell) {
  return function (dispatch) {
    dispatch(changeKakuroCellSuccess(row, column, cell));
  };
}

export function updateKakuroSolution(solutionGrid) {
  return function (dispath) {
    dispath(updateKakuroSolutionSuccess(solutionGrid));
  };
}

export function solveKakuro(kakuroGrid) {
  return api.solve(kakuroGrid);
}

export async function retrieveDraftKakuro() {
  return api.retrieveDraftKakuro();
}

export function saveKakuro(kakuroGrid, difficulty) {
  const kakuro = {
    difficulty,
    height: kakuroGrid.length,
    width: kakuroGrid[0].length,
    status: "DRAFT",
    grid: mapGridToApi(kakuroGrid)
  };
  return api.save(kakuro);
}

const mapGridToApi = (grid) => {
  return grid.map(mapRowToApi);
};

const mapRowToApi = (row) => {
  return row.map(mapCellToApi);
};

const mapCellToApi = (cell) => {
  switch (cell.type) {
    case cellTypes.BLACK: {
      return {
        cellType: cellTypes.BLACK
      };
    }
    case cellTypes.WHITE: {
      return {
        cellType: cellTypes.WHITE,
        values: cell.values
      };
    }
    case cellTypes.REFERENCE: {
      return {
        cellType: cellTypes.REFERENCE,
        rightReference: cell.rightReference,
        downReference: cell.downReference
      };
    }
  }
};

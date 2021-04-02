import initialState from "./initialState";
import actionTypes from "../actions/actionTypes";
import cellTypes from "../../components/kakuro/grid_elements/cellTypes";

export default function kakuroReducer(state = initialState.kakuro, action) {
  switch (action.type) {
    case actionTypes.INITIALIZE_KAKURO: {
      return generateNewKakuro(action.height, action.width);
    }
    case actionTypes.CHANGE_KAKURO_CELL: {
      return changeKakuroCell(state, action.row, action.column, action.cell);
    }
    default: {
      return state;
    }
  }
}

function changeKakuroCell(kakuro, row, column, cell) {
  let i, j;
  let newRow;
  let newKakuro = [];
  for (i = 0; i < kakuro.length; i++) {
    newRow = [];
    if (i === row) {
      for (j = 0; j < kakuro[i].length; j++) {
        if (j === column) {
          newRow.push(cell);
        } else {
          newRow.push({ ...kakuro[i][j] });
        }
      }
    } else {
      newRow = [...kakuro[i]];
    }
    newKakuro.push([...newRow]);
  }
  return newKakuro;
}

function generateNewKakuro(height, width) {
  let kakuro = [];
  let row, i, j;
  for (i = 0; i < height; i++) {
    row = [];
    for (j = 0; j < width; j++) {
      row.push({
        type: cellTypes.WHITE,
        values: [],
        rigthReference: "",
        downReference: ""
      });
    }
    kakuro.push(row);
  }
  return kakuro;
}

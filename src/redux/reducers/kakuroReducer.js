import initialState from "./initialState";
import actionTypes from "../actions/actionTypes";
import cellTypes from "../../components/kakuro/grid_elements/cellTypes";

export default function kakuroReducer(state = initialState.kakuro, action) {
  switch (action.type) {
    case actionTypes.INITIALIZE_KAKURO: {
      if (action.grid === []) {
        return generateNewKakuro(action.height, action.width);
      }
      return mapKakuro(action.height, action.width, action.grid, state);
    }
    case actionTypes.CHANGE_KAKURO_CELL: {
      return changeKakuroCell(state, action.row, action.column, action.cell);
    }
    case actionTypes.UPDATE_KAKURO_SOLUTION: {
      // todo compareStateToSolution(state, action.solution);
      return mapKakuro(
        action.solutionGrid.length,
        action.solutionGrid[0].length,
        action.solutionGrid,
        state
      );
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

function mapKakuro(height, width, grid, state) {
  try {
    grid.forEach((row) => {
      if (row.length !== width) {
        throw "At least one row of the retrieved Kakuro is of different length.";
      }
    });
    return grid.map(rawMapper);
  } catch (err) {
    console.log("The retrieved kakuro is invalid: " + err);
    if (state === []) {
      console.log("\n\nGenerating a new blank one.");
      return generateNewKakuro(height, width);
    }
    return state;
  }
}

const rawMapper = (raw) => {
  return raw.map(cellMapper);
};

const cellMapper = (cell) => {
  switch (cell.cellType) {
    case cellTypes.BLACK: {
      return {
        type: cellTypes.BLACK
      };
    }
    case cellTypes.REFERENCE: {
      return {
        type: cellTypes.REFERENCE,
        rightReference: cell.rightReference
          ? cell.rightReference.toString()
          : "",
        downReference: cell.downReference ? cell.downReference.toString() : ""
      };
    }
    case cellTypes.WHITE: {
      return {
        type: cellTypes.WHITE,
        values: cell.values ? cell.values : []
      };
    }
    default: {
      throw "Invalid cell type: " + cell.cellType;
    }
  }
};

import React, { useState, useEffect, useRef } from "react";
import cellTypes from "../grid_elements/cellTypes";
import Cell from "../grid_elements/CreatorCell";
import { connect } from "react-redux";
import * as kakuroActions from "../../../redux/actions/kakuroActions";
import PropTypes from "prop-types";
import ExpandableButton from "../../common/expandable-button/ExpandableButton";
import BouncingButton from "../../common/bouncing-button/BouncingButton";
import "./kakuro-creator.css";
import HandySpider from "../../common/spiders/HandySpider";
import difficulties from "../../../utils/difficulty";
import ExpandableSelector from "../../common/expandable-selector/ExpandableSelector";

const KakuroCreatorPage = ({
  kakuro,
  initializeKakuro,
  changeKakuroCell,
  onBack,
  refocus
}) => {
  const options = {
    WHITE: cellTypes.WHITE,
    REFERENCE: cellTypes.REFERENCE,
    BLACK: cellTypes.BLACK,
    BACK: "back",
    SAVE: "save"
  };
  const [selectedOption, setSelectedOption] = useState(options.BLACK);
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    difficulties.HARD
  );
  const handySpiders = useRef([]);
  const handySpidersCounter = useRef(0);
  useEffect(() => {
    if (kakuro.length === 0) {
      initializeKakuro(14, 14);
    }
  }, [kakuro.length]);

  const generateKakuroGrid = () => {
    let i, j;
    let kakuroGrid = [];
    for (i = 0; i < kakuro.length; i++) {
      for (j = 0; j < kakuro[i].length; j++) {
        kakuroGrid.push(
          <Cell
            key={i * 100 + j}
            id={(i * 100 + j).toString()}
            row={i}
            column={j}
            cell={kakuro[i][j]}
            onCellChange={changeKakuroCell}
            onClick={getSpiderHelp}
          />
        );
      }
    }
    return <div className="kakuro-grid">{kakuroGrid}</div>;
  };

  const handleOptionFocus = ({ currentTarget }) => {
    const { name } = currentTarget;
    setSelectedOption(name);
  };

  const handleDifficultyChange = ({ currentTarget }) => {
    const { id } = currentTarget;
    setSelectedDifficulty(id);
  };

  const getSpiderHelp = (cellId, row, column, cell) => {
    if (
      selectedOption !== options.WHITE &&
      selectedOption !== options.REFERENCE &&
      selectedOption !== options.BLACK
    ) {
      return;
    }
    const actualCellRect = document
      .getElementById("actualcell" + cellId)
      .getBoundingClientRect();
    const targetRect = document
      .getElementById("actualcell" + selectedOption + "Ref")
      .getBoundingClientRect();
    const _selectedOption = selectedOption;
    handySpiders.current.push({
      id: handySpidersCounter.current,
      row,
      column,
      cell,
      type: _selectedOption,
      spider: (
        <HandySpider
          key={handySpidersCounter.current}
          id={handySpidersCounter.current}
          x={actualCellRect.left}
          y={actualCellRect.top}
          targetX={targetRect.x}
          targetY={targetRect.y}
          onDone={onHelpIsDone}
          cellType={selectedOption}
        />
      )
    });
    handySpidersCounter.current++;
  };

  const onHelpIsDone = (id) => {
    const handySpider = handySpiders.current.find((spider) => spider.id === id);
    changeKakuroCell(handySpider.row, handySpider.column, {
      ...handySpider.cell,
      type: handySpider.type
    });
    handySpiders.current = handySpiders.current.filter(
      (spider) => spider.id !== id
    );
    // no need to re render as the spiders are so handy that they remove themselves from the DOM :)
  };

  return (
    <>
      <div className="left-panel">
        <p className="description">
          Select the difficulty of your new kakuro on the top selector.
          <br /> <br />
          Drag and drop cell types to the grid or click on the grid to have a
          spider help you.
          <br /> <br />
          Then, complete the column and row references with a number between 3
          and 45 or leave them blank.
        </p>
        <div className="reference-cell-legend-container">
          <p className="description" style={{ fontSize: "2.5vh" }}>
            BLACK
          </p>
          <p className="description" style={{ fontSize: "2.5vh" }}>
            REFERENCE
          </p>
          <p className="description" style={{ fontSize: "2.5vh" }}>
            WHITE
          </p>
        </div>
        <div className="reference-cell-legend-container">
          <Cell
            cell={{
              type: cellTypes.BLACK,
              values: [],
              rigthReference: "",
              downReference: ""
            }}
            irreplaceable={true}
            onCellChange={changeKakuroCell}
            onClick={() => {}}
          />
          <Cell
            cell={{
              type: cellTypes.REFERENCE_REFERENCE,
              values: [],
              rigthReference: "",
              downReference: ""
            }}
            irreplaceable={true}
            onCellChange={changeKakuroCell}
            onClick={() => {}}
          />
          <Cell
            cell={{
              type: cellTypes.WHITE,
              values: [],
              rigthReference: "",
              downReference: ""
            }}
            irreplaceable={true}
            onCellChange={changeKakuroCell}
            onClick={() => {}}
          />
        </div>
      </div>
      <div className="main-panel">
        <div className="reference-cell-container">
          <BouncingButton
            containedComponent={
              <Cell
                cell={{
                  type: cellTypes.BLACK,
                  values: [],
                  rigthReference: "",
                  downReference: ""
                }}
                irreplaceable={true}
                onCellChange={changeKakuroCell}
                key={10001}
                id={options.BLACK + "Ref"}
                onClick={() => {}}
              />
            }
            sideLengthPx={100}
            bouncingProportion={0.03}
            refocus={refocus}
            name={options.BLACK}
            selectedId={selectedOption}
            onFocus={handleOptionFocus}
          />
          <BouncingButton
            containedComponent={
              <Cell
                cell={{
                  type: cellTypes.REFERENCE_REFERENCE,
                  values: [],
                  rigthReference: "",
                  downReference: ""
                }}
                irreplaceable={true}
                onCellChange={changeKakuroCell}
                key={10002}
                id={options.REFERENCE + "Ref"}
                onClick={() => {}}
              />
            }
            sideLengthPx={100}
            bouncingProportion={0.03}
            name={options.REFERENCE}
            selectedId={selectedOption}
            onFocus={handleOptionFocus}
            refocus={refocus}
          />
          <BouncingButton
            containedComponent={
              <Cell
                cell={{
                  type: cellTypes.WHITE,
                  values: [],
                  rigthReference: "",
                  downReference: ""
                }}
                irreplaceable={true}
                onCellChange={changeKakuroCell}
                key={10003}
                id={options.WHITE + "Ref"}
                onClick={() => {}}
              />
            }
            sideLengthPx={100}
            bouncingProportion={0.03}
            name={options.WHITE}
            selectedId={selectedOption}
            onFocus={handleOptionFocus}
            refocus={refocus}
          />
        </div>
        <div className="kakuro-grid">{generateKakuroGrid()}</div>
        {handySpiders.current.map((spider) => spider.spider)}
      </div>
      <div className="creator-footer">
        <ExpandableButton
          fontSizePt={18}
          widthPx={window.innerWidth * 0.15}
          onClick={onBack}
          label="BACK"
          name={options.BACK}
          selectedId={selectedOption}
          onFocus={handleOptionFocus}
          refocus={refocus}
          backgroundColor={"rgba(0, 71, 77, 0.3)"}
          backgroundOnHover={"rgb(0, 71, 77)"}
          textAlignment="center"
        />
        <ExpandableButton
          fontSizePt={18}
          widthPx={window.innerWidth * 0.15}
          onClick={() => kakuroActions.saveKakuro(kakuro, selectedDifficulty)}
          label="SAVE"
          name={options.SAVE}
          selectedId={selectedOption}
          onFocus={handleOptionFocus}
          refocus={refocus}
          backgroundColor={"rgba(0, 71, 77, 0.3)"}
          backgroundOnHover={"rgb(0, 71, 77)"}
          textAlignment="center"
        />
      </div>
      <div className="creator-header">
        <ExpandableSelector
          fontSizePt={18}
          textAlignment="center"
          widthPx={window.innerWidth * 0.15}
          backgroundColor={"rgba(0, 71, 77, 0.3)"}
          backgroundOnHover={"rgb(0, 71, 77)"}
          label={difficulties.EASY}
          id={difficulties.EASY}
          selectedId={selectedDifficulty}
          onSelect={handleDifficultyChange}
        />
        <ExpandableSelector
          fontSizePt={18}
          textAlignment="center"
          widthPx={window.innerWidth * 0.15}
          backgroundColor={"rgba(0, 71, 77, 0.3)"}
          backgroundOnHover={"rgb(0, 71, 77)"}
          label={difficulties.HARD}
          id={difficulties.HARD}
          selectedId={selectedDifficulty}
          onSelect={handleDifficultyChange}
        />
        <ExpandableSelector
          fontSizePt={18}
          textAlignment="center"
          widthPx={window.innerWidth * 0.15}
          backgroundColor={"rgba(0, 71, 77, 0.3)"}
          backgroundOnHover={"rgb(0, 71, 77)"}
          label={difficulties.NIGHTMARE}
          id={difficulties.NIGHTMARE}
          selectedId={selectedDifficulty}
          onSelect={handleDifficultyChange}
        />
      </div>
    </>
  );
};

KakuroCreatorPage.propTypes = {
  kakuro: PropTypes.array.isRequired,
  initializeKakuro: PropTypes.func.isRequired,
  changeKakuroCell: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  refocus: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
  return {
    kakuro: state.kakuro
  };
};

const mapDispatchToProps = {
  initializeKakuro: kakuroActions.initialize,
  changeKakuroCell: kakuroActions.changeKakuroCell
};

export default connect(mapStateToProps, mapDispatchToProps)(KakuroCreatorPage);

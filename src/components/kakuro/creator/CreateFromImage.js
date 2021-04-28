import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as kakuroActions from "../../../redux/actions/kakuroActions";
import * as toastActions from "../../../redux/actions/toastActions";
import "./kakuro-creator.css";
import ExpandableButton from "../../common/expandable-button/ExpandableButton";
import Cell from "../grid_elements/CreatorCell";
import options from "./creatorOptions";
import difficulties from "../../../utils/difficulty";
import ExpandableSelector from "../../common/expandable-selector/ExpandableSelector";
import SpiderSpinner from "../../common/spinner/SpiderSpinner";

const CreateFromImage = ({
  kakuro,
  initializeKakuro,
  changeKakuroCell,
  updateKakuroSolution,
  detectKakuro,
  addToast,
  onBack,
  refocus
}) => {
  const [selectedOption, setSelectedOption] = useState(options.OPEN);
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    difficulties.HARD
  );
  const [spinnerOn, setSpinnerOn] = useState(false);
  const [kakuroImageFile, setKakuroImageFile] = useState(null);
  const [kakuroImageForm, setKakuroImageForm] = useState(null);
  const [detectedSuccessfully, setDetectedSuccessfully] = useState(false);

  useEffect(() => {
    if (kakuro.lenght !== 0) {
      initializeKakuro(14, 14, []);
    }
  }, []);

  const imageInput = useRef(null);

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
          />
        );
      }
    }
    return <div className="kakuro-grid">{kakuroGrid}</div>;
  };

  const openKakuroPicture = () => {
    imageInput.current.click();
  };

  const onChangeFile = ({ target }) => {
    setSpinnerOn(true);
    const reader = new FileReader();
    reader.onload = () => {
      setKakuroImageFile(reader.result);
      setSpinnerOn(false);
    };
    reader.readAsDataURL(target.files[0]);

    const formData = new FormData();
    formData.append("file", target.files[0]);
    setKakuroImageForm(formData);
  };

  const detect = () => {
    detectKakuro(kakuroImageForm);
  };

  const solve = () => {};

  const handleOptionFocus = ({ currentTarget }) => {
    const { name } = currentTarget;
    setSelectedOption(name);
  };

  const handleDifficultyChange = ({ currentTarget }) => {
    const { id } = currentTarget;
    setSelectedDifficulty(id);
  };

  return (
    <>
      <div className="left-panel">
        <p className="description">
          Open a picture of a kakuro you want to add.
          <br /> <br />
          The kakuro must be centered in the picture and must have mininum to no
          border.
        </p>
      </div>
      <div className="main-panel">
        <input
          ref={imageInput}
          type="file"
          accept="image/*"
          onChange={(e) => {
            onChangeFile(e);
          }}
          style={{ display: "none" }}
        />
        <div className="reference-cell-container">
          <ExpandableButton
            fontSizePt={18}
            widthPx={window.innerWidth * 0.15}
            onClick={() => openKakuroPicture()}
            label="OPEN IMAGE"
            name={options.OPEN}
            selectedId={selectedOption}
            onFocus={handleOptionFocus}
            refocus={refocus}
            backgroundColor={"rgba(0, 71, 77, 0.3)"}
            backgroundOnHover={"rgb(0, 71, 77)"}
            textAlignment="center"
          />
        </div>
        <div
          className="kakuro-grid"
          style={{
            backgroundImage:
              kakuroImageFile !== null ? `url(${kakuroImageFile})` : "none",
            backgroundSize: "cover"
          }}
        >
          {detectedSuccessfully && generateKakuroGrid()}
        </div>
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
        {kakuroImageForm != null && (
          <ExpandableButton
            fontSizePt={18}
            widthPx={window.innerWidth * 0.15}
            onClick={() => {
              if (detectedSuccessfully) {
                solve();
              } else {
                detect();
              }
            }}
            label={detectedSuccessfully ? "SOLVE" : "DETECT"}
            name={detectedSuccessfully ? options.SOLVE : options.DETECT}
            selectedId={selectedOption}
            onFocus={handleOptionFocus}
            refocus={refocus}
            backgroundColor={"rgba(0, 71, 77, 0.3)"}
            backgroundOnHover={"rgb(0, 71, 77)"}
            textAlignment="center"
          />
        )}

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
      {spinnerOn && <SpiderSpinner />}
    </>
  );
};

CreateFromImage.propTypes = {
  kakuro: PropTypes.array.isRequired,
  initializeKakuro: PropTypes.func.isRequired,
  changeKakuroCell: PropTypes.func.isRequired,
  updateKakuroSolution: PropTypes.func.isRequired,
  addToast: PropTypes.func.isRequired,
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
  changeKakuroCell: kakuroActions.changeKakuroCell,
  updateKakuroSolution: kakuroActions.updateKakuroSolution,
  detectKakuro: kakuroActions.detectKakuro,
  addToast: toastActions.addToast
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateFromImage);

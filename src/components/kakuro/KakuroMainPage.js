import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ExpandableButton from "../common/expandable-button/ExpandableButton";
import "./kakuro-main.css";
import { useHistory } from "react-router-dom";
import KakuroCreatorPage from "./creator/KakuroCreatorPage";
import CreateFromImage from "./creator/CreateFromImage";
import * as kakuroActions from "../../redux/actions/kakuroActions";

const KakuroMainPage = ({ resetKakuro }) => {
  const options = {
    PLAY: "play",
    CREATE: "create",
    CAPTURE: "capture",
    BACK_HOME: "back_home"
  };
  const history = useHistory();
  const [optionDescription, setOptionDescription] = useState(null);
  const [refocus, setRefocus] = useState(-1);
  const [selectedOption, setSelectedOption] = useState(options.PLAY);
  const [clickedOption, setClickedOption] = useState(false);

  useEffect(() => {
    switch (selectedOption) {
      case options.PLAY: {
        setOptionDescription(
          "Select your desired difficulty level and play a KAKURO from our huge database."
        );
        break;
      }
      case options.CREATE: {
        setOptionDescription(
          "Receive help from our lovely spiders to create your own Kakuro" +
            "by arranging references, black and white cells in a grid of your choice."
        );
        break;
      }
      case options.CAPTURE: {
        setOptionDescription(
          "Capture images of your favorite KAKUROs and let the spidy team" +
            "create them for you."
        );
        break;
      }
      case options.BACK_HOME: {
        setOptionDescription(
          "Go back to the home page to hit the radioactive spider."
        );
        break;
      }
      default: {
        setOptionDescription("No description available");
      }
    }
  }, [selectedOption]);

  const triggerRefocus = () => {
    setRefocus(refocus * -1);
  };

  const handleOptionFocus = ({ currentTarget }) => {
    const { name } = currentTarget;
    setSelectedOption(name);
  };

  const onOptionClick = () => {
    setClickedOption(true);
  };

  const onBackToKakuroMainPage = () => {
    resetKakuro();
    setClickedOption(false);
  };

  return (
    <>
      <div
        className="kakuro-layout"
        style={{ filter: "blur(0px)" }}
        onClick={triggerRefocus}
      >
        {clickedOption && selectedOption === options.CREATE && (
          <KakuroCreatorPage
            onBack={onBackToKakuroMainPage}
            refocus={refocus}
          />
        )}
        {clickedOption && selectedOption === options.CAPTURE && (
          <CreateFromImage onBack={onBackToKakuroMainPage} refocus={refocus} />
        )}

        {
          /* Kakuro main page starts here */ !clickedOption && (
            <>
              <div className="header" style={{ gridArea: "left-panel-header" }}>
                <h2 className="left-panel-header">DESCRIPTION</h2>
              </div>
              <div className="header" style={{ gridArea: "panel-header" }}>
                <h1 className="panel-header">WHAT DO YOU WANT TO DO?</h1>
              </div>
              <div className="left-panel">
                <p className="description">{optionDescription}</p>
              </div>
              <div className="main-panel">
                <div className="options">
                  <ExpandableButton
                    fontSizePt={window.innerHeight * 0.025}
                    widthPx={window.innerWidth * 0.3}
                    onClick={() => {
                      history.push("/");
                    }}
                    label="PLAY"
                    name={options.PLAY}
                    selectedId={selectedOption}
                    onFocus={handleOptionFocus}
                    refocus={refocus}
                    backgroundColor={"rgba(0, 71, 77, 0.3)"}
                    backgroundOnHover={"rgb(0, 71, 77)"}
                    textAlignment="center"
                  />
                  <ExpandableButton
                    fontSizePt={window.innerHeight * 0.025}
                    widthPx={window.innerWidth * 0.3}
                    onClick={onOptionClick}
                    label="CREATE"
                    name={options.CREATE}
                    selectedId={selectedOption}
                    onFocus={handleOptionFocus}
                    refocus={refocus}
                    backgroundColor={"rgba(0, 71, 77, 0.3)"}
                    backgroundOnHover={"rgb(0, 71, 77)"}
                    textAlignment="center"
                  />
                  <ExpandableButton
                    fontSizePt={window.innerHeight * 0.025}
                    widthPx={window.innerWidth * 0.3}
                    onClick={onOptionClick}
                    label="CREATE FROM IMAGE CAPTURE"
                    name={options.CAPTURE}
                    selectedId={selectedOption}
                    onFocus={handleOptionFocus}
                    refocus={refocus}
                    backgroundColor={"rgba(0, 71, 77, 0.3)"}
                    backgroundOnHover={"rgb(0, 71, 77)"}
                    textAlignment="center"
                  />
                </div>
              </div>
              <div className="footer">
                <ExpandableButton
                  fontSizePt={window.innerHeight * 0.02}
                  widthPx={window.innerWidth * 0.15}
                  onClick={() => {
                    history.push("/");
                  }}
                  label="BACK TO HOME"
                  name={options.BACK_HOME}
                  selectedId={selectedOption}
                  onFocus={handleOptionFocus}
                  refocus={refocus}
                  backgroundColor={"rgba(0, 71, 77, 0.3)"}
                  backgroundOnHover={"rgb(0, 71, 77)"}
                  textAlignment="center"
                />
              </div>
            </>
          )
        }

        {/* borders start here - horizon borders first */}
        <div
          className="horizontal-border"
          style={{ gridArea: "left-panel-header-top-border" }}
        >
          <div
            className="corner-horizontal-fragment"
            style={{ width: "100%" }}
          ></div>
        </div>
        <div
          className="horizontal-border"
          style={{ gridArea: "panel-header-top-border" }}
        >
          <div className="corner-horizontal-fragment"></div>
          <div
            className="horizontal-border-line"
            style={{ width: "100%" }}
          ></div>
          <div className="corner-horizontal-fragment"></div>
        </div>
        <div
          className="horizontal-border"
          style={{ gridArea: "panel-top-border" }}
        >
          <div
            className="horizontal-border-line"
            style={{ width: "100%" }}
          ></div>
        </div>
        <div
          className="horizontal-border"
          style={{ gridArea: "left-panel-top-border" }}
        >
          <div
            className="corner-horizontal-fragment"
            style={{ width: "5%" }}
          ></div>
          <div
            className="horizontal-border-line"
            style={{ width: "95%" }}
          ></div>
        </div>
        <div
          className="horizontal-border"
          style={{ gridArea: "left-panel-bottom-border" }}
        >
          <div
            className="horizontal-border-line"
            style={{ width: "100%" }}
          ></div>
          <div className="corner-horizontal-fragment"></div>
        </div>
        <div
          className="horizontal-border"
          style={{ gridArea: "panel-bottom-border" }}
        >
          <div className="corner-horizontal-fragment"></div>
          <div
            className="horizontal-border-line"
            style={{ width: "100%" }}
          ></div>
          <div className="corner-horizontal-fragment"></div>
        </div>
        <div
          className="horizontal-border"
          style={{ gridArea: "panel-footer-bottom-border" }}
        >
          <div className="corner-horizontal-fragment"></div>
          <div
            className="horizontal-border-line"
            style={{ width: "100%" }}
          ></div>
          <div className="corner-horizontal-fragment"></div>
        </div>

        {/* vertical borders */}

        <div
          className="vertical-border"
          style={{ gridArea: "left-panel-header-left-border" }}
        >
          <div
            className="vertical-border-line"
            style={{ height: "100%" }}
          ></div>
        </div>
        <div
          className="vertical-border"
          style={{ gridArea: "left-panel-left-border" }}
        >
          <div
            className="vertical-border-line"
            style={{ height: "3px", width: "3px" }}
          ></div>
          <div
            className="vertical-border-line"
            style={{ height: "100%" }}
          ></div>
          <div className="corner-vertical-fragment"></div>
        </div>
        <div
          className="vertical-border"
          style={{ gridArea: "left-panel-header-right-border" }}
        >
          <div className="corner-vertical-fragment"></div>
          <div
            className="vertical-border-line"
            style={{ height: "100%" }}
          ></div>
        </div>

        <div
          className="vertical-border"
          style={{ gridArea: "left-panel-right-border" }}
        >
          <div
            className="vertical-border-line"
            style={{ height: "3px", width: "3px" }}
          ></div>
          <div
            className="vertical-border-line"
            style={{ height: "100%" }}
          ></div>
          <div
            className="corner-vertical-fragment"
            style={{ height: "3px" }}
          ></div>
        </div>
        <div
          className="vertical-border"
          style={{ gridArea: "panel-header-left-border" }}
        >
          <div className="corner-vertical-fragment"></div>
          <div
            className="vertical-border-line"
            style={{ height: "100%" }}
          ></div>
        </div>
        <div
          className="vertical-border"
          style={{ gridArea: "panel-left-border" }}
        >
          <div
            className="corner-vertical-fragment"
            style={{ height: "3px" }}
          ></div>
          <div className="vertical-border-line" style={{ height: "60%" }}></div>
          <div
            className="vertical-border-line"
            style={{ height: "3px", margin: "10px 0 10px 0" }}
          ></div>
          <div className="vertical-border-line" style={{ height: "3%" }}></div>
          <div
            className="horizontal-border-line"
            style={{ width: "5px", margin: "10px 0 10px 0" }}
          ></div>
          <div className="vertical-border-line" style={{ height: "2%" }}></div>
          <div
            className="vertical-border-line"
            style={{ height: "3px", margin: "10px 0 10px 0" }}
          ></div>
          <div className="vertical-border-line" style={{ height: "20%" }}></div>
          <div className="corner-vertical-fragment"></div>
        </div>
        <div
          className="vertical-border"
          style={{ gridArea: "panel-header-right-border" }}
        >
          <div className="corner-vertical-fragment"></div>
          <div
            className="vertical-border-line"
            style={{ height: "100%" }}
          ></div>
        </div>
        <div
          className="vertical-border"
          style={{ gridArea: "panel-right-border" }}
        >
          <div
            className="corner-vertical-fragment"
            style={{ height: "3px" }}
          ></div>
          <div className="vertical-border-line" style={{ height: "20%" }}></div>
          <div
            className="vertical-border-line"
            style={{ height: "3px", margin: "10px 0 10px 0" }}
          ></div>
          <div className="vertical-border-line" style={{ height: "2%" }}></div>
          <div
            className="horizontal-border-line"
            style={{ width: "5px", margin: "10px 0 10px 0" }}
          ></div>
          <div className="vertical-border-line" style={{ height: "3%" }}></div>
          <div
            className="vertical-border-line"
            style={{ height: "3px", margin: "10px 0 10px 0" }}
          ></div>
          <div className="vertical-border-line" style={{ height: "60%" }}></div>
          <div className="corner-vertical-fragment"></div>
        </div>
        <div
          className="vertical-border"
          style={{ gridArea: "panel-footer-left-border" }}
        >
          <div className="corner-vertical-fragment"></div>
          <div
            className="vertical-border-line"
            style={{ height: "100%" }}
          ></div>
          <div className="corner-vertical-fragment"></div>
        </div>
        <div
          className="vertical-border"
          style={{ gridArea: "panel-footer-right-border" }}
        >
          <div
            className="vertical-border-line"
            style={{ height: "100%" }}
          ></div>
          <div
            className="corner-vertical-fragment"
            style={{ height: "3px" }}
          ></div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  resetKakuro: kakuroActions.resetKakuro
};

export default connect(null, mapDispatchToProps)(KakuroMainPage);

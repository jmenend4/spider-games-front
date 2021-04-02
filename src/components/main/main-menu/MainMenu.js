import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./main-menu.css";
import ExpandableButton from "../../common/expandable-button/ExpandableButton";
import Selector from "./selector/Selector";
import Carousel from "./carousel/Carousel";

const MainMenu = ({ hidden, onCloseClick, onOptionClick }) => {
  const menu = useRef(null);
  const [refocus, setRefocus] = useState(-1);
  const [selectedOption, setSelectedOption] = useState("kakuro");

  const triggerRefocus = () => {
    setRefocus(refocus * -1);
  };

  const handleOptionFocus = ({ currentTarget }) => {
    const { name } = currentTarget;
    setSelectedOption(name);
  };

  return (
    <div
      className="overlay"
      style={{ visibility: hidden ? "hidden" : "visible" }}
      onClick={() => triggerRefocus()} //returns focus to the default menu item
    >
      <div
        ref={menu}
        className="menu"
        style={{ top: hidden ? "100%" : "0" }}
        onTransitionEnd={() => triggerRefocus()}
      >
        <div className="closing-x-container">
          <h1 className="closing-x" onClick={() => onCloseClick()}>
            &times;
          </h1>
        </div>
        <h1 className="title">SELECT YOUR GAME</h1>
        {menu.current && (
          <>
            <div
              className="options-left-border-container"
              style={{
                "--menu-width": menu.current.getBoundingClientRect().width
              }}
            >
              <div className="short-border"></div>
              <div className="long-border"></div>
              <div className="short-border"></div>
            </div>
            <div className="selector-container">
              <Selector
                id="kakuro"
                selectedId={selectedOption}
                containerWidth={menu.current.getBoundingClientRect().width}
              />
              <Selector
                id="circuit"
                selectedId={selectedOption}
                containerWidth={menu.current.getBoundingClientRect().width}
              />
              <Selector
                id="element"
                selectedId={selectedOption}
                containerWidth={menu.current.getBoundingClientRect().width}
              />
              <Selector
                id="morris"
                selectedId={selectedOption}
                containerWidth={menu.current.getBoundingClientRect().width}
              />
            </div>
            <div className="options">
              <ExpandableButton
                key={"expandableButtonKakuro"}
                name={"kakuro"}
                fontSizePt={18}
                widthPx={
                  Math.floor(menu.current.getBoundingClientRect().width) * 0.75
                }
                backgroundOnHover={"rgba(48, 48, 122, 0.5)"}
                label={"KAKURO"}
                onFocus={handleOptionFocus}
                refocus={refocus}
                selectedId={selectedOption}
                onClick={(e) => {
                  onOptionClick(e);
                }}
              />
              <ExpandableButton
                key={"expandableButtonCircuit"}
                name={"circuit"}
                fontSizePt={18}
                widthPx={
                  Math.floor(menu.current.getBoundingClientRect().width) * 0.75
                }
                backgroundOnHover={"rgba(48, 48, 122, 0.5)"}
                label={"CIRCUIT BREAKER"}
                onFocus={handleOptionFocus}
                refocus={refocus}
                selectedId={selectedOption}
                onClick={(e) => {
                  onOptionClick(e);
                }}
              />
              <ExpandableButton
                key={"expandableButtonElement"}
                name={"element"}
                fontSizePt={18}
                widthPx={
                  Math.floor(menu.current.getBoundingClientRect().width) * 0.75
                }
                backgroundOnHover={"rgba(48, 48, 122, 0.5)"}
                label={"ELEMENT DISCOVERER"}
                onFocus={handleOptionFocus}
                refocus={refocus}
                selectedId={selectedOption}
                onClick={(e) => {
                  onOptionClick(e);
                }}
              />
              <ExpandableButton
                key={"expandableButtonmorris"}
                name={"morris"}
                fontSizePt={18}
                widthPx={
                  Math.floor(menu.current.getBoundingClientRect().width) * 0.75
                }
                backgroundOnHover={"rgba(48, 48, 122, 0.5)"}
                label={"SPIDER MORRIS"}
                onFocus={handleOptionFocus}
                refocus={refocus}
                selectedId={selectedOption}
                onClick={(e) => {
                  onOptionClick(e);
                }}
              />
            </div>
          </>
        )}
        <h4 className="title2">...or find something similar here</h4>
        <Carousel refocus={triggerRefocus} />
      </div>
    </div>
  );
};

MainMenu.propTypes = {
  hidden: PropTypes.bool.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  onOptionClick: PropTypes.func.isRequired
};

export default MainMenu;

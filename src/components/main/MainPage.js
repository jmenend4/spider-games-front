import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import spiderStatus from "../common/spiders/spiderStatus";
import * as spiderActions from "../../redux/actions/spidersActions";
import Spidy from "../common/spiders/Spidy";
import MainMenu from "./main-menu/MainMenu";
import "./main-page.css";
import web1 from "../../../resources/web1.jpg";
import { useHistory } from "react-router-dom";

const MainPage = ({ spiders, initializeSpiders }) => {
  const history = useHistory();
  const [elRef, setElRef] = useState(null);
  const [maxX, setMaxX] = useState(null);
  const [maxY, setMaxY] = useState(null);
  const [mouseYOffset, setMouseYOffset] = useState(0);
  const [mouseXOffset, setMouseXOffset] = useState(0);
  const [mainMenuHidden, setMainMenuHidden] = useState(true);
  const [inmerse, setInmerse] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const webContainer = useRef(null);
  useEffect(() => {
    if (elRef === null) {
      setElRef(webContainer.current);
      setMaxX(webContainer.current.offsetWidth);
      setMaxY(webContainer.current.offsetHeight);
    }
    if (spiders.length === 0) {
      initializeSpiders(getSpiders());
    }
    webContainer.current.addEventListener("mousemove", setMouseOffsets);
    return () =>
      webContainer.current.removeEventListener("mousemove", setMouseOffsets);
  }, []); //should contemplate possible screen size changes... later.

  const setMouseOffsets = (e) => {
    setMouseYOffset(e.clientY - webContainer.current.offsetTop);
    setMouseXOffset(e.clientX - webContainer.current.offsetLeft);
  };

  const getSpiders = () => {
    // const n = Math.floor(Math.random() * 11) + 10;
    const n = 30;
    let i;
    let spiders = [];
    for (i = 0; i <= n; i++) {
      spiders.push({
        id: i,
        status: spiderStatus.RESTING,
        x: Math.floor(
          Math.random() *
            (webContainer.current.getBoundingClientRect().right * 2 -
              webContainer.current.offsetLeft)
        ),
        y: Math.floor(
          Math.random() *
            (webContainer.current.getBoundingClientRect().bottom * 2 -
              webContainer.current.offsetTop)
        ),
        // x: 600,
        // y: 400,
        angle: Math.random() * (2 * Math.PI),
        // angle: (7 * Math.PI) / 4,
        angleOffset: 0,
        cos: 1,
        sin: 0,
        currentXOffset: 0,
        currentYOffset: 0,
        newXOffset: 0,
        newYOffset: 0,
        distance: 0,
        speed: 0,
        radioactive: false,
        onclickHandler: () => {}
      });
    }
    spiders[0].radioactive = true;
    spiders[0].onClickHandler = unhideMenu;
    return spiders;
  };

  const unhideMenu = () => {
    setMainMenuHidden(false);
  };

  const hideMenu = () => {
    setMainMenuHidden(true);
  };

  const handleOptionClick = ({ currentTarget }) => {
    setSelectedOption(currentTarget.name);
    hideMenu();
    setInmerse(true);
  };

  const onInmersionEnd = ({ animationName }) => {
    if (animationName !== "inmerse-tablet") {
      return;
    }
    switch (selectedOption) {
      case "kakuro": {
        history.push("/kakuro");
      }
    }
  };

  return (
    <>
      <div className="layout-grid">
        <div className="overall-container" ref={webContainer}>
          <img
            className={
              "computer-container" + (inmerse ? " tablet-inmersion" : "")
            }
            src="https://i.ytimg.com/vi/MKE2d6-eTdA/maxresdefault.jpg"
            style={{
              "--mouse-x-offset": mouseXOffset,
              "--mouse-y-offset": mouseYOffset,
              "--top-offset": (maxY - 720) / 2,
              "--left-offset": (maxX - 1280) / 2
            }}
            onAnimationEnd={(e) => onInmersionEnd(e)}
          ></img>
          <div
            className={"web-container" + (inmerse ? " inmersion" : "")}
            style={{
              backgroundImage: `url(${web1})`,
              "--mouse-x-offset": mouseXOffset,
              "--mouse-y-offset": mouseYOffset
            }}
          ></div>
          <div
            className={"spiders-container" + (inmerse ? " inmersion" : "")}
            style={{
              "--mouse-x-offset": mouseXOffset,
              "--mouse-y-offset": mouseYOffset
            }}
          >
            {spiders.map((spider) => (
              <Spidy
                key={spider.id}
                id={spider.id}
                maxX={maxX * 2}
                maxY={maxY * 2}
                mouseXOffset={0}
                mouseYOffset={0}
              />
            ))}
          </div>
        </div>
      </div>
      <MainMenu
        onCloseClick={hideMenu}
        hidden={mainMenuHidden}
        onOptionClick={handleOptionClick}
      />
    </>
  );
};

MainPage.propTypes = {
  spiders: PropTypes.array.isRequired,
  initializeSpiders: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return { spiders: state.spiders };
};

const mapDispatchToProps = {
  initializeSpiders: spiderActions.initializeSpiders
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

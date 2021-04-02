import React, { useState } from "react";
import PropTypes from "prop-types";
import "./spider.css";
import PullableBlackCell from "../../kakuro/grid_elements/PullableBlackCell";
import PullableReferenceCell from "../../kakuro/grid_elements/PullableReferenceCell";
import PullableWhiteCell from "../..//kakuro/grid_elements/PullableWhiteCell";
import cellTypes from "../../kakuro/grid_elements/cellTypes";

const HandySpider = ({ id, x, y, targetX, targetY, onDone, cellType }) => {
  const [state, setState] = useState("rotating");
  const scale = (window.innerHeight * 0.045) / 40;
  const adjustedX = x - 5 - (40 * (1 - scale)) / 2; //coordinates need to be adjusted because document and windows 0' are slightly different
  const adjustedY = y - 6 - (40 * (1 - scale)) / 2;
  const actualTargetX = targetX - 5 - (40 * (1 - scale)) / 2;
  const actualTargetY = targetY - 6 - (40 * (1 - scale)) / 2;
  const vectorLength = Math.sqrt(
    Math.pow(adjustedX - actualTargetX, 2) +
      Math.pow(adjustedY - actualTargetY, 2)
  );
  const angle = Math.asin((adjustedY - actualTargetY) / vectorLength);

  const onEndPulling = (e) => {
    if (e.animationName === "rotate-spider") {
      setState("pulling");
    }
  };

  const onEndWebbing = (e) => {
    if (e.animationName === "webbing") {
      e.stopPropagation();
      setState("done");
      onDone(id);
    }
  };

  return (
    <>
      {state !== "done" && (
        <div
          onAnimationEnd={(e) => onEndPulling(e)}
          className={"left-spider-container rotating"}
          style={{
            "--animation-duration": (0.5 * Math.abs(angle)) / (Math.PI / 4),
            "--step-duration": 0.125,
            "--steps": (0.5 * Math.abs(angle)) / (Math.PI / 4) / 0.125,
            "--top-position": adjustedY,
            "--left-position": adjustedX,
            "--angle": 0,
            "--angle-offset": angle,
            "--distance": vectorLength,
            "--scale": scale
          }}
        >
          <div className="third-legs-container">
            <div className={"third-right-leg walking-left"}></div>
            <div className={"third-left-leg walking-left"}></div>
          </div>
          <div className="fourth-legs-container">
            <div className={"fourth-right-leg walking-left"}></div>
            <div className={"fourth-left-leg walking-left"}></div>
          </div>
          <div className="second-legs-container">
            <div className={"second-right-leg walking-left"}></div>
            <div className={"second-left-leg walking-left"}></div>
          </div>
          <div className="first-legs-container">
            <div className={"first-right-leg walking-left"}></div>
            <div className={"first-left-leg walking-left"}></div>
          </div>
          <div className="fang-container">
            <div className={"right-fang"}></div>
            <div className={"left-fang"}></div>
          </div>
          <div className={"head"}></div>
          <div className={"body"}></div>
        </div>
      )}
      {state === "pulling" && (
        <>
          {cellType === cellTypes.BLACK ? (
            <PullableBlackCell
              x={actualTargetX}
              y={actualTargetY}
              xOffset={adjustedX - actualTargetX}
              yOffset={adjustedY - actualTargetY}
            />
          ) : cellType === cellTypes.REFERENCE ? (
            <PullableReferenceCell
              x={actualTargetX}
              y={actualTargetY}
              xOffset={adjustedX - actualTargetX}
              yOffset={adjustedY - actualTargetY}
            />
          ) : (
            <PullableWhiteCell
              x={actualTargetX}
              y={actualTargetY}
              xOffset={adjustedX - actualTargetX}
              yOffset={adjustedY - actualTargetY}
            />
          )}
          <div
            className="web-string"
            style={{
              "--web-origin-x": adjustedX + 0.0225 * window.innerHeight,
              "--web-origin-y": adjustedY + 0.0225 * window.innerHeight,
              "--direction": Math.PI + angle,
              "--string-length": vectorLength
            }}
            onAnimationEnd={(e) => onEndWebbing(e)}
          ></div>
        </>
      )}
    </>
  );
};

HandySpider.propTypes = {
  id: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  targetX: PropTypes.number.isRequired,
  targetY: PropTypes.number.isRequired,
  onDone: PropTypes.func.isRequired,
  cellType: PropTypes.string.isRequired
};

export default HandySpider;

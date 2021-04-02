import React from "react";
import PropTypes from "prop-types";
import "./spider-right.css";
import { connect } from "react-redux";
import * as spidersActions from "../../../redux/actions/spidersActions";
import spiderStatus from "./spiderStatus";

const Spider = ({ spiderState, updateSpider }) => {
  const onAnimationEnd = (e) => {
    if (
      e.animationName === "rotate-spider" &&
      spiderState.status === spiderStatus.ROTATING
    ) {
      const updatedAngle = spiderState.angle + spiderState.angleOffset;
      updateSpider({
        ...spiderState,
        angle:
          Math.abs(updatedAngle) >= 2 * Math.PI
            ? updatedAngle - Math.sign(updatedAngle) * 2 * Math.PI
            : updatedAngle,
        status: spiderStatus.TRANSLATING
      });
    } else if (
      e.animationName === "move-spidy-move" &&
      spiderState.status === spiderStatus.TRANSLATING
    ) {
      updateSpider({
        ...spiderState,
        status: spiderStatus.RESTING,
        currentXOffset: spiderState.currentXOffset + spiderState.newXOffset,
        currentYOffset: spiderState.currentYOffset - spiderState.newYOffset
      });
    }
  };

  return (
    <div
      key={spiderState.id}
      onAnimationEnd={(e) => onAnimationEnd(e)}
      className={
        (spiderState.status === spiderStatus.ROTATING
          ? "rotating "
          : spiderState.status === spiderStatus.TRANSLATING
          ? "translating "
          : "") +
        "spider-container absolute-positioning" +
        (spiderState.radioactive ? " radioactive" : "")
      }
      onClick={() => spiderState.onClickHandler()}
      style={{
        "--steps":
          spiderState.status === spiderStatus.ROTATING
            ? Math.abs(spiderState.angleOffset) / (Math.PI / 4)
            : spiderState.status === spiderStatus.TRANSLATING
            ? Math.ceil(spiderState.distance / 5) + 1
            : 0,
        "--step-duration":
          spiderState.status === spiderStatus.ROTATING
            ? 0.125
            : spiderState.speed === 0
            ? 0
            : 5 / spiderState.speed,
        "--top-potition": spiderState.y,
        "--y-offset": spiderState.currentYOffset,
        "--left-position": spiderState.x,
        "--x-offset": spiderState.currentXOffset,
        "--angle": spiderState.angle,
        "--angle-offset":
          spiderState.status === spiderStatus.ROTATING
            ? spiderState.angle + spiderState.angleOffset
            : 0,
        "--cos": spiderState.cos,
        "--sin": spiderState.sin,
        "--distance": spiderState.distance,
        "--animation-duration":
          spiderState.status === spiderStatus.ROTATING
            ? Math.abs(spiderState.angleOffset) / (2 * Math.PI)
            : spiderState.status === spiderStatus.TRANSLATING
            ? spiderState.distance / spiderState.speed
            : 0
      }}
    >
      <div className="third-legs-container">
        <div
          className={
            "third-right-leg walking" +
            (spiderState.radioactive ? " radioactive" : "")
          }
        ></div>
        <div
          className={
            "third-left-leg walking" +
            (spiderState.radioactive ? " radioactive" : "")
          }
        ></div>
      </div>
      <div className="fourth-legs-container">
        <div
          className={
            "fourth-right-leg walking" +
            (spiderState.radioactive ? " radioactive" : "")
          }
        ></div>
        <div
          className={
            "fourth-left-leg walking" +
            (spiderState.radioactive ? " radioactive" : "")
          }
        ></div>
      </div>
      <div className="second-legs-container">
        <div
          className={
            "second-right-leg walking" +
            (spiderState.radioactive ? " radioactive" : "")
          }
        ></div>
        <div
          className={
            "second-left-leg walking" +
            (spiderState.radioactive ? " radioactive" : "")
          }
        ></div>
      </div>
      <div className="first-legs-container">
        <div
          className={
            "first-right-leg walking" +
            (spiderState.radioactive ? " radioactive" : "")
          }
        ></div>
        <div
          className={
            "first-left-leg walking" +
            (spiderState.radioactive ? " radioactive" : "")
          }
        ></div>
      </div>
      <div className="fang-container">
        <div
          className={
            "right-fang" + (spiderState.radioactive ? " radioactive" : "")
          }
        ></div>
        <div
          className={
            "left-fang" + (spiderState.radioactive ? " radioactive" : "")
          }
        ></div>
      </div>
      <div
        className={"head" + (spiderState.radioactive ? " radioactive" : "")}
      ></div>
      <div
        className={"body" + (spiderState.radioactive ? " radioactive" : "")}
      ></div>
      {spiderState.radioactive ? (
        <>
          <div className="radioactivity-marking-container">
            <div className="radioactivity-marking-back"></div>
            <div className="radioactivity-marking-front"></div>
          </div>
          <div className="sensor-container">
            <div className="lighting-pair-container first-pair">
              <div className="lighting-container">
                <div className="upper-rotated-lighting-section"></div>
                <div className="midle-lighting-section"></div>
                <div className="lower-rotated-lighting-section"></div>
              </div>
              <div className="lighting-container rotated">
                <div className="upper-rotated-lighting-section glowing"></div>
                <div className="midle-lighting-section glowing"></div>
                <div className="lower-rotated-lighting-section glowing"></div>
              </div>
            </div>
            <div className="lighting-pair-container second-pair">
              <div className="lighting-container">
                <div className="upper-rotated-lighting-section"></div>
                <div className="midle-lighting-section"></div>
                <div className="lower-rotated-lighting-section"></div>
              </div>
              <div className="lighting-container rotated">
                <div className="upper-rotated-lighting-section"></div>
                <div className="midle-lighting-section"></div>
                <div className="lower-rotated-lighting-section"></div>
              </div>
            </div>
            <div className="lighting-pair-container third-pair">
              <div className="lighting-container">
                <div className="upper-rotated-lighting-section"></div>
                <div className="midle-lighting-section"></div>
                <div className="lower-rotated-lighting-section"></div>
              </div>
              <div className="lighting-container rotated">
                <div className="upper-rotated-lighting-section"></div>
                <div className="midle-lighting-section"></div>
                <div className="lower-rotated-lighting-section"></div>
              </div>
            </div>
            <div className="lighting-pair-container fourth-pair">
              <div className="lighting-container">
                <div className="upper-rotated-lighting-section"></div>
                <div className="midle-lighting-section"></div>
                <div className="lower-rotated-lighting-section"></div>
              </div>
              <div className="lighting-container rotated">
                <div className="upper-rotated-lighting-section"></div>
                <div className="midle-lighting-section"></div>
                <div className="lower-rotated-lighting-section"></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

Spider.propTypes = {
  spiderState: PropTypes.object.isRequired,
  updateSpider: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  return {
    spiderState: state.spiders.find((spider) => spider.id === ownProps.id)
  };
};

const mapDispatchToProps = {
  updateSpider: spidersActions.updateSpider
};

export default connect(mapStateToProps, mapDispatchToProps)(Spider);

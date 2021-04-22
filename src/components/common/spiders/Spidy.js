import React from "react";
import { connect } from "react-redux";
import * as spiderActions from "../../../redux/actions/spidersActions";
import Spider from "./Spider";
import PropTypes from "prop-types";
import spiderStatus from "./spiderStatus";

const Spidy = ({ maxX, maxY, spiderState, toCrash, updateSpiderState }) => {
  const offsetExceedsBoundries = (xOffset, yOffset) => {
    return (
      spiderState.x + spiderState.currentXOffset + xOffset >= maxX - 40 ||
      spiderState.x + spiderState.currentXOffset + xOffset <= 40 ||
      spiderState.y + spiderState.currentYOffset - yOffset >= maxY - 40 ||
      spiderState.y + spiderState.currentYOffset - yOffset <= 40
    );
  };

  if (spiderState.status === spiderStatus.RESTING) {
    let xOffset = maxX;
    let yOffset = 0;
    let angleOffsetOffset = 0;
    let angleOffset = 0;
    let cos;
    let sin;
    let distance;
    let loopBraker = 0;
    const borderAvoidanceRotationDirection = Math.random() < 0.5 ? -1 : 1;
    while (offsetExceedsBoundries(xOffset, yOffset) && loopBraker < 7) {
      angleOffset = Math.random() * (Math.PI / 2) - Math.PI / 4;
      angleOffset = angleOffset + angleOffsetOffset;
      // angleOffset = 0;
      let _nextAngle = spiderState.angle + angleOffset;
      cos = Math.cos(_nextAngle);
      sin = Math.sin(_nextAngle);
      distance = Math.floor(Math.random() * 400) + 10;
      xOffset = Math.floor(distance * cos);
      yOffset = Math.floor(distance * sin);
      if (offsetExceedsBoundries(xOffset, yOffset)) {
        angleOffsetOffset += (borderAvoidanceRotationDirection * Math.PI) / 6;
        loopBraker++;
      }
    }
    const speed = Math.floor(Math.random() * 100) + 40;
    // const speed = 1;
    updateSpiderState({
      ...spiderState,
      status: spiderStatus.ROTATING,
      angleOffset,
      cos,
      sin,
      currentXOffset: loopBraker >= 7 ? 0 : spiderState.currentXOffset,
      currentYOffset: loopBraker >= 7 ? 0 : spiderState.currentYOffset,
      newXOffset: loopBraker >= 7 ? 0 : xOffset,
      newYOffset: loopBraker >= 7 ? 0 : yOffset,
      distance: loopBraker >= 7 ? 0 : distance,
      speed
    });
  }

  return <Spider id={spiderState.id} />;
};

const toCrash = (spiders, id, maxX, maxY) => {
  //   const my = spiders.find((spider) => spider.id === id);
  //   spiders.forEach((spider) => {
  //     if (spider.id !== id) {
  //       if (
  //         (my.y >= spider.y && my.y <= spider.y + 40) ||
  //         my.y < 0 ||
  //         my.y > maxY
  //       ) {
  //         if (
  //           (my.x >= spider.x && my.x <= spider.x + 40) ||
  //           my.x < 0 ||
  //           my.x > maxX
  //         ) {
  //           return 1;
  //         } else if (
  //           (my.x + 40 >= spider.x && my.x + 40 <= spider.x + 40) ||
  //           my.x + 40 < 0 ||
  //           my.x + 40 > maxX
  //         ) {
  //           return 2;
  //         }
  //       }
  //     }
  //   });
  return false;
};

Spidy.propTypes = {
  id: PropTypes.number.isRequired,
  maxX: PropTypes.number.isRequired,
  maxY: PropTypes.number.isRequired,
  spiderState: PropTypes.object.isRequired,
  toCrash: PropTypes.bool.isRequired,
  updateSpiderState: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  const spider = state.spiders.find((spider) => spider.id === ownProps.id);
  return {
    toCrash: toCrash(state.spiders, ownProps.id, ownProps.maxX, ownProps.maxY),
    spiderState: spider
  };
}

const mapDispatchToProps = {
  updateSpiderState: spiderActions.updateSpider
};

export default connect(mapStateToProps, mapDispatchToProps)(Spidy);

import React from "react";
import "./spinner-spider.css";

const SpinnerSpider = () => {
  const sizeUnit = (window.innerHeight * 12.5) / 4000;
  const size = (window.innerHeight / 100) * 12.5;
  const top = (window.innerHeight - size - 15) / 2;
  const left = (window.innerWidth - size - 15) / 2;
  return (
    <div
      className="spinner-spider-container absolute-positioning"
      style={{
        "--size-unit": sizeUnit,
        "--size": size,
        "--top-potition": top,
        "--left-position": left,
        "--angle": Math.Pi / 2
      }}
    >
      <div className="third-legs-container">
        <div className="third-right-leg"></div>
        <div className="third-left-leg"></div>
      </div>
      <div className="fourth-legs-container">
        <div className="fourth-right-leg"></div>
        <div className="fourth-left-leg"></div>
      </div>
      <div className="second-legs-container">
        <div className="second-right-leg"></div>
        <div className="second-left-leg"></div>
      </div>
      <div className="first-legs-container">
        <div className="first-right-leg"></div>
        <div className="first-left-leg"></div>
      </div>
      <div className="fang-container">
        <div className="right-fang"></div>
        <div className="left-fang"></div>
      </div>
      <div className="head"></div>
      <div className="body"></div>
    </div>
  );
};

export default SpinnerSpider;

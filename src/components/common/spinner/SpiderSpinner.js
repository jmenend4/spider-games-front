import React from "react";
import "./spider-spinner.css";
import SpinnerSpider from "./SpinnerSpider";

const SpiderSpinner = () => {
  const d = (window.innerHeight * 20) / 100;
  const r = d / 2;
  const y = Math.sqrt(Math.pow(r, 2) / 2);
  const dx = r + y;
  const dy = r - y;

  const d1 = (window.innerHeight * 17.5) / 100;
  const delta1 = (d - d1) / 2;
  const r1 = d1 / 2;
  const y1 = Math.sqrt(Math.pow(r1, 2) / 2);
  const dx1 = r + y1;
  const dy1 = r - y1;

  const d2 = (window.innerHeight * 15) / 100;
  const delta2 = (d - d2) / 2;
  const r2 = d2 / 2;
  const x2 = Math.sqrt(Math.pow(r2, 2) / 5);
  const y2 = Math.sqrt((Math.pow(r2, 2) * 4) / 5);
  const dx2 = r - x2;
  const dy2 = r - y2;

  return (
    <div className="background">
      <svg style={{ backgroundColor: "transparent" }} width={d} height={d}>
        <g id="outter-circle">
          <path
            d={
              "M " +
              dy +
              " " +
              dy +
              " A " +
              r +
              " " +
              r +
              " 0 0 1 " +
              dx +
              " " +
              dy
            }
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
          <path
            d={
              "M " +
              dx +
              " " +
              dx +
              " A " +
              r +
              " " +
              r +
              " 0 0 1 " +
              dy +
              " " +
              dx
            }
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
        </g>

        <g id="inner-circle">
          <path
            d={
              "M " +
              (r1 + delta1) +
              " " +
              delta1 +
              " A " +
              r1 +
              " " +
              r1 +
              " 0 0 1 " +
              dx1 +
              " " +
              dy1
            }
            stroke="white"
            strokeWidth="3"
            fill="none"
          >
            <animate
              attributeType="CSS"
              attributeName="opacity"
              from="1"
              to="1"
              values="1; 0.05; 1"
              keyTimes="0; 0.5; 1"
              dur="8s"
              repeatCount="indefinite"
            />
          </path>
          <path
            d={
              "M " +
              (r1 + delta1) +
              " " +
              (d - delta1) +
              " A " +
              r1 +
              " " +
              r1 +
              " 0 0 1 " +
              dy1 +
              " " +
              dx1
            }
            stroke="white"
            strokeWidth="3"
            fill="none"
          >
            <animate
              attributeType="CSS"
              attributeName="opacity"
              from="1"
              to="1"
              values="1; 0.05; 1"
              keyTimes="0; 0.5; 1"
              dur="8s"
              repeatCount="indefinite"
            />
          </path>
          <path
            d={
              "M " +
              (d - delta1) +
              " " +
              r +
              " A " +
              r1 +
              " " +
              r1 +
              " 0 0 1 " +
              dx1 +
              " " +
              dx1
            }
            stroke="white"
            strokeWidth="3"
            fill="none"
          >
            <animate
              attributeType="CSS"
              attributeName="opacity"
              from="1"
              to="1"
              values="1; 0.05; 1"
              keyTimes="0; 0.5; 1"
              dur="8s"
              repeatCount="indefinite"
            />
          </path>
          <path
            d={
              "M " +
              delta1 +
              " " +
              r +
              " A " +
              r1 +
              " " +
              r1 +
              " 0 0 1 " +
              dy1 +
              " " +
              dy1
            }
            stroke="white"
            strokeWidth="3"
            fill="none"
          >
            <animate
              attributeType="CSS"
              attributeName="opacity"
              from="1"
              to="1"
              values="1; 0.05; 1"
              keyTimes="0; 0.5; 1"
              dur="8s"
              repeatCount="indefinite"
            />
          </path>
        </g>

        <g id="inner-inner-circle">
          <path
            d={
              "M " +
              delta2 +
              " " +
              r +
              " A " +
              r2 +
              " " +
              r2 +
              " 0 0 1 " +
              dx2 +
              " " +
              dy2
            }
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
          <path
            d={
              "M " +
              r +
              " " +
              delta2 +
              " A " +
              r2 +
              " " +
              r2 +
              " 0 0 1 " +
              (r + y2) +
              " " +
              dx2
            }
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
          <path
            d={
              "M " +
              (d - delta2) +
              " " +
              r +
              " A " +
              r2 +
              " " +
              r2 +
              " 0 0 1 " +
              (r + x2) +
              " " +
              (r + y2)
            }
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
          <path
            d={
              "M " +
              r +
              " " +
              (d - delta2) +
              " A " +
              r2 +
              " " +
              r2 +
              " 0 0 1 " +
              dy2 +
              " " +
              (r + x2)
            }
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
        </g>
      </svg>
      <SpinnerSpider />
    </div>
  );
};

export default SpiderSpinner;

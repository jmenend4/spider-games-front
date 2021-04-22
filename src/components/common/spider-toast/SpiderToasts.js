import React from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import "./spider-toast.css";
import SpiderToast from "./SpiderToast";

const SpiderToasts = ({ toasts }) => {
  const renderToats = () =>
    toasts
      .slice()
      .reverse()
      .map((toast) => (
        <SpiderToast
          key={toast.id}
          id={toast.id}
          timeout={toast.timeout}
          type={toast.type}
          message={toast.message}
        />
      ));

  return (
    <>
      {toasts.length > 0 && (
        <div
          className="toasts-container"
          style={{ "--unit": window.innerHeight / 100 }}
        >
          {renderToats()}
        </div>
      )}
    </>
  );
};

SpiderToasts.propTypes = {
  toasts: propTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return { toasts: state.toasts };
};

export default connect(mapStateToProps)(SpiderToasts);

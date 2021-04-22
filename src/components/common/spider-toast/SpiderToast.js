import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as toastActions from "../../../redux/actions/toastActions";
import toastTypes from "./toastTypes";
import PropTypes from "prop-types";
import "./spider-toast.css";

const SpiderToast = ({ id, timeout, type, message, removeToast }) => {
  const [show, setShow] = useState(true);
  const [expand, setExpand] = useState(false);
  const [color, setColor] = useState(null);

  useEffect(() => {
    switch (type) {
      case toastTypes.GREEN: {
        setColor("rgb(9, 255, 235)");
        break;
      }
      case toastTypes.YELLOW: {
        setColor("rgb(243, 252, 126)");
        break;
      }
      case toastTypes.RED: {
        setColor("rgb(247, 140, 140)");
        break;
      }
      default: {
        setColor("rgb(9, 255, 235)");
      }
    }

    const _timeout = setTimeout(() => {
      setShow(false);
    }, timeout);

    return () => {
      clearTimeout(_timeout);
    };
  }, []);

  const onTimeout = (e) => {
    if (e.animationName === "close-toast") {
      removeToast(id);
    }
  };

  const onClose = () => {
    setShow(false);
  };

  const onExpand = () => {
    setExpand(!expand);
  };

  return (
    <div
      id={id}
      className={
        show ? "toast-container open-toast" : "toast-container close-toast"
      }
      style={{
        "--unit": window.innerHeight / 100,
        // height: expand ? "auto" : "calc(var(--unit) * 10px)",
        backgroundColor: color
      }}
      onAnimationEnd={(e) => onTimeout(e)}
    >
      <h1 className="toast-close" onClick={() => onClose()}>
        &times;
      </h1>
      <p
        className="toast-message"
        style={{
          height: expand ? "auto" : "calc(var(--unit) * 3px)",
          whiteSpace: expand ? "normal" : "nowrap"
        }}
        onClick={() => onExpand()}
      >
        {message}
      </p>
    </div>
  );
};

SpiderToast.propTypes = {
  id: PropTypes.string.isRequired,
  timeout: PropTypes.number.isRequired,
  type: PropTypes.string,
  message: PropTypes.string.isRequired,
  removeToast: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  removeToast: toastActions.removeToast
};

export default connect(null, mapDispatchToProps)(SpiderToast);

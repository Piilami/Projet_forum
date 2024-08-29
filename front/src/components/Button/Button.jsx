import React from "react";
import "./Button.scss";

const Button = ({ type = "button", onClick, children, className }) => {
  return (
    <button type={type} className={`btn-submit ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

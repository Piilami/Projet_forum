import React from "react";
import "./InputFields.scss";

const InputField = ({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  required,
  ariaLabel,
}) => {
  return (
    <div className="auth-field-container">
      <label htmlFor={id} className="auth-field__label">
        {placeholder}:
      </label>
      <input
        type={type}
        id={id}
        name={name}
        className="auth-field"
        aria-label={ariaLabel}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required={required}
      />
    </div>
  );
};

export default InputField;

import React, { useEffect, useState } from "react";
import InputField from "../InputFields/InputFields";
import Button from "../Button/Button";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./AuthForm.scss";

const AuthForm = ({ title, fields, onSubmit, error, submitText }) => {
  const [formData, setFormData] = useState(
    fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.id]: field.type === "select" ? field.options[0].value : "",
      }),
      {}
    )
  );

  useEffect(() => {
    setFormData(
      fields.reduce(
        (acc, field) => ({
          ...acc,
          [field.id]: field.type === "select" ? field.options[0].value : "",
        }),
        {}
      )
    );
  }, [title]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await onSubmit(formData);
    } catch (err) {
      console.error("Erreur de soumission :", err);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="container__auth-form">
        <h3 className="title_auth-form">{title}</h3>
        {fields.map((field) =>
          field.type === "select" ? (
            <div key={field.id} className="auth-field-container">
              <label htmlFor={field.id} className="auth-field__label">
                {field.label}
              </label>
              <select
                id={field.id}
                name={field.name}
                value={formData[field.id]}
                onChange={handleChange}
                className="auth-field"
                aria-label={field.ariaLabel}
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <InputField
              key={field.id}
              type={field.type}
              id={field.id}
              name={field.name}
              value={formData[field.id]}
              onChange={handleChange}
              placeholder={field.placeholder}
              ariaLabel={field.ariaLabel}
              label={field.label}
            />
          )
        )}
        <div className="btn-container">
          <Button type="submit">{submitText || "Valider"}</Button>
        </div>
        {error && <ErrorMessage message={error.message} />}
      </div>
    </form>
  );
};

export default AuthForm;

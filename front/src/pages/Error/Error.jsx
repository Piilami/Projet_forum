import React from "react";
import "./Error.scss";

const Error = () => {
  return (
    <div className="error-container">
      <h1 className="error-title">404</h1>
      <p className="error-message">Page non trouvée</p>
      <p className="error-description">
        Nous n'avons pas trouvé la page que vous recherchez. Peut-être que vous
        pouvez
        <a href="/" className="error-link">
          {" "}
          revenir à la page d'accueil
        </a>{" "}
        ?
      </p>
    </div>
  );
};

export default Error;

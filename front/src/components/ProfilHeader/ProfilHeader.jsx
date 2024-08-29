import React from "react";
import "./ProfilHeader.scss";

const ProfilHeader = ({ username }) => {
  return (
    <header className="profil-header">
      <h1 className="profil-title">
        Bonjour {username}, heureux de vous revoir
      </h1>
    </header>
  );
};

export default ProfilHeader;

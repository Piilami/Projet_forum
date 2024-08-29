import React from "react";
import Button from "../Button/Button";
import "./ProfilButtons.scss";

const ProfilButtons = ({ onEdit, onDelete, onReport, showReportButton }) => {
  return (
    <div className="container-btn">
      {showReportButton && (
        <Button className="btn-report" onClick={onReport}>
          Signaler cet utilisateur
        </Button>
      )}
      <Button className="btn-edit" onClick={onEdit}>
        Modifier le profil
      </Button>
      <Button className="btn-delete" onClick={onDelete}>
        Supprimer le profil
      </Button>
    </div>
  );
};

export default ProfilButtons;

import React from "react";
import "../ModerateCard/ModerateCard.scss";

const ModerateCard = ({ item, onApprove, onReject }) => {
  return (
    <div className="moderate-card">
      <h3>{item.title || item.username}</h3>
      <p>{item.content || item.email}</p>
      <p>Raison du signalement : {item.reportReason}</p>
      <div className="moderate-actions">
        <button onClick={onApprove}>Épargner</button>
        <button onClick={onReject}>Bannir</button>
      </div>
    </div>
  );
};

export default ModerateCard;

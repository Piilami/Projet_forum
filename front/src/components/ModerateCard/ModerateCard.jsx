import React from "react";
import "../ModerateCard/ModerateCard.scss";

const ModerateCard = ({ item, onApprove, onReject }) => {
  console.log(item);
  return (
    <div className="moderate-card">
      <p>Raison du signalement : {item.context.content}</p>
      <div className="moderate-actions">
        <button onClick={onApprove}>Épargner</button>
        <button onClick={onReject}>Bannir</button>
      </div>
    </div>
  );
};

export default ModerateCard;

import React from "react";
import "./ProfilDetails.scss";

const ProfilDetails = ({ user }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Date non disponible";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "Date invalide";

    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <section className="profil-container">
      <article className="fields-container">
        <h2 id="firstname">Prénom</h2>
        <p className="display-fields" aria-label="champ affichant votre prénom">
          {user.firstname}
        </p>
      </article>
      <article className="fields-container">
        <h2>Nom</h2>
        <p
          className="display-fields"
          aria-label="champ affichant votre nom de famille"
        >
          {user.lastname}
        </p>
      </article>
      <article className="fields-container">
        <h2>Date de naissance</h2>
        <p
          className="display-fields"
          aria-label="champ affichant votre date de naissance"
        >
          {formatDate(user.birthday)}
        </p>
      </article>
      <article className="fields-container">
        <h2>Pays</h2>
        <p className="display-fields" aria-label="champ affichant votre pays">
          {user.country}
        </p>
      </article>
      <article className="fields-container">
        <h2>Email</h2>
        <p className="display-fields" aria-label="champ affichant votre email">
          {user.email}
        </p>
      </article>
    </section>
  );
};

export default ProfilDetails;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUserThunk } from "../../redux/reducers/userReducer";
import InputField from "../InputFields/InputFields";
import Button from "../Button/Button";
import "./ProfilForm.scss";
import { useNavigate } from "react-router-dom";

const ProfilForm = ({ user, setIsEditing }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: user.firstname || "",
    lastname: user.lastname || "",
    birthday: user.birthday || "",
    country: user.country || "",
    email: user.email || "",
  });

  useEffect(() => {
    setFormData({
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      birthday: user.birthday || "",
      country: user.country || "",
      email: user.email || "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        updateUserThunk({ userId: user._id, userData: formData })
      ).unwrap();
      setIsEditing(false);
      navigate(`/`);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <form className="profil-form" onSubmit={handleSubmit}>
      <div className="container__center-form">
        <h3 className="title_edit">Modifier votre profil</h3>
        <InputField
          id="firstname"
          name="firstname"
          type="text"
          placeholder="Prénom"
          value={formData.firstname}
          onChange={handleChange}
          ariaLabel="champ pour renseigner votre prénom"
          label="Prénom:"
        />
        <InputField
          id="lastname"
          name="lastname"
          type="text"
          placeholder="Nom"
          value={formData.lastname}
          onChange={handleChange}
          ariaLabel="champ pour renseigner votre nom"
          label="Nom:"
        />
        <InputField
          id="birthday"
          name="birthday"
          type="date"
          placeholder="Date de naissance"
          value={formData.birthday}
          onChange={handleChange}
          ariaLabel="champ pour renseigner votre date de naissance"
          label="Date de naissance:"
        />
        <InputField
          id="country"
          name="country"
          type="text"
          placeholder="Pays"
          value={formData.country}
          onChange={handleChange}
          ariaLabel="champ pour renseigner votre pays"
          label="Pays:"
        />
        <InputField
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          ariaLabel="champ pour renseigner votre email"
          label="Email:"
        />
        <Button type="submit">Enregistrer les modifications</Button>
        <Button type="button" onClick={() => setIsEditing(false)}>
          Annuler
        </Button>
      </div>
    </form>
  );
};

export default ProfilForm;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUserThunk } from "../../redux/reducers/authReducer";
import AuthForm from "../../components/AuthForm/AuthForm";
import "./Registration.scss";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);

  const handleSubmit = async (formData) => {
    const { email, username, password, checkPassword } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim().toLowerCase())) {
      console.error("Adresse email invalide.");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      console.error(
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre."
      );
      return;
    }

    if (password !== checkPassword) {
      console.error("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const actionResult = await dispatch(
        registerUserThunk({
          email: email.trim().toLowerCase(),
          username: username.trim(),
          password: password.trim(),
        })
      );
      if (registerUserThunk.fulfilled.match(actionResult)) {
        navigate("/login");
      } else {
        console.error("Erreur lors de l'inscription :", actionResult.payload);
      }
    } catch (err) {
      console.error("Erreur lors de l'inscription :", err);
    }
  };

  const fields = [
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Email",
      ariaLabel: "champ pour renseigner l'email de l'utilisateur",
      label: "Email:",
    },
    {
      id: "username",
      name: "username",
      type: "text",
      placeholder: "Pseudonyme",
      ariaLabel: "champ pour renseigner le pseudonyme de l'utilisateur",
      label: "Pseudonyme:",
    },
    {
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Mot de passe",
      ariaLabel: "champ pour renseigner le mot de passe de l'utilisateur",
      label: "Mot de passe:",
    },
    {
      id: "checkPassword",
      name: "checkPassword",
      type: "password",
      placeholder: "Vérifiez votre mot de passe",
      ariaLabel: "champ pour vérifier le mot de passe de l'utilisateur",
      label: "Vérifiez votre mot de passe:",
    },
  ];

  return (
    <AuthForm
      title="Inscrivez-vous"
      fields={fields}
      onSubmit={handleSubmit}
      error={error}
      submitText="Valider"
      className="auth-submit"
    />
  );
};

export default Registration;

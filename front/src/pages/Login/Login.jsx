import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../../redux/reducers/authReducer";
import AuthForm from "../../components/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);

  const handleSubmit = async (formData) => {
    try {
      const cleanedFormData = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password.trim(),
      };

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanedFormData.email)) {
        throw new Error("Adresse email invalide.");
      }

      const resultAction = await dispatch(loginUserThunk(cleanedFormData));

      if (loginUserThunk.fulfilled.match(resultAction)) {
        navigate("/");
      } else {
        console.error(resultAction.payload || "Erreur lors de la connexion");
      }
    } catch (err) {
      console.error(err);
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
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Mot de passe",
      ariaLabel: "champ pour renseigner le mot de passe de l'utilisateur",
      label: "Mot de passe:",
    },
  ];

  return (
    <AuthForm
      title="Connectez-vous"
      fields={fields}
      onSubmit={handleSubmit}
      error={error}
      submitText="Valider"
    />
  );
};

export default Login;

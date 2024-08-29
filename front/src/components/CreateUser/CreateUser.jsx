import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../redux/reducers/adminReducer";
import AuthForm from "../../components/AuthForm/AuthForm";

const CreateUser = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.admin);

  const handleSubmit = async (formData) => {
    await dispatch(
      createUser({
        email: formData.email,
        username: formData.username,
        password: formData.password,
        role: formData.role,
      })
    );
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
      id: "role",
      name: "role",
      type: "select",
      placeholder: "Rôle",
      ariaLabel: "champ pour sélectionner le rôle de l'utilisateur",
      label: "Rôle:",
      options: [
        { value: "user", label: "Utilisateur" },
        { value: "moderator", label: "Modérateur" },
      ],
    },
  ];

  return (
    <AuthForm
      title="Créer un utilisateur"
      fields={fields}
      onSubmit={handleSubmit}
      error={error}
      submitText="Créer"
    />
  );
};

export default CreateUser;

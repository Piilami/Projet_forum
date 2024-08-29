import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchUser,
  updateUserThunk,
  deleteUserThunk,
  resetUser,
} from "../../redux/reducers/userReducer";
import ProfilForm from "../../components/ProfilForm/ProfilForm";
import ProfilHeader from "../../components/ProfilHeader/ProfilHeader";
import ProfilDetails from "../../components/ProfilDetails/ProfilDetails";
import ProfilButtons from "../../components/ProfilButtons/ProfilButtons";
import "./Profil.scss";

const Profil = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { id: userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.user);
  const loggedInUserId = useSelector((state) => state.auth.user?._id);

  useEffect(() => {
    dispatch(fetchUser(userId));

    return () => {
      dispatch(resetUser());
    };
  }, [dispatch, userId]);

  const handleDelete = () => {
    dispatch(deleteUserThunk(userId))
      .then(() => {
        localStorage.removeItem("token");
        navigate("/login");
      })
      .catch((err) => console.error(err));
  };

  const handleReport = () => {
    console.log("Signaler l'utilisateur");
  };

  const handleUpdateSuccess = () => {
    dispatch(fetchUser(userId));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  if (!user) return <div>Aucun utilisateur trouvé.</div>;

  if (isEditing) {
    return (
      <ProfilForm
        user={user}
        setIsEditing={setIsEditing}
        onUpdateSuccess={handleUpdateSuccess}
      />
    );
  }

  return (
    <main className="main-content">
      <ProfilHeader username={user.username || "Utilisateur"} />
      <ProfilDetails user={user} />
      <ProfilButtons
        onEdit={() => setIsEditing(true)}
        onDelete={handleDelete}
        onReport={handleReport}
        showReportButton={loggedInUserId !== userId}
      />
    </main>
  );
};

export default Profil;

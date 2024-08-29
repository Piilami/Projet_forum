import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, moderateUser } from "../../redux/reducers/adminReducer";
import ModerateCard from "../ModerateCard/ModerateCard";

const ModerateUser = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleModeration = (userId, actionType) => {
    dispatch(moderateUser({ userId, actionType }));
  };

  if (loading) return <p>Chargement en cours...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="moderate-users">
      {users.map((user) => (
        <ModerateCard
          key={user.id}
          item={user}
          onApprove={() => handleModeration(user.id, "approve")}
          onReject={() => handleModeration(user.id, "reject")}
        />
      ))}
    </div>
  );
};

export default ModerateUser;

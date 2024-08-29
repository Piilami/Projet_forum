import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeAuthThunk } from "../redux/reducers/authReducer";

const useAuth = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeAuthThunk());
  }, [dispatch]);

  const loading = status === "loading";
  const isAuthenticated = status === "succeeded";

  return { isAuthenticated, loading };
};

export default useAuth;

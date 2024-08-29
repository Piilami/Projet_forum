import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeAuthThunk } from "../redux/reducers/authReducer";
import PrivateRoute from "../components/Private/authRoutes";
import AdminRoute from "../components/Private/adminRoutes";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Profile from "../pages/Profiles/Profil";
import Admin from "../pages/Admin/Admin";
import Error from "../pages/Error/Error";
import Header from "../components/Header/Header";
import PostContent from "../pages/Post/PostContent";
import CreatePost from "../pages/CreatePost/CreatePost";

const App = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeAuthThunk());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/profil/:id"
          element={<PrivateRoute element={<Profile />} />}
        />
        <Route path="/admin" element={<AdminRoute element={<Admin />} />} />
        <Route
          path="/post/:id"
          element={<PrivateRoute element={<PostContent />} />}
        />
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route
          path="/add-post"
          element={<PrivateRoute element={<CreatePost />} />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;

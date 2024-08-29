import React, { useState } from "react";
import ModeratePost from "../../components/ModeratePost/ModeratePost";
import ModerateUsers from "../../components/ModerateUser/ModerateUser";
import CreateUser from "../../components/CreateUser/CreateUser";
import "./Admin.scss";

const Admin = () => {
  const [activeSection, setActiveSection] = useState("moderatePost");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case "moderatePost":
        return <ModeratePost />;
      case "moderateUsers":
        return <ModerateUsers />;
      case "createUser":
        return <CreateUser />;
      default:
        return <ModeratePost />;
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="admin-dashboard">
      <aside className={`sidebar ${isMenuOpen ? "open" : ""}`}>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <button
                className="nav-link"
                onClick={() => setActiveSection("moderatePosts")}
              >
                Modérer les posts
              </button>
            </li>
            {/* <li className="nav-item">
              <button
                className="nav-link"
                onClick={() => setActiveSection("moderateUsers")}
              >
                Modérer les utilisateurs
              </button>
            </li> */}
            <li className="nav-item">
              <button
                className="nav-link"
                onClick={() => setActiveSection("createUser")}
              >
                Créer un utilisateur
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="dashboard-content">{renderContent()}</div>
    </div>
  );
};

export default Admin;

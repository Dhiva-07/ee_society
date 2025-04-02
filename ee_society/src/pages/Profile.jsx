import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import Navbar from "../components/Navbar";
import EditProfile from "../components/EditProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "./profile.css";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_URL2;
  return (
    <div
      className="profile-main-container"
      onClick={() => {
        if (dropdownOpen) setDropdownOpen(false);
      }}
    >
      <Navbar dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen} />
      <div className="profile-page-container">
        <div className="profile-content">
          <FontAwesomeIcon
            icon={faEdit}
            className="edit-icon"
            onClick={() => setIsEditing(true)}
          />
          <div className="profile-avatar">
            <img
              src={PF + user.img}
              alt="Profile"
              className="profile-avatar__image"
            />
          </div>
          <div className="profile-info">
            <div className="profile-info__section">
              <h2 className="profile-info__name">{user.name}</h2>
              <p className="profile-info__email">{user.email}</p>
            </div>
            <div className="profile-bio">
              <h3 className="profile-bio__title">About Me</h3>
              <p className="profile-bio__text">
                {user.bio ||
                  "No bio available. Add a short description about yourself."}
              </p>
            </div>
          </div>
        </div>
      </div>
      {isEditing && <EditProfile onClose={() => setIsEditing(false)} />}
    </div>
  );
};

export default Profile;

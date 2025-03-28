import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "./profile.css";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_URL2;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-header__background"></div>
        <div className="profile-header__content">
          <h1 className="profile-header__title">{user.name}</h1>
          <p className="profile-header__tagline">{user.email}</p>
        </div>
      </div>
      <div className="profile-content">
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
            <h3 className="profile-bio__title">ABOUT ME</h3>
            <p className="profile-bio__text">
              {user.bio || "No bio available. Add a short description about yourself."}
            </p>
          </div>
        </div>
      </div>
      <div className="profile-actions">
        <button className="profile-action__button">Edit Profile</button>
        <button className="profile-action__button">Share Profile</button>
      </div>
    </div>
  );
};

export default Profile;

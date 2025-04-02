import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import "./editProfile.css";

const EditProfile = ({ onClose }) => {
  const { user, login } = useContext(AuthContext);
  const [userData, setuserData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio || "",
    img: user.img || null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    setuserData((prev) => ({ ...prev, img: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(userData);
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("bio", userData.bio);
    formData.append("img", userData.img);
    try {
      const userId = user._id;
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/user/update/${userId}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: token,
        },
      });
      if (res.ok) {
        login(token);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <div className="edit-profile-modal">
      <div className="edit-profile-content">
        <i className="fas fa-times close-icon" onClick={onClose}></i>
        <h2 className="profile-page-title">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <div className="input-namer">Profile Pic : </div>
            <input
              className="profile-input-area"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="input-wrapper">
            <div className="input-namer">Name : </div>
            <input
              type="text"
              name="name"
              className="profile-input-area"
              value={userData.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <div className="input-namer">Email : </div>
            <input
              type="email"
              name="email"
              className="profile-input-area"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <div className="input-namer">Bio : </div>
            <textarea
              name="bio"
              className="profile-textarea"
              value={userData.bio}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

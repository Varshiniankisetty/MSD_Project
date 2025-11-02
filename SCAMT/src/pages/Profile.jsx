import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { formatDate, formatDateTime, showLoading, hideLoading, showAlert } from "../utils/apiUtils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { user, isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      showLoading();
      setLoading(true);
      setError("");

      if (user && isAuthenticated) {
        setProfileData({
          user: user,
          statistics: {
            total_predictions: 0,
            total_documents: 0
          },
          recentActivity: []
        });
        setEditedUser({ ...user });
      } else if (isAuthenticated) {
        console.log("Using mock profile data (user data not available)");
        setProfileData({
          user: {
            name: "John Doe",
            email: "john.doe@example.com",
            role: "resident",
            phone: "+1-555-0123",
            community: "Sunset Apartments"
          },
          statistics: {
            total_predictions: 0,
            total_documents: 0
          },
          recentActivity: []
        });
        setEditedUser({
          name: "John Doe",
          email: "john.doe@example.com",
          role: "resident",
          phone: "+1-555-0123",
          community: "Sunset Apartments"
        });
      } else {
        setError("Please log in to view your profile.");
        setLoading(false);
        hideLoading();
        return;
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      setError("Failed to load profile data. Please try refreshing the page.");
    } finally {
      if (isAuthenticated) hideLoading();
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser({ ...profileData.user });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser({ ...profileData.user });
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    try {
      localStorage.setItem("userData", JSON.stringify(editedUser));
      if (login) login(localStorage.getItem("authToken"), editedUser);

      setIsEditing(false);
      setProfileData((prev) => ({ ...prev, user: editedUser }));
      showAlert("Profile updated successfully!", "success");
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    }
  };

  const handleViewComplaintTracker = () => {
    navigate("/track");
  };

  if (loading) return <div className="text-center mt-10">Loading profile...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!profileData) return <div className="text-center mt-10">No profile data available</div>;

  const { user: profileUser } = profileData;

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h2>Profile Information</h2>
          <div className="button-group">
            {isEditing ? (
              <>
                <button className="btn-save" onClick={handleSave}>
                  Save Changes
                </button>
                <button className="btn-cancel" onClick={handleCancel}>
                  Cancel
                </button>
              </>
            ) : (
              <button className="btn-edit" onClick={handleEdit}>
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-info">
            <div className="info-item">
              <label>Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editedUser.name || ""}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="edit-input"
                />
              ) : (
                <span id="profileName">
                  {profileUser?.name ||
                    `${profileUser?.first_name || ""} ${profileUser?.last_name || ""}`.trim() ||
                    "User"}
                </span>
              )}
            </div>

            <div className="info-item">
              <label>Email:</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editedUser.email || ""}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="edit-input"
                />
              ) : (
                <span id="profileEmail">{profileUser?.email || "No email"}</span>
              )}
            </div>

            <div className="info-item">
              <label>Role:</label>
              {isEditing ? (
                <select
                  name="role"
                  value={editedUser.role || ""}
                  onChange={handleChange}
                  className="edit-input"
                >
                  <option value="">-- Choose Role --</option>
                  <option value="resident">Resident</option>
                  <option value="worker">Maintenance Worker</option>
                  <option value="security">Security/Staff</option>
                  <option value="admin">Apartment Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              ) : (
                <span id="profileRole">{(profileUser?.role || "resident").toUpperCase()}</span>
              )}
            </div>

            <div className="info-item">
              <label>Phone:</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={editedUser.phone || ""}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="edit-input"
                />
              ) : (
                <span id="phone">{profileUser?.phone || "-"}</span>
              )}
            </div>

            <div className="info-item">
              <label>Community:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="community"
                  value={editedUser.community || ""}
                  onChange={handleChange}
                  placeholder="Enter your community"
                  className="edit-input"
                />
              ) : (
                <span id="community">{profileUser?.community || "-"}</span>
              )}
            </div>
          </div>

          {/* Navigation to Complaint Tracker */}
          <div className="complaint-tracker-section">
            <h3>Complaint Tracking</h3>
            <p>Track and manage all your complaints in one place.</p>
            <div className="track-actions">
              <button onClick={handleViewComplaintTracker} className="btn-primary">
                View Complaint Tracker
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

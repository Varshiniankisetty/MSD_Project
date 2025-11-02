import React, { useState, useEffect } from "react";
import "./Track.css";

const Track = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const staticComplaints = [
      {
        id: 1,
        flat: "A-101",
        service: "plumbing",
        description: "Leaky faucet in kitchen causing water damage",
        status: "completed",
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 2,
        flat: "B-205",
        service: "electrical",
        description: "Light switch not working in bedroom",
        status: "pending",
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 3,
        flat: "C-301",
        service: "cleaning",
        description: "Bathroom needs deep cleaning service",
        status: "in_progress",
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 4,
        flat: "A-102",
        service: "plumbing",
        description: "Clogged drain in master bathroom",
        status: "completed",
        created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 5,
        flat: "D-401",
        service: "electrical",
        description: "Power outlet not working in living room",
        status: "pending",
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 6,
        flat: "B-201",
        service: "cleaning",
        description: "Carpet cleaning required in hallway",
        status: "completed",
        created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 7,
        flat: "A-103",
        service: "plumbing",
        description: "Toilet running continuously",
        status: "in_progress",
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 8,
        flat: "C-302",
        service: "electrical",
        description: "Ceiling fan making unusual noise",
        status: "pending",
        created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 9,
        flat: "D-402",
        service: "cleaning",
        description: "Window cleaning for all windows",
        status: "completed",
        created_at: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 10,
        flat: "A-104",
        service: "plumbing",
        description: "Shower head replacement needed",
        status: "pending",
        created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 11,
        flat: "B-202",
        service: "electrical",
        description: "Dimmer switch installation",
        status: "completed",
        created_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 12,
        flat: "C-303",
        service: "cleaning",
        description: "Deep cleaning of kitchen appliances",
        status: "in_progress",
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 13,
        flat: "D-403",
        service: "plumbing",
        description: "Garbage disposal not working",
        status: "pending",
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 14,
        flat: "A-105",
        service: "electrical",
        description: "Smart thermostat installation",
        status: "completed",
        created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 15,
        flat: "B-203",
        service: "cleaning",
        description: "Move-out cleaning service",
        status: "pending",
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
    setComplaints(staticComplaints);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#4CAF50"; // Green
      case "in_progress":
        return "#FF9800"; // Orange
      case "pending":
        return "#2196F3"; // Blue
      default:
        return "#9E9E9E"; // Gray
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in_progress":
        return "In Progress";
      case "pending":
        return "Pending";
      default:
        return "Unknown";
    }
  };

  const completedComplaints = complaints.filter(complaint => complaint.status === "completed");
  const pendingComplaints = complaints.filter(complaint => complaint.status === "pending" || complaint.status === "in_progress");

  return (
    <section className="track-section">
      <div className="track-container">
        <h2>Track Your Complaints</h2>

        {complaints.length === 0 ? (
          <div className="no-complaints">
            <p>You haven't filed any complaints yet.</p>
            <a href="/complaint" className="btn-primary">File a Complaint</a>
          </div>
        ) : (
          <>
            <div className="stats-overview">
              <div className="stat-card">
                <h3>Total Complaints</h3>
                <p className="stat-number">{complaints.length}</p>
              </div>
              <div className="stat-card">
                <h3>Completed</h3>
                <p className="stat-number completed">{completedComplaints.length}</p>
              </div>
              <div className="stat-card">
                <h3>Pending</h3>
                <p className="stat-number pending">{pendingComplaints.length}</p>
              </div>
            </div>

            <div className="complaints-list">
              <h3>Your Complaints</h3>
              {complaints.map((complaint) => (
                <div key={complaint.id} className="complaint-card">
                  <div className="complaint-header">
                    <h4>Complaint #{complaint.id}</h4>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(complaint.status) }}
                    >
                      {getStatusText(complaint.status)}
                    </span>
                  </div>

                  <div className="complaint-details">
                    <div className="detail-row">
                      <span className="label">Flat Number:</span>
                      <span className="value">{complaint.flat}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Service Type:</span>
                      <span className="value">{complaint.service === "other" ? complaint.other : complaint.service}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Description:</span>
                      <span className="value">{complaint.description}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Filed On:</span>
                      <span className="value">{new Date(complaint.created_at).toLocaleDateString()}</span>
                    </div>
                    {complaint.updated_at && complaint.updated_at !== complaint.created_at && (
                      <div className="detail-row">
                        <span className="label">Last Updated:</span>
                        <span className="value">{new Date(complaint.updated_at).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="track-actions">
          <a href="/complaint" className="btn-primary">File New Complaint</a>
        </div>
      </div>
    </section>
  );
};

export default Track;

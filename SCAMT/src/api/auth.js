// src/api/auth.js
import axios from 'axios';

const API_URL = "https://msd-project-backend.onrender.com/api/auth";

export const registerUser = async (formData) => {
  const res = await axios.post(`${API_URL}/register`, formData);
  return res.data; // returns { token, user }
};

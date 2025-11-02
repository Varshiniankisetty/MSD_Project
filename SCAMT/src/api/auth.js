// src/api/auth.js
import axios from 'axios';

const API_URL = "http://localhost:5000/api/auth";

export const registerUser = async (formData) => {
  const res = await axios.post(`${API_URL}/register`, formData);
  return res.data; // returns { token, user }
};

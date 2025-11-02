import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validateLoginForm } from "../utils/validationUtils";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    role: "",
    community: "",
    emailOrPhone: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the path the user was trying to access before being redirected to login
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const validation = validateLoginForm(formData);
  if (!validation.isValid) {
    setErrors(validation.errors);
    return;
  }

  setIsSubmitting(true);
  setErrors({});

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emailOrPhone: formData.emailOrPhone,
        password: formData.password
      })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.msg || "Login failed");

    localStorage.setItem("authToken", data.token);
    localStorage.setItem("userData", JSON.stringify(data.user));

    // Update AuthContext state
    login(data.token, data.user);

    alert("Logged in successfully!");
    navigate("/services"); // Redirect to services
  } catch (error) {
    setErrors({ general: error.message });
  } finally {
    setIsSubmitting(false);
  }
};


  const handleInputFocus = (fieldName) => {
    // Clear any existing error when user focuses on a field
    if (errors[fieldName]) {
      setErrors({
        ...errors,
        [fieldName]: ""
      });
    }
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <h2>Login to Your Account</h2>
        <p className="login-message">Please login to access our services</p>

        {errors.general && (
          <div className="error-message">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="input-group">
            <label>Select Role *</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              onFocus={() => handleInputFocus('role')}
              className={errors.role ? 'error' : ''}
              required
            >
              <option value="">-- Choose Role --</option>
              <option value="resident">Resident</option>
              <option value="worker">Maintenance Worker</option>
              <option value="security">Security/Staff</option>
              <option value="admin">Apartment Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
            {errors.role && <span className="field-error">{errors.role}</span>}
          </div>

          <div className="input-group">
            <label>Apartment/Community Name *</label>
            <input
              type="text"
              name="community"
              value={formData.community}
              onChange={handleChange}
              onFocus={() => handleInputFocus('community')}
              className={errors.community ? 'error' : ''}
              placeholder="Enter your community name"
              required
            />
            {errors.community && <span className="field-error">{errors.community}</span>}
          </div>

          <div className="input-group">
            <label>Email or Phone *</label>
            <input
              type="text"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleChange}
              onFocus={() => handleInputFocus('emailOrPhone')}
              className={errors.emailOrPhone ? 'error' : ''}
              placeholder="Enter your email or phone number"
              required
            />
            {errors.emailOrPhone && <span className="field-error">{errors.emailOrPhone}</span>}
          </div>

          <div className="input-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => handleInputFocus('password')}
              className={errors.password ? 'error' : ''}
              placeholder="Enter your password"
              required
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <button
            type="submit"
            className="btn-login"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="signup-prompt">
          Don't have an account?{" "}
          <span className="signup-link" onClick={() => navigate('/signup')}>
            Sign up here
          </span>
        </p>
      </div>
    </section>
  );
};

export default Login;
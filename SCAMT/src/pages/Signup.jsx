import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateSignupForm } from "../utils/validationUtils";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    role: "",
    community: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

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

  // Validate form
  const validation = validateSignupForm(formData);
  if (!validation.isValid) {
    setErrors(validation.errors);
    return;
  }

  setIsSubmitting(true);
  setErrors({});

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        role: formData.role,
        community: formData.community,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.msg || "Signup failed");

    // Save token and user in localStorage
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("userData", JSON.stringify(data.user));

    alert("Account created successfully!");
    navigate("/profile"); // Redirect to profile
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <section className="signup-section">
      <div className="signup-container">
        <h2>Create Your Account</h2>
        <p className="signup-message">Join our community and access exclusive services</p>

        {errors.general && (
          <div className="error-message">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="signup-form" noValidate>
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
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => handleInputFocus('name')}
              className={errors.name ? 'error' : ''}
              placeholder="Enter your full name"
              required
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="input-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleInputFocus('email')}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email address"
              required
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onFocus={() => handleInputFocus('phone')}
              className={errors.phone ? 'error' : ''}
              placeholder="Enter your phone number"
              required
            />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </div>

          <div className="input-group">
            <label>Password *</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => handleInputFocus('password')}
                className={errors.password ? 'error' : ''}
                placeholder="Create a strong password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && <span className="field-error">{errors.password}</span>}
            <small className="password-hint">
              Password must contain at least 8 characters with uppercase, lowercase, number, and special character
            </small>
          </div>

          <div className="input-group">
            <label>Confirm Password *</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={() => handleInputFocus('confirmPassword')}
                className={errors.confirmPassword ? 'error' : ''}
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={toggleConfirmPasswordVisibility}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
          </div>

          <button
            type="submit"
            className="btn-signup"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="login-prompt">
          Already have an account?{" "}
          <span className="login-link" onClick={() => navigate('/login')}>
            Login here
          </span>
        </p>
      </div>
    </section>
  );
};

export default Signup;

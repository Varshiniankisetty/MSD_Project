// Validation utility functions

// Email validation
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return { isValid: false, message: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }

  if (email.length > 254) {
    return { isValid: false, message: 'Email address is too long' };
  }

  return { isValid: true, message: '' };
};

// Password validation
export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return { isValid: false, message: 'Password is required' };
  }

  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }

  if (password.length > 128) {
    return { isValid: false, message: 'Password is too long' };
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }

  // Check for at least one number
  if (!/\d/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }

  // Check for at least one special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one special character' };
  }

  return { isValid: true, message: '' };
};

// Confirm password validation
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword || typeof confirmPassword !== 'string') {
    return { isValid: false, message: 'Please confirm your password' };
  }

  if (password !== confirmPassword) {
    return { isValid: false, message: 'Passwords do not match' };
  }

  return { isValid: true, message: '' };
};

// Phone number validation (optional, for login page)
export const validatePhoneNumber = (phoneNumber) => {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return { isValid: false, message: 'Phone number is required' };
  }

  // Remove all non-digit characters for validation
  const digitsOnly = phoneNumber.replace(/\D/g, '');

  // Basic phone number validation - should be 10-15 digits
  if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    return { isValid: false, message: 'Please enter a valid phone number' };
  }

  return { isValid: true, message: '' };
};

// Name validation (for signup)
export const validateName = (name) => {
  if (!name || typeof name !== 'string') {
    return { isValid: false, message: 'Name is required' };
  }

  const trimmedName = name.trim();

  if (trimmedName.length < 2) {
    return { isValid: false, message: 'Name must be at least 2 characters long' };
  }

  if (trimmedName.length > 50) {
    return { isValid: false, message: 'Name is too long' };
  }

  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  if (!/^[a-zA-Z\s\-']+$/.test(trimmedName)) {
    return { isValid: false, message: 'Name can only contain letters, spaces, hyphens, and apostrophes' };
  }

  return { isValid: true, message: '' };
};

// Role validation
export const validateRole = (role) => {
  if (!role || typeof role !== 'string') {
    return { isValid: false, message: 'Please select a role' };
  }

  const validRoles = ['resident', 'worker', 'security', 'admin', 'superadmin'];
  if (!validRoles.includes(role)) {
    return { isValid: false, message: 'Please select a valid role' };
  }

  return { isValid: true, message: '' };
};

// Community validation
export const validateCommunity = (community) => {
  if (!community || typeof community !== 'string') {
    return { isValid: false, message: 'Community name is required' };
  }

  const trimmedCommunity = community.trim();

  if (trimmedCommunity.length < 2) {
    return { isValid: false, message: 'Community name must be at least 2 characters long' };
  }

  if (trimmedCommunity.length > 100) {
    return { isValid: false, message: 'Community name is too long' };
  }

  return { isValid: true, message: '' };
};

// Comprehensive form validation
export const validateLoginForm = (formData) => {
  const errors = {};

  // Validate email or phone
  if (formData.emailOrPhone) {
    // Check if it's an email or phone number
    if (formData.emailOrPhone.includes('@')) {
      const emailValidation = validateEmail(formData.emailOrPhone);
      if (!emailValidation.isValid) {
        errors.emailOrPhone = emailValidation.message;
      }
    } else {
      const phoneValidation = validatePhoneNumber(formData.emailOrPhone);
      if (!phoneValidation.isValid) {
        errors.emailOrPhone = phoneValidation.message;
      }
    }
  } else {
    errors.emailOrPhone = 'Email or phone number is required';
  }

  // Validate password
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.message;
  }

  // Validate role
  const roleValidation = validateRole(formData.role);
  if (!roleValidation.isValid) {
    errors.role = roleValidation.message;
  }

  // Validate community
  const communityValidation = validateCommunity(formData.community);
  if (!communityValidation.isValid) {
    errors.community = communityValidation.message;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateSignupForm = (formData) => {
  const errors = {};

  // Validate role
  const roleValidation = validateRole(formData.role);
  if (!roleValidation.isValid) {
    errors.role = roleValidation.message;
  }

  // Validate community
  const communityValidation = validateCommunity(formData.community);
  if (!communityValidation.isValid) {
    errors.community = communityValidation.message;
  }

  // Validate name
  const nameValidation = validateName(formData.name);
  if (!nameValidation.isValid) {
    errors.name = nameValidation.message;
  }

  // Validate email
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.message;
  }

  // Validate phone
  const phoneValidation = validatePhoneNumber(formData.phone);
  if (!phoneValidation.isValid) {
    errors.phone = phoneValidation.message;
  }

  // Validate password
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.message;
  }

  // Validate confirm password
  const confirmPasswordValidation = validateConfirmPassword(formData.password, formData.confirmPassword);
  if (!confirmPasswordValidation.isValid) {
    errors.confirmPassword = confirmPasswordValidation.message;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

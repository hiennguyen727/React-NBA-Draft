import React, { useState } from "react";

const RegisterForm = ({ onRegistrationSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here, you can implement the registration logic using your API or backend.
    // Upon successful registration, you can call the onRegistrationSuccess callback.
    // Example: make an API call to register the user and call onRegistrationSuccess if successful.

    // For demonstration purposes, we'll simulate a successful registration after a short delay.
    setTimeout(() => {
      onRegistrationSuccess();
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;

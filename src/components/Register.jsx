import React, { useState } from 'react';
import { useUser } from './Usercontext';

const Register = () => {
  const { register, isRegistered } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (username && password) {
      // Call the register function from the context with the custom username and password
      register(username, password);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {isRegistered && <p>Register Success!</p>}
    </div>
  );
};

export default Register;

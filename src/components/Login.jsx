import React, { useState } from 'react';
import { useUser } from './Usercontext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isRegistered } = useUser();

  const handleLogin = () => {
    if (username && password) {
      // Call the login function from the context with the registered username and password.
      login(username, password);
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {isRegistered && <p>Register Success!</p>}
    </div>
  );
};

export default Login;

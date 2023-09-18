import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const url = 'http://localhost:3001/api';

export const useLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      const response = await fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/dashboard', { replace: true });
      }
      throw new Error(data.message);
    } catch (error) {
      return {};
    }
  };

  return { username, password, setUsername, setPassword, signIn };
};
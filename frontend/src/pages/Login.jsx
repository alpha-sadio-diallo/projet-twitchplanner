import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch {
      alert('Identifiants invalides');
    }
  };

  return (
    <form onSubmit={handleLogin} className="auth-form">
  <h2>Se connecter</h2>

  <div className="form-group">
    <label>Email</label>
    <input
      type="email"
      placeholder="Entrez votre email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </div>

  <div className="form-group">
    <label>Mot de passe</label>
    <input
      type="password"
      placeholder="Entrez votre mot de passe"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
  </div>

  <button type="submit">Se connecter</button>
</form>
  );
}

export default Login;
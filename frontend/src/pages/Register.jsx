import { useState } from 'react';
import api from '../services/api';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // ⚠️ OBLIGATOIRE

    try {
      await api.post('/register', { email, password });
      alert('Compte créé');
    } catch (error) {
      console.log(error);
      alert('Erreur inscription');
    }
  };

  return (
    <form onSubmit={handleSubmit}> {/* ⚠️ OBLIGATOIRE */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
      />

      <button type="submit">S'inscrire</button> {/* ⚠️ type submit */}
    </form>
  );
}

export default Register;
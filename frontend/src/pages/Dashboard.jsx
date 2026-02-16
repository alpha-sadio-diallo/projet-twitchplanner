import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

function Dashboard() {
  const [plannings, setPlannings] = useState([]);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlannings();
  }, []);

  const fetchPlannings = async () => {
    try {
      const res = await api.get('/plannings');
      setPlannings(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createPlanning = async (e) => {
    e.preventDefault();

    try {
      await api.post('/plannings', {
        name,
        start_date: '2026-02-09',
        end_date: '2026-02-15'
      });

      setName('');
      fetchPlannings();
    } catch (error) {
      console.error(error);
    }
  };

  const deletePlanning = async (id) => {
    try {
      await api.delete(`/plannings/${id}`);
      fetchPlannings();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Mes Plannings</h1>

      <form onSubmit={createPlanning} className="create-form">
  <input
    type="text"
    placeholder="Nom du planning"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
  <button type="submit" className="btn btn-create">
    Créer
  </button>
</form>

      <div className="planning-container">
  {plannings.map((planning) => (
    <div className="planning-card" key={planning.id}>
      
      <span className="planning-name">
        {planning.name}
      </span>

      <div className="planning-actions">
        
        <Link 
          to={`/planning/${planning.id}`} 
          className="btn btn-view"
        >
          Voir
        </Link>

        <button
          className="btn btn-delete"
          onClick={() => deletePlanning(planning.id)}
        >
          Supprimer
        </button>

      </div>

    </div>
    ))}
  </div>
    </div>
  );
}

export default Dashboard;
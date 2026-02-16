import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-600 to-indigo-700 text-white text-center px-4">

      <h1 className="text-5xl font-bold mb-6">
        🎮 TwitchPlanner
      </h1>

      <p className="text-xl mb-8 max-w-xl">
        Crée et partage ton planning de stream facilement.
        Organise tes sessions, ajoute tes jeux et exporte ton planning en image.
      </p>

      <div className="flex gap-4">
        <Link
          to="/register"
          className="bg-white text-purple-700 px-6 py-3 rounded font-semibold"
        >
          Créer un compte
        </Link>

        <Link
          to="/login"
          className="border border-white px-6 py-3 rounded font-semibold"
        >
          Se connecter
        </Link>
      </div>

    </div>
  );
}

export default Home;
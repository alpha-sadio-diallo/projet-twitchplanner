import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import html2canvas from "html2canvas";

function Planning() {
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    game_name: "",
    stream_title: "",
    day_of_week: 1,
    start_time: "",
    end_time: "",
  });

  const planningRef = useRef();

  const days = [
    { id: 1, name: "Lundi" },
    { id: 2, name: "Mardi" },
    { id: 3, name: "Mercredi" },
    { id: 4, name: "Jeudi" },
    { id: 5, name: "Vendredi" },
    { id: 6, name: "Samedi" },
    { id: 7, name: "Dimanche" },
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      ////////////
      const res = await api.get(`/plannings/${id}/events`);
      setEvents(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const searchGameImage = async (gameName) => {
    try {
      const response = await fetch(
      `https://api.rawg.io/api/games?key=YOUR_RAWG_KEY&search=${gameName}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].background_image;
      }
      return "";
    } catch {
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const image = await searchGameImage(form.game_name);

      await api.post("/events", {
        ...form,
        planning_id: id,
        game_image: image,
      });

      setForm({
        game_name: "",
        stream_title: "",
        day_of_week: 1,
        start_time: "",
        end_time: "",
      });

      fetchEvents();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await api.delete(`/events/${eventId}`);
      fetchEvents();
    } catch (error) {
      console.error(error);
    }
  };

  const exportPNG = async () => {
    const canvas = await html2canvas(planningRef.current);
    const link = document.createElement("a");
    link.download = "planning.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mon Planning</h1>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Nom du jeu"
          value={form.game_name}
          onChange={(e) => setForm({ ...form, game_name: e.target.value })}
          className="border p-2 w-full"
          required
        />

        <input
          type="text"
          placeholder="Titre du stream"
          value={form.stream_title}
          onChange={(e) => setForm({ ...form, stream_title: e.target.value })}
          className="border p-2 w-full"
          required
        />

        <select
          value={form.day_of_week}
          onChange={(e) =>
            setForm({ ...form, day_of_week: Number(e.target.value) })
          }
          className="border p-2 w-full"
        >
          {days.map((day) => (
            <option key={day.id} value={day.id}>
              {day.name}
            </option>
          ))}
        </select>

        <div className="flex gap-3">
          <input
            type="time"
            value={form.start_time}
            onChange={(e) =>
              setForm({ ...form, start_time: e.target.value })
            }
            className="border p-2 w-full"
            required
          />
          <input
            type="time"
            value={form.end_time}
            onChange={(e) =>
              setForm({ ...form, end_time: e.target.value })
            }
            className="border p-2 w-full"
            required
          />
        </div>

        <button className="bg-purple-600 text-white px-4 py-2 rounded">
          Ajouter
        </button>
      </form>

      <button
        onClick={exportPNG}
        className="bg-green-600 text-white px-4 py-2 rounded mb-6"
      >
        Exporter en PNG
      </button>

      {/* Planning affichage */}
      <div ref={planningRef} className="bg-white p-4 shadow">
        {days.map((day) => (
          <div key={day.id} className="mb-6">
            <h2 className="font-semibold text-lg">{day.name}</h2>

            {events
              .filter((event) => event.day_of_week == day.id)
              .map((event) => (
                <div
                  key={event.id}
                  className="border p-3 mt-2 flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold">{event.stream_title}</p>
                    <p>{event.game_name}</p>
                    <p>
                      {event.start_time} - {event.end_time}
                    </p>
                  </div>

                  {event.game_image && (
                    <img
                      src={event.game_image}
                      alt={event.game_name}
                      className="w-16 h-16 object-cover"
                    />
                  )}

                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Planning;
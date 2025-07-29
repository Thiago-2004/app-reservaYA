// src/CalendarioAdmin.jsx
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "./constants/api";

function CalendarioAdmin({ token }) {
  const [eventos, setEventos] = useState([]);

  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    obtenerReservas();
  }, []);

  const obtenerReservas = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/reservas`, headers);
      const reservasActivas = res.data.filter((r) => !r.cancelada);

      const eventosFormateados = reservasActivas.map((r) => {
        const [h, m] = r.hora.split(":").map(Number);
        const duracionHoras = parseFloat(r.duracion);
        const inicio = new Date(`${r.fecha}T${r.hora}`);
        const fin = new Date(inicio);
        fin.setMinutes(fin.getMinutes() + duracionHoras * 60);

        return {
          title: `${r.nombre} - Cancha ${r.cancha}`,
          start: inicio,
          end: fin,
          backgroundColor: r.cancha === 1 ? "#2563eb" : "#16a34a", // azul / verde
          textColor: "#fff",
          borderColor: r.cancelada ? "#f87171" : undefined, // rojo si cancelada
        };
      });

      setEventos(eventosFormateados);
    } catch (err) {
      console.error("Error al cargar calendario", err);
    }
  };

  return (
    <div className="bg-white p-4 mt-8 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Calendario de Reservas</h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        slotMinTime="08:00:00"
        slotMaxTime="24:00:00"
        events={eventos}
        locale="es"
        height="auto"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        allDaySlot={false}
      />
    </div>
  );
}

export default CalendarioAdmin;

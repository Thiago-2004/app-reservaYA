// import FullCalendar from '@fullcalendar/react';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { API_URL } from './constants/api';

// function obtenerUsuarioDesdeToken(token) {
//   if (!token) return null;
//   try {
//     const payloadBase64 = token.split('.')[1];
//     const payload = JSON.parse(atob(payloadBase64));
//     return payload;
//   } catch {
//     return null;
//   }
// }

// const Calendario = ({ token }) => {
//   const [eventos, setEventos] = useState([]);
//   const [vista, setVista] = useState("timeGridWeek");
//   const usuario = obtenerUsuarioDesdeToken(token);

//   useEffect(() => {
//     if (token && usuario) obtenerEventos();

//     const handleResize = () => {
//       setVista(window.innerWidth < 640 ? "timeGridDay" : "timeGridWeek");
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [token]);

//   const obtenerEventos = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/reservas`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const eventosTransformados = res.data
//         .filter((r) => !r.cancelada && r.email === usuario.email)
//         .map((r) => {
//           const horaFin = calcularHoraFin(r.hora, r.duracion);
//           return {
//             id: r.id,
//             title: `Cancha ${r.cancha} - ${r.nombre}`,
//             start: `${r.fecha}T${r.hora}`,
//             end: `${r.fecha}T${horaFin}`,
//             extendedProps: r,
//           };
//         });

//       setEventos(eventosTransformados);
//     } catch (error) {
//       console.error("❌ Error al obtener reservas:", error);
//     }
//   };

//   const calcularHoraFin = (horaInicio, duracion) => {
//     const [h, m] = horaInicio.split(":").map(Number);
//     const minutos = duracion === "1h" ? 60 : duracion === "1.5h" ? 90 : 120;
//     const endDate = new Date(0, 0, 0, h, m + minutos);
//     return endDate.toTimeString().slice(0, 5);
//   };

//   const cancelarReserva = async (id) => {
//     try {
//       const res = await axios.post(`${API_URL}/cancelar`, { id }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.data.success) {
//         alert("✅ Reserva cancelada con éxito");
//         obtenerEventos();
//       } else {
//         alert("❌ Error al cancelar: " + res.data.error);
//       }
//     } catch (error) {
//       alert("⚠️ No se pudo conectar con el servidor");
//     }
//   };

//   const confirmarYCancelar = (id) => {
//     if (window.confirm("¿Cancelar esta reserva?")) {
//       cancelarReserva(id);
//     }
//   };

//   if (!token || !usuario) return null;

//   return (
//     <div className="w-full mt-10 bg-white p-4 rounded-2xl shadow-xl">
//       <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4 text-center sm:text-left">
//         Mis Reservas en Calendario
//       </h2>

//       <div className="overflow-x-auto">
//         <FullCalendar
//           plugins={[timeGridPlugin, interactionPlugin]}
//           initialView={vista}
//           events={eventos}
//           slotMinTime="10:00:00"
//           slotMaxTime="23:00:00"
//           allDaySlot={false}
//           locale="es"
//           height="auto"
//           eventClick={(info) => confirmarYCancelar(info.event.id)}
//         />
//       </div>
//     </div>
//   );
// };

// export default Calendario;
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from './constants/api';

function obtenerUsuarioDesdeToken(token) {
  if (!token) return null;
  try {
    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
    return payload;
  } catch {
    return null;
  }
}

const Calendario = ({ token }) => {
  const [eventos, setEventos] = useState([]);
  const [vista, setVista] = useState("timeGridWeek");
  const usuario = obtenerUsuarioDesdeToken(token);

  useEffect(() => {
    if (token && usuario) obtenerEventos();

    const handleResize = () => {
      setVista(window.innerWidth < 640 ? "timeGridDay" : "timeGridWeek");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [token]);

  const obtenerEventos = async () => {
    try {
      const res = await axios.get(`${API_URL}/reservas`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const eventosTransformados = res.data
        .filter((r) => !r.cancelada) // ✅ Mostrar todas, no solo las del usuario
        .map((r) => {
          const horaFin = calcularHoraFin(r.hora, r.duracion);
          return {
            id: r.id,
            title: `Cancha ${r.cancha} - ${r.nombre}`,
            start: `${r.fecha}T${r.hora}`,
            end: `${r.fecha}T${horaFin}`,
            extendedProps: r,
          };
        });

      setEventos(eventosTransformados);
    } catch (error) {
      console.error("❌ Error al obtener reservas:", error);
    }
  };

  const calcularHoraFin = (horaInicio, duracion) => {
    const [h, m] = horaInicio.split(":").map(Number);
    const minutos = duracion === "1h" ? 60 : duracion === "1.5h" ? 90 : 120;
    const endDate = new Date(0, 0, 0, h, m + minutos);
    return endDate.toTimeString().slice(0, 5);
  };

  const cancelarReserva = async (id) => {
    try {
      const res = await axios.post(`${API_URL}/cancelar`, { id }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        alert("✅ Reserva cancelada con éxito");
        obtenerEventos();
      } else {
        alert("❌ Error al cancelar: " + res.data.error);
      }
    } catch (error) {
      alert("⚠️ No se pudo conectar con el servidor");
    }
  };

  const confirmarYCancelar = (id) => {
    if (window.confirm("¿Cancelar esta reserva?")) {
      cancelarReserva(id);
    }
  };

  if (!token || !usuario) return null;

  return (
    <div className="w-full mt-10 bg-white p-4 rounded-2xl shadow-xl">
      <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4 text-center sm:text-left">
        Mis Reservas en Calendario
      </h2>

      <div className="overflow-x-auto">
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView={vista}
          events={eventos}
          slotMinTime="10:00:00"
          slotMaxTime="23:00:00"
          allDaySlot={false}
          locale="es"
          height="auto"
          eventClick={(info) => confirmarYCancelar(info.event.id)}
        />
      </div>
    </div>
  );
};

export default Calendario;

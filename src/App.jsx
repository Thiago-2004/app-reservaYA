// import { useState, useEffect } from "react"; 
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import axios from "axios";
// import Login from "./Login";
// import Recuperar from "./Recuperar";
// import Restablecer from "./Restablecer";
// import Calendario from "./Calendario";
// import AdminPanel from "./AdminPanel";
// import InfoCancha from "./InfoCancha";
// import PerfilPredio from "./PerfilPredio";


// function obtenerUsuarioDesdeToken(token) {
//   if (!token) return null;
//   try {
//     const payloadBase64 = token.split(".")[1];
//     const payload = JSON.parse(atob(payloadBase64));
//     return payload;
//   } catch {
//     return null;
//   }
// }

// function AppInterna() {
//   const [nombre, setNombre] = useState("");
//   const [email, setEmail] = useState("");
//   const [fecha, setFecha] = useState("");
//   const [hora, setHora] = useState("");
//   const [duracion, setDuracion] = useState("1h");
//   const [cancha, setCancha] = useState(1);
//   const [reservas, setReservas] = useState([]);
//   const [error, setError] = useState("");
//   const [mensaje, setMensaje] = useState("");
//   const [vista, setVista] = useState("reservas");

//   const token = localStorage.getItem("token");
//   const usuario = obtenerUsuarioDesdeToken(token);

//   const headers = {
//     headers: { Authorization: `Bearer ${token}` },
//   };

//   const obtenerReservas = async () => {
//     try {
//       const res = await axios.get("http://192.168.1.57:4001/reservas", headers);
//       const propias = res.data.filter((r) => r.email === usuario?.email);
//       setReservas(propias);
//     } catch (err) {
//       console.error("Error al obtener reservas", err);
//     }
//   };

//   const cancelar = async (id) => {
//     await axios.post("http://192.168.1.57:4001/cancelar", { id }, headers);
//     obtenerReservas();
//   };

//   const redirigirAPago = async () => {
//     try {
//       setError("");
//       setMensaje("");

//       if (!nombre || !email || !fecha || !hora || !duracion || !cancha) {
//         setError("Todos los campos son obligatorios.");
//         return;
//       }

//       const res = await axios.post("http://192.168.1.57:4001/crear", {
//         nombre,
//         email,
//         fecha,
//         hora,
//         duracion,
//         cancha,
//       }, headers);

//       if (res.data.success) {
//         setMensaje("Reserva realizada con éxito");
//         obtenerReservas();

//         alert("Transferí la seña de $10.000 al alias: ateneo.calzada.\n\nTenés 1 hora para enviar el comprobante por WhatsApp. El administrador debe confirmar la seña o la reserva podría cancelarse.");

//         const mensajeWA = `Hola! Quiero confirmar mi reserva de pádel:\n\nNombre: ${nombre}\nFecha: ${fecha}\nHora: ${hora}\nDuración: ${duracion}\nCancha: ${cancha}`;
//         const numeroWA = "5491144142957";
//         const linkWA = `https://wa.me/${numeroWA}?text=${encodeURIComponent(mensajeWA)}`;

//         window.open(linkWA, "_blank");
//       } else {
//         setError("No se pudo guardar la reserva.");
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || "Ocurrió un error al guardar la reserva.");
//     }
//   };

//   useEffect(() => {
//     if (token && usuario?.rol !== "admin") obtenerReservas();
//   }, [token]);

//   if (!token || !usuario) return <Login />;
//   if (usuario.rol === "admin") return <AdminPanel />;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center justify-start p-4 sm:p-6">
//       <div className="flex justify-between items-center w-full max-w-md mb-4 px-2">
//         <span className="text-sm text-gray-700">
//           Bienvenido, <strong>{usuario.nombre || usuario.usuario}</strong>
//           {usuario.rol === "admin" && (
//             <span className="ml-2 text-xs bg-yellow-400 text-black px-2 py-1 rounded">
//               🛡️ ADMIN
//             </span>
//           )}
//         </span>
//         <button
//           className="text-sm text-blue-600 font-semibold underline"
//           onClick={() => {
//             localStorage.removeItem("token");
//             window.location.reload();
//           }}
//         >
//           Cerrar sesión
//         </button>
//       </div>

//       <div className="flex space-x-4 mb-6">
//         <button
//           className={`px-4 py-2 rounded-xl font-semibold ${
//             vista === "reservas"
//               ? "bg-blue-600 text-white"
//               : "bg-white text-blue-700"
//           }`}
//           onClick={() => setVista("reservas")}
//         >
//           Reservas
//         </button>
//         <button
//           className={`px-4 py-2 rounded-xl font-semibold ${
//             vista === "info"
//               ? "bg-blue-600 text-white"
//               : "bg-white text-blue-700"
//           }`}
//           onClick={() => setVista("info")}
//         >
//           Información
//         </button>
//       </div>

//       {vista === "reservas" ? (
//         <>
//           <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md">
//             <div className="flex flex-col items-center mb-4 sm:mb-6">
//               <img
//                 src="logo2.png"
//                 alt="Padel Ateneo"
//                 className="w-24 h-24 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-xl mb-4"
//               />
//               <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-700">
//                 ReservaYA
//               </h1>
//               <p className="text-gray-600 text-sm mt-1 text-center">
//                 Reservá tu turno y asegurá tu lugar en la cancha
//               </p>
//             </div>

//             <div className="space-y-3 sm:space-y-4">
//               {error && (
//                 <div className="bg-red-100 text-red-700 p-2 rounded-xl text-sm text-center">
//                   {error}
//                 </div>
//               )}
//               {mensaje && (
//                 <div className="bg-green-100 text-green-700 p-2 rounded-xl text-sm text-center">
//                   {mensaje}
//                 </div>
//               )}
//               <input className="w-full p-3 border rounded-xl" type="text" placeholder="Nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} />
//               <input className="w-full p-3 border rounded-xl" type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
//               <input className="w-full p-3 border rounded-xl" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
//               <input className="w-full p-3 border rounded-xl" type="time" value={hora} onChange={(e) => setHora(e.target.value)} />
//               <select className="w-full p-3 border rounded-xl" value={duracion} onChange={(e) => setDuracion(e.target.value)}>
//                 <option value="1h">1 hora</option>
//                 <option value="1.5h">1 hora y media</option>
//                 <option value="2h">2 horas</option>
//               </select>
//               <select className="w-full p-3 border rounded-xl" value={cancha} onChange={(e) => setCancha(parseInt(e.target.value))}>
//                 <option value={1}>Cancha 1</option>
//                 <option value={2}>Cancha 2</option>
//               </select>
//               <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold" onClick={redirigirAPago}>
//                 Reservar y pagar seña
//               </button>
//             </div>
//           </div>

//           <div className="bg-white mt-6 p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-md">
//             <h2 className="text-xl font-bold text-blue-700 mb-4">Reservas Activas</h2>
//             <ul className="space-y-2">
//               {reservas.map((r) => (
//                 <li key={r.id} className="border rounded-xl p-3 flex justify-between items-center text-sm sm:text-base">
//                   <div>
//                     <p className="font-semibold">{r.nombre}</p>
//                     <p className="text-gray-600">{r.fecha} - {r.hora} ({r.duracion}) - Cancha {r.cancha}</p>
//                   </div>
//                   {!r.cancelada && (
//                     <button className="text-red-600 font-semibold" onClick={() => cancelar(r.id)}>Cancelar</button>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="bg-white mt-6 p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-5xl overflow-x-auto">
//             <h2 className="text-xl font-bold text-blue-700 mb-4">Calendario de Reservas</h2>
//             <Calendario token={token} mostrarTodas={true} />
//           </div>
//         </>
//       ) : (
//         <InfoCancha />
//       )}
//     </div>
//   );
// }

// function App() {
//  return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" replace />} />
//         <Route path="/predio" element={<PerfilPredio />} />
//         <Route path="/recuperar" element={<Recuperar />} />
//         <Route path="/restablecer/:token" element={<Restablecer />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/calendario" element={<AppInterna />} /> {/* si usás una ruta protegida */}
//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Login from "./Login";
import Recuperar from "./Recuperar";
import Restablecer from "./Restablecer";
import Calendario from "./Calendario";
import AdminPanel from "./AdminPanel";
import InfoCancha from "./InfoCancha";
import PerfilPredio from "./PerfilPredio";

function obtenerUsuarioDesdeToken(token) {
  if (!token) return null;
  try {
    const payloadBase64 = token.split(".")[1];
    const payload = JSON.parse(atob(payloadBase64));
    return payload;
  } catch {
    return null;
  }
}

function AppInterna() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [duracion, setDuracion] = useState("1h");
  const [cancha, setCancha] = useState(1);
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [vista, setVista] = useState("reservas");

  const token = localStorage.getItem("token");
  const usuario = obtenerUsuarioDesdeToken(token);

  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const obtenerReservas = async () => {
    try {
      const res = await axios.get("http://192.168.1.57:4001/reservas", headers);
      const propias = res.data.filter((r) => r.email === usuario?.email);
      setReservas(propias);
    } catch (err) {
      console.error("Error al obtener reservas", err);
    }
  };

  const cancelar = async (id) => {
    await axios.post("http://192.168.1.57:4001/cancelar", { id }, headers);
    obtenerReservas();
  };

  const redirigirAPago = async () => {
    try {
      setError("");
      setMensaje("");

      if (!nombre || !email || !fecha || !hora || !duracion || !cancha) {
        setError("Todos los campos son obligatorios.");
        return;
      }

      const res = await axios.post("http://192.168.1.57:4001/crear", {
        nombre,
        email,
        fecha,
        hora,
        duracion,
        cancha,
      }, headers);

      if (res.data.success) {
        setMensaje("Reserva realizada con éxito");
        obtenerReservas();

        alert("Transferí la seña de $10.000 al alias: ateneo.calzada.\n\nTenés 1 hora para enviar el comprobante por WhatsApp. El administrador debe confirmar la seña o la reserva podría cancelarse.");

        const mensajeWA = `Hola! Quiero confirmar mi reserva de pádel:\n\nNombre: ${nombre}\nFecha: ${fecha}\nHora: ${hora}\nDuración: ${duracion}\nCancha: ${cancha}`;
        const numeroWA = "5491144142957";
        const linkWA = `https://wa.me/${numeroWA}?text=${encodeURIComponent(mensajeWA)}`;

        window.open(linkWA, "_blank");
      } else {
        setError("No se pudo guardar la reserva.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Ocurrió un error al guardar la reserva.");
    }
  };

  useEffect(() => {
    if (token && usuario?.rol !== "admin") obtenerReservas();
  }, [token]);

  if (!token || !usuario) return <Login />;
  if (usuario.rol === "admin") return <AdminPanel />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center justify-start p-4 sm:p-6">
      <div className="flex justify-between items-center w-full max-w-md mb-4 px-2">
        <span className="text-sm text-gray-700">
          Bienvenido, <strong>{usuario.nombre || usuario.usuario}</strong>
          {usuario.rol === "admin" && (
            <span className="ml-2 text-xs bg-yellow-400 text-black px-2 py-1 rounded">
              🛡️ ADMIN
            </span>
          )}
        </span>
        <button
          className="text-sm text-blue-600 font-semibold underline"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
        >
          Cerrar sesión
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-xl font-semibold ${vista === "reservas" ? "bg-blue-600 text-white" : "bg-white text-blue-700"}`}
          onClick={() => setVista("reservas")}
        >
          Reservas
        </button>
        <button
          className={`px-4 py-2 rounded-xl font-semibold ${vista === "info" ? "bg-blue-600 text-white" : "bg-white text-blue-700"}`}
          onClick={() => setVista("info")}
        >
          Información
        </button>
      </div>

      {vista === "reservas" ? (
        <>
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md">
            <div className="flex flex-col items-center mb-4 sm:mb-6">
              <img src="logo2.png" alt="Padel Ateneo" className="w-24 h-24 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-xl mb-4" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-700">ReservaYA</h1>
              <p className="text-gray-600 text-sm mt-1 text-center">Reservá tu turno y asegurá tu lugar en la cancha</p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {error && <div className="bg-red-100 text-red-700 p-2 rounded-xl text-sm text-center">{error}</div>}
              {mensaje && <div className="bg-green-100 text-green-700 p-2 rounded-xl text-sm text-center">{mensaje}</div>}
              <input className="w-full p-3 border rounded-xl" type="text" placeholder="Nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} />
              <input className="w-full p-3 border rounded-xl" type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className="w-full p-3 border rounded-xl" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
              <input className="w-full p-3 border rounded-xl" type="time" value={hora} onChange={(e) => setHora(e.target.value)} />
              <select className="w-full p-3 border rounded-xl" value={duracion} onChange={(e) => setDuracion(e.target.value)}>
                <option value="1h">1 hora</option>
                <option value="1.5h">1 hora y media</option>
                <option value="2h">2 horas</option>
              </select>
              <select className="w-full p-3 border rounded-xl" value={cancha} onChange={(e) => setCancha(parseInt(e.target.value))}>
                <option value={1}>Cancha 1</option>
                <option value={2}>Cancha 2</option>
              </select>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold" onClick={redirigirAPago}>
                Reservar y pagar seña
              </button>
            </div>
          </div>

          <div className="bg-white mt-6 p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold text-blue-700 mb-4">Reservas Activas</h2>
            <ul className="space-y-2">
              {reservas.map((r) => (
                <li key={r.id} className="border rounded-xl p-3 flex justify-between items-center text-sm sm:text-base">
                  <div>
                    <p className="font-semibold">{r.nombre}</p>
                    <p className="text-gray-600">{r.fecha} - {r.hora} ({r.duracion}) - Cancha {r.cancha}</p>
                  </div>
                  {!r.cancelada && (
                    <button className="text-red-600 font-semibold" onClick={() => cancelar(r.id)}>Cancelar</button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white mt-6 p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-5xl overflow-x-auto">
            <h2 className="text-xl font-bold text-blue-700 mb-4">Calendario de Reservas</h2>
            <Calendario token={token} mostrarTodas={true} />
          </div>
        </>
      ) : (
        <InfoCancha />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/predio" element={<PerfilPredio />} />
        <Route path="/recuperar" element={<Recuperar />} />
        <Route path="/restablecer/:token" element={<Restablecer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/calendario" element={<AppInterna />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

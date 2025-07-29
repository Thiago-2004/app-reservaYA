// src/AdminPanel.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./constants/api";
import CalendarioAdmin from "./CalendarioAdmin";

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

function AdminPanel() {
  const [reservas, setReservas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [duracion, setDuracion] = useState("1h");
  const [cancha, setCancha] = useState(1);
  const [recurrente, setRecurrente] = useState(false);

  const token = localStorage.getItem("token");
  const usuario = obtenerUsuarioDesdeToken(token);

  const headers = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    if (token) {
      obtenerReservas();
      obtenerUsuarios();
    }
  }, []);

  const obtenerReservas = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/reservas`, headers);
      setReservas(res.data);
    } catch {
      setError("Error al cargar reservas");
    }
  };

  const obtenerUsuarios = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/usuarios`, headers);
      setUsuarios(res.data);
    } catch {
      setError("Error al cargar usuarios");
    }
  };

  const cancelarReserva = async (id) => {
    try {
      await axios.post(`${API_URL}/cancelar`, { id }, headers);
      obtenerReservas();
    } catch {
      setError("No se pudo cancelar la reserva");
    }
  };

  const eliminarReserva = async (id) => {
    const confirmar = confirm("¿Eliminar esta reserva cancelada?");
    if (!confirmar) return;
    try {
      await axios.delete(`${API_URL}/admin/reservas/${id}`, headers);
      obtenerReservas();
    } catch {
      alert("❌ No se pudo eliminar");
    }
  };

  const cambiarRol = async (id, nuevoRol) => {
    try {
      await axios.post(`${API_URL}/admin/cambiar-rol`, { id, rol: nuevoRol }, headers);
      obtenerUsuarios();
    } catch {
      setError("No se pudo cambiar el rol");
    }
  };

  const confirmarSenia = async (id) => {
    try {
      await axios.post(`${API_URL}/admin/confirmar-senia`, { id }, headers);
      obtenerReservas();
    } catch {
      setError("No se pudo confirmar la seña");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  if (!token || !usuario || usuario.rol !== "admin") {
    return <div className="p-4 text-red-600">Acceso denegado</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-blue-700">Panel de Administrador</h1>
          <button className="text-sm text-blue-600 underline" onClick={logout}>
            Cerrar sesión
          </button>
        </div>

        <div className="text-gray-600 text-sm mb-6 flex items-center space-x-2">
          <span>
            Bienvenido, <strong>{usuario.nombre || usuario.usuario}</strong> 🛡️
          </span>
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
            rol: {usuario.rol}
          </span>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">{error}</div>
        )}

        <h2 className="text-xl font-bold mb-2">Reservas</h2>
        {reservas.length === 0 ? (
          <p className="text-sm text-gray-500 mb-4">No hay reservas registradas.</p>
        ) : (
          <ul className="mb-6 space-y-2">
            {reservas.map((r) => (
              <li key={r.id} className="border p-3 rounded-xl flex justify-between items-center bg-white">
                <div>
                  <p className="font-semibold">{r.nombre}</p>
                  <p className="text-sm text-gray-600">
                    {r.fecha} {r.hora} - {r.duracion} - Cancha {r.cancha} - {r.cancelada ? "Cancelada" : "Activa"} - Seña: {" "}
                    {r.senia_confirmada ? "✅" : "❌"}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {!r.cancelada && (
                    <>
                      {!r.senia_confirmada && (
                        <button
                          className="text-green-600 font-semibold"
                          onClick={() => confirmarSenia(r.id)}
                        >
                          Confirmar seña
                        </button>
                      )}
                      <button
                        className="text-red-600 font-semibold"
                        onClick={() => cancelarReserva(r.id)}
                      >
                        Cancelar
                      </button>
                    </>
                  )}
                  {r.cancelada && (
                    <button
                      className="text-red-500 font-semibold"
                      onClick={() => eliminarReserva(r.id)}
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        <h2 className="text-xl font-bold mb-2">Usuarios</h2>
        {usuarios.length === 0 ? (
          <p className="text-sm text-gray-500">No hay usuarios registrados.</p>
        ) : (
          <ul className="space-y-2">
            {usuarios
              .filter((u) => u.rol === "admin")
              .map((u) => (
                <li key={u.id} className="border p-3 rounded-xl flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{u.usuario}</p>
                    <p className="text-sm text-gray-600">{u.email} - Rol: {u.rol}</p>
                  </div>
                  <button
                    className="text-blue-600 font-semibold"
                    onClick={() => cambiarRol(u.id, u.rol === "admin" ? "user" : "admin")}
                  >
                    Cambiar a {u.rol === "admin" ? "usuario" : "admin"}
                  </button>
                </li>
            ))}
          </ul>
        )}

        <h2 className="text-xl font-bold mb-2 mt-8">Reservar turno</h2>
        <form
          className="space-y-3 mb-6"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await axios.post(
                `${API_URL}/admin/reservar`,
                { nombre, email, fecha, hora, duracion, cancha, recurrente },
                headers
              );
              alert("✅ Reserva realizada");
              setNombre("");
              setEmail("");
              setFecha("");
              setHora("");
              setDuracion("1h");
              setCancha(1);
              setRecurrente(false);
              obtenerReservas();
            } catch (err) {
              alert("❌ Error al reservar");
            }
          }}
        >
          <input
            type="text"
            placeholder="Nombre"
            className="w-full border rounded p-2"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full border rounded p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="date"
            className="w-full border rounded p-2"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
          <input
            type="time"
            className="w-full border rounded p-2"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />
          <select
            className="w-full border rounded p-2"
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
          >
            <option value="1h">1 hora</option>
            <option value="1.5h">1.5 horas</option>
            <option value="2h">2 horas</option>
          </select>
          <select
            className="w-full border rounded p-2"
            value={cancha}
            onChange={(e) => setCancha(Number(e.target.value))}
          >
            <option value={1}>Cancha 1</option>
            <option value={2}>Cancha 2</option>
          </select>
          <label className="block text-sm">
            <input
              type="checkbox"
              className="mr-2"
              checked={recurrente}
              onChange={(e) => setRecurrente(e.target.checked)}
            />
            Repetir cada semana (fijo)
          </label>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Reservar como admin
          </button>
        </form>

        {/* 🟦 SECCIÓN CALENDARIO */}
        <CalendarioAdmin token={token} />
      </div>
    </div>
  );
}

export default AdminPanel;

import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Restablecer() {
  const { token } = useParams();
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const manejarSubmit = async (e) => {
    e.preventDefault();

    if (!nuevaPassword || nuevaPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      setMensaje("");
      return;
    }

    try {
      const res = await axios.post(`http://192.168.1.57:4001/restablecer/${token}`, {
        nuevaPassword,
      });
      setMensaje(res.data.mensaje || "Contraseña restablecida correctamente.");
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Ocurrió un error al restablecer la contraseña.");
      setMensaje("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Restablecer Contraseña
        </h2>
        <form onSubmit={manejarSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Nueva contraseña"
            className="w-full p-3 border border-gray-300 rounded-xl"
            value={nuevaPassword}
            onChange={(e) => setNuevaPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
          >
            Cambiar contraseña
          </button>
          {mensaje && <p className="text-green-600 text-sm text-center">{mensaje}</p>}
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Restablecer;

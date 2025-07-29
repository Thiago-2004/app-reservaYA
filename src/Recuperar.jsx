import { useState } from "react";
import axios from "axios";

function Recuperar() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const enviarCorreo = async () => {
    if (!email) {
      setError("Por favor ingresá un correo electrónico.");
      return;
    }

    try {
      const res = await axios.post("http://192.168.1.57:4001/recuperar", { email });
      setMensaje(res.data.mensaje || "Revisá tu correo para continuar.");
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Error al enviar el enlace de recuperación.");
      setMensaje("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">Recuperar Contraseña</h2>
        <input
          type="email"
          className="w-full mb-4 p-3 border border-gray-300 rounded-xl"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={enviarCorreo}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700"
        >
          Enviar enlace
        </button>
        {mensaje && <p className="text-green-600 text-sm mt-4 text-center">{mensaje}</p>}
        {error && <p className="text-red-600 text-sm mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default Recuperar;

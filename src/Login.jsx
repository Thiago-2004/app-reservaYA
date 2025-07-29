import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modo, setModo] = useState("login"); // "login", "registro", "recuperar"
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  // Redirigir automáticamente si ya hay token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/calendario");
    }
  }, []);

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    // Validaciones por modo
    if (modo === "registro" && (!usuario || !email || !password)) {
      return setError("Todos los campos son obligatorios.");
    }

    if (modo === "login" && !password) {
      return setError("Debés ingresar tu contraseña.");
    }

    if (modo === "login" && !usuario && !email) {
      return setError("Ingresá usuario o email para iniciar sesión.");
    }

    if (modo === "recuperar" && !email) {
      return setError("Ingresá tu correo electrónico.");
    }

    try {
      if (modo === "registro") {
        await axios.post("http://192.168.1.57:4001/registro", {
          usuario,
          email,
          password,
        });
        alert("Usuario registrado con éxito. Ahora podés iniciar sesión.");
        setModo("login");
      } else if (modo === "login") {
        const res = await axios.post("http://192.168.1.57:4001/login", {
          usuario,
          email,
          password,
        });
        localStorage.setItem("token", res.data.token);
        window.location.href = "/"; // Redirige a la app
      } else if (modo === "recuperar") {
        await axios.post("http://192.168.1.57:4001/recuperar", { email });
        setMensaje("Si el correo está registrado, recibirás un mensaje con instrucciones.");
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Error al procesar la solicitud.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
          {modo === "login" && "Iniciar Sesión"}
          {modo === "registro" && "Registrarse"}
          {modo === "recuperar" && "Recuperar Contraseña"}
        </h2>

        <form onSubmit={manejarSubmit} className="space-y-4">
          {modo !== "recuperar" && (
            <input
              className="w-full p-3 border rounded-xl"
              type="text"
              placeholder="Usuario (opcional)"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          )}

          <input
            className="w-full p-3 border rounded-xl"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={modo !== "login" || !usuario}
          />

          {modo !== "recuperar" && (
            <input
              className="w-full p-3 border rounded-xl"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          )}

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {mensaje && <p className="text-green-600 text-sm">{mensaje}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
          >
            {modo === "login" && "Ingresar"}
            {modo === "registro" && "Registrarse"}
            {modo === "recuperar" && "Enviar Instrucciones"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {modo === "login" && (
            <>
              ¿No tenés cuenta?{" "}
              <button
                className="text-blue-600 font-semibold"
                onClick={() => {
                  setModo("registro");
                  setError("");
                }}
              >
                Registrate
              </button>
              <br />
              <button
                className="mt-2 text-blue-600 text-sm underline"
                onClick={() => {
                  setModo("recuperar");
                  setError("");
                  setMensaje("");
                }}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </>
          )}

          {modo === "registro" && (
            <>
              ¿Ya tenés cuenta?{" "}
              <button
                className="text-blue-600 font-semibold"
                onClick={() => {
                  setModo("login");
                  setError("");
                }}
              >
                Iniciar sesión
              </button>
            </>
          )}

          {modo === "recuperar" && (
            <>
              ¿Recordaste tu contraseña?{" "}
              <button
                className="text-blue-600 font-semibold"
                onClick={() => {
                  setModo("login");
                  setError("");
                  setMensaje("");
                }}
              >
                Volver al login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default Login;

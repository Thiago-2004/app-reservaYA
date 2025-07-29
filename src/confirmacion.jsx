import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './constants/api';

const TELEFONO_WA = '5491144142957'; // Número real

export default function Confirmacion() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const fecha = queryParams.get('fecha');
  const hora = queryParams.get('hora');
  const duracion = queryParams.get('duracion');
  const cancha = queryParams.get('cancha');
  const nombre = queryParams.get('nombre');
  const email = queryParams.get('email');

  useEffect(() => {
    const guardarReserva = async () => {
      if (!fecha || !hora || !duracion || !cancha || !nombre || !email) {
        console.error("Faltan datos para guardar la reserva.");
        return;
      }

      try {
        await axios.get(`${API_URL}/confirmacion`, {
          params: { fecha, hora, duracion, cancha, nombre, email },
        });

        alert("✅ Transferí la seña de $10.000 al alias: ateneo.calzada");

        const mensaje = `Hola! Quiero señar mi reserva para el día ${fecha} a las ${hora} en la cancha ${cancha}, a nombre de ${nombre}.`;
        const url = `https://wa.me/${TELEFONO_WA}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
      } catch (error) {
        console.error('❌ Error al guardar la reserva:', error);
        alert("Ocurrió un error al guardar la reserva. Intentalo nuevamente.");
      }
    };

    guardarReserva();
  }, [fecha, hora, duracion, cancha, nombre, email]);

  const volverAlCalendario = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-6">
      <h1 className="text-2xl font-bold text-green-600 mb-2">¡Reserva realizada con éxito!</h1>
      <p className="text-gray-700 mb-6 text-center">Se abrirá WhatsApp para coordinar la seña</p>

      {/* Alias con botón para copiar */}
      <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
        <span className="font-semibold">Alias:</span>
        <span className="bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm">
          ateneo.calzada
        </span>
        <button
          onClick={() => {
            navigator.clipboard.writeText('ateneo.calzada');
            alert('Alias copiado al portapapeles');
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
        >
          Copiar alias
        </button>
      </div>

      <button
        onClick={volverAlCalendario}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
      >
        Volver al inicio
      </button>
    </div>
  );
}

import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaWifi, FaUtensils, FaShower, FaBirthdayCake, FaMale, FaFemale, FaFutbol } from "react-icons/fa";

export default function PerfilPredio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center justify-start p-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-3xl">

        {/* Header */}
        <div className="text-center mb-8">
          <img
            src="/logo2.png"
            alt="Logo"
            className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full border-4 border-white shadow"
          />
          <h1 className="text-3xl font-extrabold text-blue-700 mt-4">
            Predio Ateneo
          </h1>
          <p className="text-gray-600 text-sm mt-2">
            Reserva tus turnos online y conocé todo lo que ofrecemos.
          </p>
        </div>

        {/* Info principal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-green-600 text-xl mt-1" />
            <div>
              <p className="text-sm text-gray-600">Dirección</p>
              <p className="font-semibold">José Murature 3657</p>
              <p className="text-sm text-gray-500">Rafael Calzada</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FaPhoneAlt className="text-green-600 text-xl mt-1" />
            <div>
              <p className="text-sm text-gray-600">Contacto</p>
              <p className="font-semibold">11 4414 2957</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FaClock className="text-green-600 text-xl mt-1" />
            <div>
              <p className="text-sm text-gray-600">Horario</p>
              <p className="font-semibold">08:00 a 00:00 hs</p>
            </div>
          </div>
        </div>

        {/* Servicios */}
        <div className="bg-gray-100 rounded-xl p-4 mb-6">
          <h3 className="text-lg font-semibold mb-4">Servicios</h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 text-center text-sm text-gray-700">
            <div>
              <FaMale className="mx-auto text-2xl text-green-600" />
              Masculino
            </div>
            <div>
              <FaFemale className="mx-auto text-2xl text-green-600" />
              Femenino
            </div>
            <div>
              <FaShower className="mx-auto text-2xl text-green-600" />
              Vestuarios
            </div>
            <div>
              <FaUtensils className="mx-auto text-2xl text-green-600" />
              Gastronomía
            </div>
            <div>
              <FaWifi className="mx-auto text-2xl text-green-600" />
              WiFi
            </div>
            <div>
              <FaBirthdayCake className="mx-auto text-2xl text-green-600" />
              Salón
            </div>
          </div>
        </div>

        {/* Actividades */}
        <div className="bg-gray-100 rounded-xl p-4 mb-6">
          <h3 className="text-lg font-semibold mb-4">Actividades</h3>
          <div className="flex items-center gap-4">
            <FaFutbol className="text-2xl text-green-600" />
            <span className="font-medium">Fútbol y Pádel</span>
          </div>
        </div>

        {/* Mapa */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Ubicación en el mapa</h3>
          <iframe
            title="mapa"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.5691005305073!2d-58.357941!3d-34.789367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a32cb8ae580b19%3A0xd572b218b62e7ef3!2sJos%C3%A9%20Murature%203657-3489%2C%20B1847EUP%20Rafael%20Calzada%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1691715208793!5m2!1ses-419!2sar"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="rounded-xl shadow"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

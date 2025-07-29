import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaWifi, FaUtensils, FaShower, FaBirthdayCake, FaMale, FaFemale, FaFutbol } from "react-icons/fa";

export default function InfoCancha() {
  return (
    <div className="bg-white mt-6 p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-3xl">
      {/* Info principal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="flex items-start gap-3">
          <FaMapMarkerAlt className="text-green-600 text-xl mt-1" />
          <div>
            <p className="text-sm text-gray-600">Dirección</p>
            <p className="font-semibold">Jose Murature 3657</p>
            <p className="text-sm text-gray-500">Rafael Calzada</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <FaPhoneAlt className="text-green-600 text-xl mt-1" />
          <div>
            <p className="text-sm text-gray-600">Contacto</p>
            <p className="font-semibold">1144142957</p>
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
            BAÑO MASCULINO
          </div>
          <div>
            <FaFemale className="mx-auto text-2xl text-green-600" />
            BAÑO FEMENINO
          </div>
          <div>
            <FaShower className="mx-auto text-2xl text-green-600" />
            VESTUARIOS
          </div>
          <div>
            <FaUtensils className="mx-auto text-2xl text-green-600" />
            GASTRONOMÍA
          </div>
          <div>
            <FaWifi className="mx-auto text-2xl text-green-600" />
            WIFI
          </div>
          <div>
            <FaBirthdayCake className="mx-auto text-2xl text-green-600" />
            SALÓN DE FIESTAS
          </div>
        </div>
      </div>

      {/* Actividades */}
      <div className="bg-gray-100 rounded-xl p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Actividades</h3>
        <div className="flex items-center gap-4">
          <FaFutbol className="text-2xl text-green-600" />
          <span className="font-medium">Pádel</span>
        </div>
      </div>

      {/* Mapa */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Ubicación en el mapa</h3>
        <iframe
          title="mapa"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.702416414662!2d-58.3563503!3d-34.7893751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a32cb8ae580b19%3A0xd572b218b62e7ef3!2sJos%C3%A9%20Murature%203657-3489%2C%20B1847EUP%20Rafael%20Calzada%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1722160000000!5m2!1ses!2sar"
          width="100%"
          height="250"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className="rounded-xl shadow"
        ></iframe>
      </div>
    </div>
  );
}

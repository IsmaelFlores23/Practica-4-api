import { useEffect, useState } from "react";

export function Divisa() {
  const [datosDivisa, setDatosDivisa] = useState(null);
  const [error, setError] = useState("");
  const [from, setFrom] = useState("USD"); // Moneda base
  const [to, setTo] = useState("EUR");     // Moneda destino
  const [monedas, setMonedas] = useState([]); // Lista de todas las monedas disponibles

  // Obtener la lista de monedas al cargar el componente
  useEffect(() => {
    const obtenerMonedas = async () => {
      try {
        const respuesta = await fetch("https://api.frankfurter.app/currencies");
        if (!respuesta.ok) throw new Error("Error al obtener las monedas");
        const datos = await respuesta.json();
        // Convertimos el objeto {USD: "US Dollar", EUR: "Euro", ...} en un array
        setMonedas(Object.entries(datos));
      } catch (err) {
        setError(err.message);
      }
    };
    obtenerMonedas();
  }, []);

  // Obtener la tasa de cambio cuando cambian las monedas
  useEffect(() => {
    const obtenerDivisa = async () => {
      try {
        const respuesta = await fetch(
          `https://api.frankfurter.app/latest?base=${from}&symbols=${to}`
        );
        if (!respuesta.ok) throw new Error("Error al obtener las tasas de cambio");
        const datosJson = await respuesta.json();
        setDatosDivisa(datosJson);
      } catch (err) {
        setError(err.message);
      }
    };

    obtenerDivisa();
  }, [from, to]);

  // Mostrar errores
  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!datosDivisa || monedas.length === 0) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div
      className="contenedor-divisa"
      style={{
        width: "350px",
        padding: "15px",
        backgroundColor: "#1b1b1b",
        color: "#fff",
        borderRadius: "10px",
        textAlign: "center",
        margin: "20px auto",
      }}
    >
      <h1>Tasa de Cambio</h1>

      <div style={{ marginBottom: "15px" }}>
        <label>
          <strong>Moneda base: </strong>
        </label>
        <select
          style={{
            marginLeft: "10px",
            textAlign: "center",
            width: "150px",
            borderRadius: "5px",
          }}
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        >
          {monedas.map(([codigo, nombre]) => (
            <option key={codigo} value={codigo}>
              {codigo} — {nombre}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>
          <strong>Moneda destino: </strong>
        </label>
        <select
          style={{
            marginLeft: "10px",
            textAlign: "center",
            width: "150px",
            borderRadius: "5px",
          }}
          value={to}
          onChange={(e) => setTo(e.target.value)}
        >
          {monedas.map(([codigo, nombre]) => (
            <option key={codigo} value={codigo}>
              {codigo} — {nombre}
            </option>
          ))}
        </select>
      </div>

      <hr style={{ border: "1px solid #c41b1bff" }} />

      <h5>
        1 {datosDivisa.base} = {datosDivisa.rates[to]} {to}
      </h5>
      <p>Fecha: {datosDivisa.date}</p>
    </div>
  );
}

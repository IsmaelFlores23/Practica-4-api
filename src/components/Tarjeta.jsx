import { useEffect, useState } from "react";
import "./Tarjeta.css";

export function Tarjeta() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!respuesta.ok) {
          throw new Error("Error al obtener los usuarios");
        }
        const datos = await respuesta.json();
        setUsuarios(datos);
      } catch (error) {
        setError("Hubo un problema con el fetch");
      } finally {
        setCargando(false);
      }
    };

    obtenerUsuarios();
  }, []);

  if (cargando) {
    return <span className="loader"></span>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="contenedor-tarjetas">
      {usuarios.map((usuario, index) => (
        <div className="tarjeta" key={index}>
          <img
            src={`https://i.pravatar.cc/150?img=${usuario.id}`}
            alt={`Foto de ${usuario.name}`}
            className="tarjeta-imagen"
          />
          <h2 className="tarjeta-nombre">{usuario.name}</h2>
          <p className="tarjeta-correo">{usuario.email}</p>
          <p className="tarjeta-ciudad">{usuario.address.city}</p>
        </div>
      ))}
    </div>
  );
}

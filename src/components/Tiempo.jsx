import { useEffect, useState } from "react"

export function Tiempo(){

    const [datosTiempo, setDatosTiempo] = useState(null);
    const [error, SetError] = useState("");
    const [buscar, datoBuscar] = useState("La Ceiba");

    const controladorInput = (e)=>{
        if (e.key === 'Enter') {
            datoBuscar(e.target.value);
            console.log(e.target.value);
        }
    }

    useEffect(()=>{
        const miFuncionTiempo = async () => {
            try {
            const respuesta = await fetch(`http://api.weatherapi.com/v1/current.json?key=2ea80588605e4cb9bd1232552252210&q=${buscar}&aqi=no`);
            const datosJson = await respuesta.json();
            console.log(datosJson);
            setDatosTiempo(datosJson);
            }
            catch(err){
                SetError(err.message);
            }
        }

        miFuncionTiempo();

    },[buscar]);


        if (error){
            return <p>Error: {error}</p>
        }

        if (!datosTiempo){
            return <p>Cargando datos del clima....</p>
        }

       return(
        <div className="card mx-auto " style={{width: "320px"}}>
          <img
            src={`https:${datosTiempo.current.condition.icon}`}
            className="card-img-top"
            alt="{datosTiempo.current.condition.text"
            style={{width:'90px'}}
          />
            
            <div className="card-body">
                <h5 className="card-title">Temperatura: {datosTiempo.current.temp_c} °C</h5>
                <p className="card-text">Lugar:{datosTiempo.location.name}</p>
                <p className="card-text">Descripcion: {datosTiempo.current.condition.text}</p>
            </div>
             <input
                style={{width: "260px", marginTop:'5px', textAlign:'center'}}
                type = "text"
                className="card-text mx-auto"
                onKeyDown={controladorInput}
            />
        </div>
    )

}




 
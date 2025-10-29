import { useEffect, useState } from "react";
import './ListaUsuario.css';

export function Usuarios(){
    const [usuarios, setUsuarios]=useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(()=>{
        
       const mostrarUsuarios = async()=>{ 
        try{
            const usuarios = await fetch("https://jsonplaceholder.typicode.com/users");
            const datosJson = await usuarios.json(); 
            //console.log(datosJson);
            setUsuarios(datosJson);
            }
            
            catch (error)  {
                 setError("Hubo un problema con el fetch");
             }
            finally{
                setCargando(false)
            }
        }
            
        mostrarUsuarios();

    },[]);

    if(cargando){
        return(<span className="loader"></span>)
    }

    if(error){
        return(<h2>{error}</h2>)
    }

    return(
        <div>
            <ul>
                {
                    usuarios.map((usuario, index)=>{
                        return <li key={index}>{usuario.name}  - {usuario.address.city}</li>
                    })
                }
            </ul>
        </div>
    );
}
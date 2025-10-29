import { useState } from "react"

export function IMC(){
    const [peso, setPeso] = useState();
    const [altura, setAltura] = useState ();
    const [imc, setIMC] = useState(0);

    const calcularIMC = (event)=>{
        event.preventDefault();
        const miAltura = altura / 100;
        const resultadoIMC = (peso) / (miAltura * miAltura);
        if (resultadoIMC > 0){
        setIMC(resultadoIMC.toFixed(2));
        }
        else{
            setIMC(0);
        }
    }

    return(
        <div>
            <form onSubmit={calcularIMC}>
            <div>
                <label htmlFor="">Altura:</label>
                <input 
                type="text"
                value={altura}
                onChange={(e)=>setAltura(e.target.value)}
                placeholder="Altura en cm" />
            </div>
            <div>
                <label htmlFor="">Peso:</label>
                <input 
                type="text"
                value={peso}
                onChange={(e)=>setPeso(e.target.value)}
                placeholder="Peso en kg" />
            </div>
            <div>
                <button type="submit">Calcular</button>
            </div>
            </form>
            <h2>{imc != 0 ?"Resultado" + imc : ""}</h2>
            {
                imc >= 30?
                "Obesidad"
                    : 
                    imc >= 25?
                        "Sobrepeso"
                        :
                        imc >= 18.5?
                        "Peso Saludable"
                        :
                        imc >= 18.5?
                            "Bajo Peso"
                            :""
            }
        </div>
    )
}
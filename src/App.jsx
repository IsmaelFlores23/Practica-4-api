import './App.css'
import {Link, Route, Routes } from 'react-router'
import { Inicio } from './Pages/Inicio'
import { Productos } from './Pages/Productos'
import { Tarjeta } from './components/Tarjeta' /* Para acceder a usuarios */

function App() {
 

  return (
    <>
{/* ------------------------------------------ */}
  <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Logo</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link className="nav-link active" aria-current="inicio" to={"/"}>Inicio</Link>
        <Link className="nav-link" to={"/clientes"}>Clientes</Link>
        <Link className="nav-link" to={"/productos"}>Productos</Link>
        <Link className="nav-link" to={"/acercade"}>Acerca de</Link>
        <Link className="nav-link" to={"/tiempo"}>Tiempo</Link>
      </div>
    </div>
  </div>
</nav>
{/* ----------------------------------------------- */}
    <Routes>
      <Route path='/' element={<Inicio/>}/>
      <Route path='/clientes' element={<Tarjeta/>}/>
      <Route path='/productos' element={<Productos/>}/>
    </Routes>
    </>
  )
}

export default App
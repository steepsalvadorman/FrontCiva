import { useState, useEffect } from "react";
import { Futbolista } from "../types/Futbolista";
import "./App.css";

function App() {


   const [futbolistas, setFutbolistas] = useState<Futbolista[]>([]);

   const [futbolistaSeleccionado, setFutbolistaSeleccionado] =
      useState<Futbolista | null>(null);
   
   const [paginaActual, setPaginaActual] = useState(0);
   const [totalPaginas, setTotalPaginas] = useState(0);
   const pageSize = 5;

   useEffect(() => {
      leerServicio(paginaActual);
   }, [paginaActual]);

   const leerServicio = async (pagina: number) => {
      const url = `http://localhost:8080/api/futbolista?page=${pagina}&size=${pageSize}`;
      const response = await fetch(url);
      const data = await response.json();
      setFutbolistas(data.content);
      setTotalPaginas(data.totalPages);
   };

   const obtenerDetalleFutbolista = async (id: number) => {
      const url = `http://localhost:8080/api/futbolista/${id}`;
      const response = await fetch(url);
      const data: Futbolista = await response.json();
      setFutbolistaSeleccionado(data);
   };

   const handleRowClick = (id: number) => {
      obtenerDetalleFutbolista(id);
   };

   const handlePaginaClick = (pagina: number) => {
      setPaginaActual(pagina);
   };

   return (
      <div>
         <h1>Lista de Futbolistas</h1>

         <table>
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Fecha de Nacimiento</th>
                  <th>Características</th>
                  <th>Posición</th>
               </tr>
            </thead>
            <tbody>
               {futbolistas.map((futbolista) => (
                  <tr
                     key={futbolista.id}
                     onClick={() => handleRowClick(futbolista.id)}
                  >
                     <td>{futbolista.id}</td>
                     <td>{futbolista.nombres}</td>
                     <td>{futbolista.apellidos}</td>
                     <td>{futbolista.fechaNacimiento}</td>
                     <td>{futbolista.caracteristicas}</td>
                     <td>{futbolista.posicion.nombre}</td>
                  </tr>
               ))}
            </tbody>
         </table>


         <div className="pagination">
            {Array.from({ length: totalPaginas }, (_, index) => (
               <button
                  key={index}
                  className={index === paginaActual ? "active" : ""}
                  onClick={() => handlePaginaClick(index)}
               >
                  {index + 1}
               </button>
            ))}
         </div>


         {futbolistaSeleccionado && (
            <div className="modal">
               <div className="modal-content">
                  <span
                     className="close"
                     onClick={() => setFutbolistaSeleccionado(null)}
                  >
                     &times;
                  </span>
                  <h2>Detalle del Futbolista</h2>
                  <p>
                     <strong>ID:</strong> {futbolistaSeleccionado.id}
                  </p>
                  <p>
                     <strong>Nombres:</strong> {futbolistaSeleccionado.nombres}
                  </p>
                  <p>
                     <strong>Apellidos:</strong>{" "}
                     {futbolistaSeleccionado.apellidos}
                  </p>
                  <p>
                     <strong>Fecha de Nacimiento:</strong>{" "}
                     {futbolistaSeleccionado.fechaNacimiento}
                  </p>
                  <p>
                     <strong>Características:</strong>{" "}
                     {futbolistaSeleccionado.caracteristicas}
                  </p>
                  <p>
                     <strong>Posición:</strong>{" "}
                     {futbolistaSeleccionado.posicion.nombre}
                  </p>
               </div>
            </div>
         )}
      </div>
   );
}

export default App;

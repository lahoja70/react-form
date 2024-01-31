
import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import styles from "./styles.module.css";
import Formu from "./Form.jsx";  // Importamos el componente Formu

function App() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    // ... el código de fetchData sin cambios

    try {
      const response = await fetch("http://localhost/reactstrap-php/api.php");
      if (response.status === 200) {
        const data = await response.json();
        setEstudiantes(data.flat()); // Actualiza el estado estudiantes directamente
      } else {
        setError("Error fetching data from API");
      }
    } catch (error) {
      setError("Error fetching data from API");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ... el resto del código del componente App sin cambios
 const handleDelete = async (id) => {
    // Realizar la petición HTTP a la API de PHP
    try {
      const response = await fetch(`http://localhost/reactstrap-php/api-delete.php?id=${id}`);

      if (response.ok) {
        // Eliminar el estudiante de la tabla con el id proporcionado 
        setEstudiantes(estudiantes.filter((estudiante) => estudiante.id !== id));
       console.log(id);
      } else {
        throw new Error("Error deleting student");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting student");
    }
  };
  return (
    // ... el código del componente App sin cambios, excepto la inclusión del componente Formu
    <>
    <div className={styles.centertable}>
      <Table>
        <thead>
          <tr>
            <th scope="row">|Action|</th>
            <th scope="row">|ID|</th>
            <th scope="row">|Nombre|</th>
            <th scope="row">|Apellido|</th>
            <th scope="row" className={styles.my_left_align}>|Correo|</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((estudiante) => (
            <tr key={estudiante.id}>
              <td>
                <Button color="danger" size="sm" onClick={() => handleDelete(estudiante.id)}>
                  Delete
                </Button>
              </td>
              <td>{estudiante.id}</td>
              <td>{estudiante.nombre}</td>
              <td>{estudiante.apellido}</td>
              <td>{estudiante.correo}</td>
            </tr>
          ))}
        </tbody>
      </Table>

    </div>
    <Formu fetchData={fetchData}/>
    </>
  );
}

export default App;

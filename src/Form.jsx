



import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import styles from "./styles.module.css";

function Formu({ fetchData }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("apellido", apellido);
    formData.append("correo", correo);

    try {
      const response = await fetch("http://localhost/reactstrap-php/api-insert.php", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Estudiante agregado correctamente");
        // Actualizar la lista de estudiantes en el componente App
        fetchData();           // Llamamos a la función fetchData del componente App
      } else {
        throw new Error("Error al agregar estudiante");
      }
    } catch (error) {
      console.error(error);
      alert("Error al agregar estudiante");
    }
  };

  return (
    // ... el resto del código del componente Formu sin cambios

  <Form className={styles.centertable} onSubmit={handleSubmit}>
   <FormGroup>
    <Label for="nombre">Nombre</Label>
    <Input type="text" id="nombre" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
   </FormGroup>
   <FormGroup>
    <Label for="apellido">Apellido</Label>
    <Input type="text" id="apellido" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
   </FormGroup>
   <FormGroup>
    <Label for="correo">Correo</Label>
    <Input type="email" id="correo" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
   </FormGroup>
   <Button color="primary" type="submit">
    Agregar
   </Button>
  </Form>
  );
}

export default Formu;

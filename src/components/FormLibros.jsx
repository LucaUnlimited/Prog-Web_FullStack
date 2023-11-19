import React, { useState } from "react";
import Libros from "./Libros.jsx";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

import { gql, useMutation } from "@apollo/client";
import { GET_LIBROS } from "./Libros.jsx";

const AGREGAR_LIBRO = gql`
  mutation AgregarLibro($input: LibroInput) {
    agregarLibro(input: $input) {
      nombre
    }
  }
`;

const ACTUALIZAR_LIBRO = gql`
  mutation ActualizarLibro($input: LibroInput) {
    actualizarLibro(input: $input) {
      nombre
    }
  }
`;

const ELIMINAR_TODOS = gql`
  mutation Mutation {
    eliminarTodosLosLibros
  }
`;

export default function FormLibro() {
  const sxFormLibro = {
    marginBottom: 2,
    background: "#e5e5e9",
    borderRadius: "4px",
  };

  const [agregarLibro] = useMutation(AGREGAR_LIBRO, {
    refetchQueries: [GET_LIBROS, "GetLibros"],
  });

  const [actualizarLibro] = useMutation(ACTUALIZAR_LIBRO, {
    refetchQueries: [GET_LIBROS, "GetLibros"],
  });

  const [eliminarTodos] = useMutation(ELIMINAR_TODOS, {
    refetchQueries: [GET_LIBROS, "GetLibros"],
  });

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [genero, setGenero] = useState("Terror");
  const [actualizar, setActualizar] = useState(false);
  const [libroId, setLibroId] = useState(null);

  const handlerNombre = (event) => {
    setNombre(event.target.value);
  };

  const handlerDescripcion = (event) => {
    setDescripcion(event.target.value);
  };

  const handlerFechaIngreso = (event) => {
    setFechaIngreso(event.target.value);
  };

  const handlerGenero = (event) => {
    setGenero(event.target.value);
  };

  function limpiarForm() {
    setNombre("");
    setDescripcion("");
    setFechaIngreso("");
    setGenero("Terror");
    setLibroId(null);
  }

  function cancelar() {
    limpiarForm();
    setActualizar(false);
  }

  function handlerActualizar(libro) {
    setNombre(libro.nombre);
    setDescripcion(libro.descripcion);
    setFechaIngreso(libro.fechaIngreso);
    setGenero(libro.genero);
    setLibroId(libro._id);
    setActualizar(true);
  }

  const handlerActualizarLibro = (libro) => {
    actualizarLibro({ variables: { input: libro } });
  };

  const handlerSubmit = (event) => {
    event.preventDefault();

    const libro = {
      _id: libroId,
      nombre: nombre,
      descripcion: descripcion,
      fechaIngreso: fechaIngreso,
      genero: genero,
    };
    if (actualizar) {
      handlerActualizarLibro(libro);
      setActualizar(false);
    } else {
      agregarLibro({ variables: { input: libro } });
    }
    limpiarForm();
  };

  return (
    <>
      <div style={{ display: "flex", paddingLeft: 40 }}>
        <div
          style={{
            height: 330,
            width: 300,
            padding: 10,
            margin: "20px",
            border: "2px solid #73b1df ",
            borderRadius: "15px",
            backgroundColor: "#FFFFFF",
            overflow: "hidden",
          }}
        >
          <form id="formLibro" onSubmit={handlerSubmit}>
            <FormControl fullWidth>
              <TextField
                id="nombre"
                label="Nombre"
                variant="outlined"
                size="small"
                fullWidth
                value={nombre}
                onChange={handlerNombre}
                sx={{
                  marginTop: "10px",
                  background: "#e5e5e9",
                  borderRadius: "4px",
                  marginBottom: "18px",
                }}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                id="descripcion"
                label="Descripcion"
                variant="outlined"
                size="small"
                fullWidth
                value={descripcion}
                onChange={handlerDescripcion}
                sx={sxFormLibro}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                id="fechaIngreso"
                label="Fecha De Ingreso"
                variant="outlined"
                size="small"
                value={fechaIngreso}
                onChange={handlerFechaIngreso}
                sx={sxFormLibro}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="labelGenero">Genero</InputLabel>
              <Select
                labelId="labelGenero"
                id="genero"
                value={genero}
                label="Genero"
                onChange={handlerGenero}
                sx={sxFormLibro}
              >
                <MenuItem value={"Terror"}>Terror</MenuItem>
                <MenuItem value={"Fantasia"}>Fantasia</MenuItem>
                <MenuItem value={"Comedia"}>Comedia</MenuItem>
              </Select>
            </FormControl>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="success"
                startIcon={<SaveIcon />}
                size="small"
                type="submit"
              >
                {actualizar ? "Actualizar" : "Guardar"}
              </Button>
              &nbsp;
              {actualizar && (
                <Button
                  variant="contained"
                  color="warning"
                  startIcon={<CancelIcon />}
                  size="small"
                  onClick={cancelar}
                >
                  Cancelar
                </Button>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: 10,
              }}
            >
              <Button
                sx={{ background: "#C70039" }}
                variant="contained"
                color="error"
                onClick={eliminarTodos}
              >
                Eliminar Todos los Libros
              </Button>
            </div>
          </form>
        </div>
        <Libros handlerActualizar={handlerActualizar} />
      </div>
    </>
  );
}

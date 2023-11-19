import React, { useState } from "react";
import Bibliotecas from "./Bibliotecas.jsx";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

import { gql, useMutation } from "@apollo/client";
import { GET_BIBLIOTECAS } from "./Bibliotecas.jsx";

const AGREGAR_BIBLIOTECA = gql`
  mutation AgregarBiblioteca($input: BibliotecaInput) {
    agregarBiblioteca(input: $input) {
      nombre
    }
  }
`;

const ACTUALIZAR_BIBLIOTECA = gql`
  mutation ActualizarBiblioteca($input: BibliotecaInput) {
    actualizarBiblioteca(input: $input) {
      nombre
    }
  }
`;

const ELIMINAR_TODAS = gql`
  mutation Mutation {
    eliminarTodasLasBibliotecas
  }
`;

export default function FormBiblioteca() {
  const sxFormPersona = {
    marginBottom: 2,
    background: "#e5e5e9",
    borderRadius: "4px",
  };

  const [agregarBiblioteca] = useMutation(AGREGAR_BIBLIOTECA, {
    refetchQueries: [GET_BIBLIOTECAS, "GetBiblioteca"],
  });

  const [actualizarBiblioteca] = useMutation(ACTUALIZAR_BIBLIOTECA, {
    refetchQueries: [GET_BIBLIOTECAS, "GetBiblioteca"],
  });

  const [eliminarTodas] = useMutation(ELIMINAR_TODAS, {
    refetchQueries: [GET_BIBLIOTECAS, "GetBiblioteca"],
  });

  const [bibliotecaId, setBibliotecaId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [direccion, setDireccion] = useState("");
  const [actualizar, setActualizar] = useState(false);

  const handlerNombre = (event) => {
    setNombre(event.target.value);
  };

  const handlerCorreoElectronico = (event) => {
    setCorreoElectronico(event.target.value);
  };

  const handlerCiudad = (event) => {
    setCiudad(event.target.value);
  };

  const handlerCodigoPostal = (event) => {
    setCodigoPostal(event.target.value);
  };

  const handlerDireccion = (event) => {
    setDireccion(event.target.value);
  };

  function limpiarForm() {
    setNombre("");
    setCorreoElectronico("");
    setCiudad("");
    setCodigoPostal("");
    setDireccion("");
    setBibliotecaId(null);
  }

  function cancelar() {
    limpiarForm();
    setActualizar(false);
  }

  function handlerActualizar(biblioteca) {
    setNombre(biblioteca.nombre);
    setCorreoElectronico(biblioteca.correoElectronico);
    setCiudad(biblioteca.domicilio.ciudad);
    setCodigoPostal(biblioteca.domicilio.cp);
    setDireccion(biblioteca.domicilio.direccion);
    setBibliotecaId(biblioteca._id);
    setActualizar(true);
  }

  const handlerActualizarBiblioteca = (biblioteca) => {
    actualizarBiblioteca({ variables: { input: biblioteca } });
  };

  const handlerSubmit = (event) => {
    event.preventDefault();

    const biblioteca = {
      _id: bibliotecaId,
      nombre: nombre,
      correoElectronico: correoElectronico,
      domicilio: {
        ciudad: ciudad,
        cp: codigoPostal,
        direccion: direccion,
      },
    };

    if (actualizar) {
      handlerActualizarBiblioteca(biblioteca);
      setActualizar(false);
    } else {
      agregarBiblioteca({ variables: { input: biblioteca } });
    }
    limpiarForm();
  };

  return (
    <>
      <div style={{ display: "flex", paddingLeft: 40 }}>
        <div
          style={{
            width: 300,
            height: 370,
            padding: 10,
            margin: "20px",
            border: "1px solid #73b1df ",
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
                id="correoElectronico"
                label="Correo Electronico"
                variant="outlined"
                size="small"
                fullWidth
                value={correoElectronico}
                onChange={handlerCorreoElectronico}
                sx={sxFormPersona}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                id="ciudad"
                label="Ciudad"
                variant="outlined"
                size="small"
                fullWidth
                value={ciudad}
                onChange={handlerCiudad}
                sx={sxFormPersona}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                id="codigoPostal"
                label="Codigo Postal"
                variant="outlined"
                size="small"
                fullWidth
                value={codigoPostal}
                onChange={handlerCodigoPostal}
                sx={sxFormPersona}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                id="direccion"
                label="Direccion"
                variant="outlined"
                size="small"
                fullWidth
                value={direccion}
                onChange={handlerDireccion}
                sx={sxFormPersona}
              />
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
                onClick={eliminarTodas}
              >
                Eliminar Bibliotecas
              </Button>
            </div>
          </form>
        </div>
        <Bibliotecas handlerActualizar={handlerActualizar} />
      </div>
    </>
  );
}

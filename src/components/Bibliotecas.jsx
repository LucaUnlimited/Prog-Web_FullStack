import React from "react";

import { useQuery, useMutation, gql } from "@apollo/client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const GET_BIBLIOTECAS = gql`
  query GetBibliotecas {
    bibliotecas {
      _id
      nombre
      correoElectronico
      domicilio {
        ciudad
        cp
        direccion
      }
    }
  }
`;

const ELIMINAR_BIBLIOTECA = gql`
  mutation EliminarBiblioteca($input: BibliotecaInput) {
    eliminarBiblioteca(input: $input) {
      _id
    }
  }
`;

export default function Bibliotecas(props) {
  const { loading, error, data } = useQuery(GET_BIBLIOTECAS);
  const [eliminarBiblioteca] = useMutation(ELIMINAR_BIBLIOTECA, {
    refetchQueries: [GET_BIBLIOTECAS, "GetBiblioteca"],
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const handlerEliminar = (idBiblioteca) => {
    eliminarBiblioteca({ variables: { input: { _id: idBiblioteca } } });
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{
          margin: "20px",
          border: "2px solid RGBA(255, 84, 47,0.4)",
          borderRadius: "15px",
          backgroundColor: "#ECF0F1",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Nombre</TableCell>
              <TableCell align="left">Correo Electronico</TableCell>
              <TableCell align="left">ciudad</TableCell>
              <TableCell align="left">cp</TableCell>
              <TableCell align="right">direccion</TableCell>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right" sx={{ marginRight: "60px" }}>
                {" "}
              </TableCell>
            </TableRow>{" "}
          </TableHead>
          <TableBody>
            {data.bibliotecas.map((biblioteca) => (
              <TableRow key={biblioteca._id}>
                <TableCell align="left">{biblioteca.nombre}</TableCell>
                <TableCell align="left">
                  {biblioteca.correoElectronico}
                </TableCell>
                <TableCell align="left">
                  {biblioteca.domicilio.ciudad}
                </TableCell>
                <TableCell align="left">{biblioteca.domicilio.cp}</TableCell>
                <TableCell align="left">
                  {biblioteca.domicilio.direccion}
                </TableCell>
                <TableCell align="right">{biblioteca._id}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => props.handlerActualizar(biblioteca)}
                  >
                    <EditIcon />
                  </Button>
                  &nbsp;
                  <Button
                    sx={{ background: "#C70039", marginRight: "30px" }}
                    variant="contained"
                    color="error"
                    onClick={() => handlerEliminar(biblioteca._id)}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

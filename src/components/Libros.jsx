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

export const GET_LIBROS = gql`
  query GetLibros {
    libros {
      _id
      nombre
      descripcion
      fechaIngreso
      genero
    }
  }
`;

const ELIMINAR_LIBRO = gql`
  mutation EliminarLibro($id: String!) {
    eliminarLibro(input: { _id: $id }) {
      _id
    }
  }
`;

export default function Libros(props) {
  const { loading, error, data } = useQuery(GET_LIBROS);
  const [eliminarLibro] = useMutation(ELIMINAR_LIBRO, {
    refetchQueries: [GET_LIBROS, "GetLibros"],
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  console.log(data.libros.length != 0);

  const handlerEliminar = (idDelLibro) => {
    eliminarLibro({ variables: { id: idDelLibro } });
  };

  if (data.libros.length != 0)
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
                <TableCell align="left">Descripcion</TableCell>
                <TableCell align="left">Fecha Ingreso</TableCell>
                <TableCell align="left">Genero</TableCell>
                <TableCell align="right">ID</TableCell>
                <TableCell align="right" sx={{ marginRight: "60px" }}>
                  {" "}
                </TableCell>
              </TableRow>{" "}
            </TableHead>
            <TableBody>
              {data.libros.map((libro) => (
                <TableRow key={libro._id}>
                  <TableCell align="left">{libro.nombre}</TableCell>
                  <TableCell align="left">{libro.descripcion}</TableCell>
                  <TableCell align="left">{libro.fechaIngreso}</TableCell>
                  <TableCell align="left">{libro.genero}</TableCell>
                  <TableCell align="right">{libro._id}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => props.handlerActualizar(libro)}
                    >
                      <EditIcon />
                    </Button>
                    &nbsp;
                    <Button
                      sx={{ background: "#C70039", marginRight: "30px" }}
                      variant="contained"
                      color="error"
                      onClick={() => handlerEliminar(libro._id)}
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

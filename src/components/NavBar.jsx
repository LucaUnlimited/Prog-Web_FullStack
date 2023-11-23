import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function DenseAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ background: "#212F3D" }}>
        <Toolbar variant="dense">
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <IconButton
              edge="start"
              color="white"
              background="white"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon sx={{ color: "white" }} />
            </IconButton>
          </Link>
          <Link to={"/libros"} style={{ textDecoration: "none" }}>
            <Button sx={{ color: "white" }}>Libros</Button>
          </Link>
          <Link to={"/bibliotecas"} style={{ textDecoration: "none" }}>
            <Button sx={{ color: "white" }}>Bibliotecas</Button>
          </Link>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Button sx={{ color: "white" }}>Ambos</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

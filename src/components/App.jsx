import React from "react";
import FormLibros from "./FormLibros.jsx";
import FormBiblioteca from "./FormBibliotecas.jsx";
import NavBar from "./NavBar.jsx";
import Toolbar from "@mui/material/Toolbar";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Routes,
} from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", Component: Root },
  { path: "*", Component: Root },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  const sxLayout = {
    margin: "0",
    color: "red",
  };

  return (
    <Routes>
      <Route element={<Layout sx={sxLayout} />}>
        <Route
          path="/"
          element={
            <>
              <FormLibros />
              <FormBiblioteca />
            </>
          }
        />
        <Route exact path="/libros/*" element={<FormLibros />} />
        <Route exact path="/bibliotecas/*" element={<FormBiblioteca />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  const sxApp = {
    display: "flex",
    justifyContent: "center",
  };

  return (
    <React.Fragment>
      <NavBar></NavBar>
      <Toolbar>{/* content */}</Toolbar>
      <Outlet sx={{ background: "#C70039" }} />
    </React.Fragment>
  );
}

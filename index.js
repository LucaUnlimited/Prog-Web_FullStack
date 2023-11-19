const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
const app = express();
const Libro = require("./module/Libro.js");
const Biblioteca = require("./module/Biblioteca.js");
const path = require("path");
const puerto = "3000";

const uri = "mongodb://127.0.0.1:27017/tpFinal";

app.use(express.static("public", { index: false }));

app.use(express.json());

app.get("/*", (req, res, next) => {
  if (req.url === "/graphql") {
    return next();
  }
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

const typeDefs = gql`
  type Query {
    libros: [Libro]
    bibliotecas: [Biblioteca]
  }

  type Libro {
    _id: String
    nombre: String
    descripcion: String
    fechaIngreso: String
    genero: [String]
  }

  type Biblioteca {
    _id: String
    nombre: String
    correoElectronico: String
    domicilio: Domicilio
  }

  type Domicilio {
    ciudad: String
    cp: String
    direccion: String
  }

  type Mutation {
    agregarLibro(input: LibroInput): Libro
    agregarBiblioteca(input: BibliotecaInput): Biblioteca
    eliminarLibro(input: LibroInput): Libro
    eliminarBiblioteca(input: BibliotecaInput): Biblioteca
    actualizarLibro(input: LibroInput): Libro
    actualizarBiblioteca(input: BibliotecaInput): Biblioteca
    eliminarTodasLasBibliotecas: String
    eliminarTodosLosLibros: String
  }

  input LibroInput {
    _id: String
    nombre: String
    descripcion: String
    fechaIngreso: String
    genero: [String]
  }

  input BibliotecaInput {
    _id: String
    nombre: String
    correoElectronico: String
    domicilio: DomicilioInput
  }

  input DomicilioInput {
    ciudad: String
    cp: String
    direccion: String
  }
`;

const resolvers = {
  Query: {
    libros: async () => await Libro.find(),
    bibliotecas: async () => await Biblioteca.find(),
  },

  Mutation: {
    agregarLibro: async (_, { input }) => {
      const libroNuevo = new Libro(input);
      await libroNuevo.save();
      return libroNuevo;
    },
    agregarBiblioteca: async (_, { input }) => {
      const bibliotecaNueva = new Biblioteca(input);
      await bibliotecaNueva.save();
      return bibliotecaNueva;
    },
    eliminarLibro: async (_, { input }) => {
      const _id = input._id;
      const libroEliminado = await Libro.findByIdAndDelete(_id);
      return libroEliminado;
    },
    eliminarBiblioteca: async (_, { input }) => {
      const _id = input._id;
      const bibliotecaEliminada = await Biblioteca.findByIdAndDelete(_id);
      return bibliotecaEliminada;
    },
    actualizarLibro: async (_, { input }) => {
      const { _id, ...actualizacion } = input;
      const libroActualizado = await Libro.findByIdAndUpdate(
        _id,
        actualizacion,
        { new: true }
      );
      return libroActualizado;
    },
    actualizarBiblioteca: async (_, { input }) => {
      const { _id, ...actualizacion } = input;
      const bibliotecaActualizada = await Biblioteca.findByIdAndUpdate(
        _id,
        actualizacion,
        { new: true }
      );
      return bibliotecaActualizada;
    },
    eliminarTodosLosLibros: async () => {
      await Libro.deleteMany({});
      return "Todos los libros han sido eliminados";
    },
    eliminarTodasLasBibliotecas: async () => {
      await Biblioteca.deleteMany({});
      return "Todas las bibliotecas han sido eliminadas";
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen(puerto, async () => {
    console.info(`Escuchando en http://localhost:${puerto}/graphql`);
    mongoose
      .connect(uri)
      .then(() => console.info("Conexión establecida"))
      .catch((err) => console.error(err));
  });
});

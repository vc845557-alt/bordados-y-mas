const usuarios// Importar el módulo Express
const express = require("express");
 
// Crear la aplicación Express
const app = express();
 
// Middleware: permite recibir datos en formato JSON
// Sin esto, no podemos leer el body de las peticiones
app.use(express.json());
 
// Puerto donde correrá el servidor
const PUERTO = 3000;
 
// Base de datos temporal en memoria
// En un proyecto real esto sería una base de datos como MongoDB o MySQL
const usuarios = {};
 
// ==========================================
// ENDPOINT 1: Registro de usuario
// MÉTODO: POST
// RUTA: /api/registro
// BODY: { "usuario": "...", "contrasena": "..." }
// ==========================================
app.post("/api/registro", (req, res) => {
 
  // Extraer usuario y contraseña del cuerpo de la petición
  const { usuario, contrasena } = req.body;
 
  // Validar que se enviaron los datos requeridos
  if (!usuario || !contrasena) {
    return res.status(400).json({
      estado: "error",
      mensaje: "Usuario y contraseña son requeridos."
    });
  }
 
  // Verificar si el usuario ya existe
  if (usuarios.hasOwnProperty(usuario)) {
    return res.status(409).json({
      estado: "error",
      mensaje: "Error: el usuario ya existe."
    });
  }
 
  // Guardar el nuevo usuario
  usuarios[usuario] = contrasena;
 
  // Responder con éxito
  return res.status(201).json({
    estado: "exitoso",
    mensaje: "Registro satisfactorio.",
    usuario: usuario
  });
});
 
// ==========================================
// ENDPOINT 2: Inicio de sesión
// MÉTODO: POST
// RUTA: /api/login
// BODY: { "usuario": "...", "contrasena": "..." }
// ==========================================
app.post("/api/login", (req, res) => {
 
  // Extraer usuario y contraseña del cuerpo de la petición
  const { usuario, contrasena } = req.body;
 
  // Validar que se enviaron los datos requeridos
  if (!usuario || !contrasena) {
    return res.status(400).json({
      estado: "error",
      mensaje: "Usuario y contraseña son requeridos."
    });
  }
 
  // Verificar si el usuario existe y la contraseña es correcta
  if (usuarios.hasOwnProperty(usuario) && usuarios[usuario] === contrasena) {
    return res.status(200).json({
      estado: "exitoso",
      mensaje: "Autenticación satisfactoria.",
      usuario: usuario
    });
  } else {
    return res.status(401).json({
      estado: "error",
      mensaje: "Error en la autenticación."
    });
  }
});
 
// ==========================================
// ENDPOINT 3: Listar usuarios registrados
// MÉTODO: GET
// RUTA: /api/usuarios
// (Solo para pruebas académicas)
// ==========================================
app.get("/api/usuarios", (req, res) => {
 
  // Obtener lista de usuarios registrados
  const listaUsuarios = Object.keys(usuarios);
 
  return res.status(200).json({
    estado: "exitoso",
    total: listaUsuarios.length,
    usuarios: listaUsuarios
  });
});
 
// ==========================================
// ENDPOINT 4: Verificar que el servidor funciona
// MÉTODO: GET
// RUTA: /api/estado
// ==========================================
app.get("/api/estado", (req, res) => {
  return res.status(200).json({
    estado: "activo",
    mensaje: "El servidor está funcionando correctamente.",
    version: "1.0.0"
  });
});
 
// Iniciar el servidor
app.listen(PUERTO, () => {
  console.log("==========================================");
  console.log(`✅ Servidor corriendo en http://localhost:${PUERTO}`);
  console.log("==========================================");
  console.log("Endpoints disponibles:");
  console.log(`  GET  → http://localhost:${PUERTO}/api/estado`);
  console.log(`  POST → http://localhost:${PUERTO}/api/registro`);
  console.log(`  POST → http://localhost:${PUERTO}/api/login`);
  console.log(`  GET  → http://localhost:${PUERTO}/api/usuarios`);
  console.log("==========================================");
});
 
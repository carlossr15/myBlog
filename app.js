require('dotenv').config(); // Asegúrate de que las variables de entorno se carguen aquí también si no lo haces en db/index.js

const express = require('express');
const app = express();
const autoresRoutes = require('./routes/autores');
const postsRoutes = require('./routes/posts');

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Prefijo /api para todas las URLs
app.use('/api/autores', autoresRoutes);
app.use('/api/posts', postsRoutes);

const PORT = process.env.PORT || 3000; // Usa la variable de entorno o 3000 por defecto

app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
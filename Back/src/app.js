require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initPool } = require('./config/oracle');
const { connectMongo } = require('./config/mongodb');

const authRoutes          = require('./routes/auth.routes');
const alumnosRoutes       = require('./routes/alumnos.routes');
const categoriasRoutes    = require('./routes/categorias.routes');
const instructoresRoutes  = require('./routes/instructores.routes');
const cursosRoutes        = require('./routes/cursos.routes');
const leccionesRoutes     = require('./routes/lecciones.routes');
const matriculasRoutes    = require('./routes/matriculas.routes');
const suscripcionesRoutes = require('./routes/suscripciones.routes');
const calificacionesRoutes = require('./routes/calificaciones.routes');
const foroRoutes          = require('./routes/foro.routes');
const progresoRoutes      = require('./routes/progreso.routes');
const materialesRoutes    = require('./routes/materiales.routes');

const app = express();

const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.use('/api/auth',           authRoutes);
app.use('/api/alumnos',        alumnosRoutes);
app.use('/api/categorias',     categoriasRoutes);
app.use('/api/instructores',   instructoresRoutes);
app.use('/api/cursos',         cursosRoutes);
app.use('/api/lecciones',      leccionesRoutes);
app.use('/api/matriculas',     matriculasRoutes);
app.use('/api/suscripciones',  suscripcionesRoutes);
app.use('/api/calificaciones', calificacionesRoutes);
app.use('/api/foro',           foroRoutes);
app.use('/api/progreso',       progresoRoutes);
app.use('/api/materiales',     materialesRoutes);

const start = async () => {
  try {
    await initPool();
    await connectMongo();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
  } catch (err) {
    console.error('Error al iniciar el servidor:', err.message);
    process.exit(1);
  }
};

start();

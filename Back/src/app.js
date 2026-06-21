require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initPool } = require('./config/oracle');
const { connectMongo } = require('./config/mongodb');

const authRoutes          = require('./routes/auth.routes');
const cursosRoutes        = require('./routes/cursos.routes');
const matriculasRoutes    = require('./routes/matriculas.routes');
const calificacionesRoutes = require('./routes/calificaciones.routes');
const foroRoutes          = require('./routes/foro.routes');
const progresoRoutes      = require('./routes/progreso.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',           authRoutes);
app.use('/api/cursos',         cursosRoutes);
app.use('/api/matriculas',     matriculasRoutes);
app.use('/api/calificaciones', calificacionesRoutes);
app.use('/api/foro',           foroRoutes);
app.use('/api/progreso',       progresoRoutes);

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

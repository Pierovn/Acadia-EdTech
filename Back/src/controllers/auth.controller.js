const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const alumnoModel = require('../models/oracle/alumno.model');

const register = async (req, res) => {
  const { nombre, apellido, email, password } = req.body;
  if (!nombre || !apellido || !email || !password) {
    return res.status(400).json({ error: 'nombre, apellido, email y password son requeridos' });
  }

  try {
    const existing = await alumnoModel.findByEmail(email);
    if (existing) return res.status(409).json({ error: 'El email ya está registrado' });

    const passwordHash = await bcrypt.hash(password, 10);
    const id = await alumnoModel.create({ nombre, apellido, email, passwordHash });
    res.status(201).json({ mensaje: 'Registrado correctamente', id_alumno: id });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar', detalle: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'email y password son requeridos' });
  }

  try {
    const alumno = await alumnoModel.findByEmail(email);
    if (!alumno) return res.status(401).json({ error: 'Credenciales inválidas' });

    const match = await bcrypt.compare(password, alumno.PASSWORD_HASH);
    if (!match) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign(
      { id_alumno: alumno.ID_ALUMNO, email: alumno.EMAIL },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error al iniciar sesión', detalle: err.message });
  }
};

module.exports = { register, login };

const suscripcionModel = require('../models/oracle/suscripcion.model');

const PLANES = ['MENSUAL', 'ANUAL', 'UNICO'];
const ESTADOS = ['ACTIVO', 'EXPIRADO', 'CANCELADO'];

const listar = async (req, res) => {
  try {
    const suscripciones = await suscripcionModel.findByAlumno(req.alumno.id_alumno);
    res.json(suscripciones);
  } catch (err) {
    console.error('Error al listar suscripciones:', err);
    res.status(500).json({ error: 'Error al listar suscripciones' });
  }
};

const detalle = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'id de suscripción inválido' });
  }

  try {
    const suscripcion = await suscripcionModel.findById(id);
    if (!suscripcion) return res.status(404).json({ error: 'Suscripción no encontrada' });
    res.json(suscripcion);
  } catch (err) {
    console.error('Error al obtener suscripción:', err);
    res.status(500).json({ error: 'Error al obtener suscripción' });
  }
};

const crear = async (req, res) => {
  const { plan, monto } = req.body;
  if (!plan || monto === undefined) {
    return res.status(400).json({ error: 'plan y monto son requeridos' });
  }
  if (!PLANES.includes(plan)) {
    return res.status(400).json({ error: 'plan inválido' });
  }

  try {
    const id = await suscripcionModel.create({
      idAlumno: req.alumno.id_alumno,
      plan,
      monto
    });
    res.status(201).json({ mensaje: 'Pago procesado y suscripción activada', id_suscripcion: id });
  } catch (err) {
    console.error('Error al crear suscripción:', err);
    res.status(500).json({ error: 'Error al crear suscripción' });
  }
};

const actualizarEstado = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'id de suscripción inválido' });
  }

  const { estado } = req.body;
  if (!estado || !ESTADOS.includes(estado)) {
    return res.status(400).json({ error: 'estado inválido' });
  }

  try {
    const filas = await suscripcionModel.updateEstado(id, estado);
    if (!filas) return res.status(404).json({ error: 'Suscripción no encontrada' });
    res.json({ mensaje: 'Estado de suscripción actualizado' });
  } catch (err) {
    console.error('Error al actualizar suscripción:', err);
    res.status(500).json({ error: 'Error al actualizar suscripción' });
  }
};

const eliminar = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'id de suscripción inválido' });
  }

  try {
    const filas = await suscripcionModel.remove(id);
    if (!filas) return res.status(404).json({ error: 'Suscripción no encontrada' });
    res.json({ mensaje: 'Suscripción eliminada' });
  } catch (err) {
    console.error('Error al eliminar suscripción:', err);
    res.status(500).json({ error: 'Error al eliminar suscripción' });
  }
};

module.exports = { listar, detalle, crear, actualizarEstado, eliminar };

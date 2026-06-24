const { Router } = require('express');
const { verifyToken } = require('../middlewares/auth.middleware');
const { listar, detalle, crear, actualizarEstado, eliminar } = require('../controllers/suscripciones.controller');

const router = Router();

router.use(verifyToken);

router.get('/', listar);
router.get('/:id', detalle);
router.post('/', crear);
router.put('/:id/estado', actualizarEstado);
router.delete('/:id', eliminar);

module.exports = router;

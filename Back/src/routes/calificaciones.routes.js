const { Router } = require('express');
const { verifyToken } = require('../middlewares/auth.middleware');
const { listar, registrar, detalle, actualizar, eliminar } = require('../controllers/calificaciones.controller');

const router = Router();

router.use(verifyToken);

router.get('/', listar);
router.get('/:id', detalle);
router.post('/', registrar);
router.put('/:id', actualizar);
router.delete('/:id', eliminar);

module.exports = router;

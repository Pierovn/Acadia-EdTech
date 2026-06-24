const { Router } = require('express');
const { verifyToken } = require('../middlewares/auth.middleware');
const { listar, detalle, actualizar, eliminar } = require('../controllers/alumnos.controller');

const router = Router();

router.use(verifyToken);

router.get('/', listar);
router.get('/:id', detalle);
router.put('/:id', actualizar);
router.delete('/:id', eliminar);

module.exports = router;

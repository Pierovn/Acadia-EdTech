const { Router } = require('express');
const { verifyToken } = require('../middlewares/auth.middleware');
const { listar, detalle, lecciones, crear, actualizar, eliminar } = require('../controllers/cursos.controller');

const router = Router();

router.get('/', listar);
router.get('/:id', detalle);
router.get('/:id/lecciones', lecciones);
router.post('/', verifyToken, crear);
router.put('/:id', verifyToken, actualizar);
router.delete('/:id', verifyToken, eliminar);

module.exports = router;

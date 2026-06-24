const { Router } = require('express');
const { verifyToken } = require('../middlewares/auth.middleware');
const { matricularse, misCursos, listar, detalle, actualizarEstado, eliminar } = require('../controllers/matriculas.controller');

const router = Router();

router.use(verifyToken);

router.get('/mis-cursos', misCursos);
router.get('/', listar);
router.get('/:id', detalle);
router.post('/', matricularse);
router.put('/:id', actualizarEstado);
router.delete('/:id', eliminar);

module.exports = router;

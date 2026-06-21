const { Router } = require('express');
const { listar, detalle, lecciones } = require('../controllers/cursos.controller');

const router = Router();

router.get('/', listar);
router.get('/:id', detalle);
router.get('/:id/lecciones', lecciones);

module.exports = router;

const { Router } = require('express');
const { verifyToken } = require('../middlewares/auth.middleware');
const { porCurso, detalle, crear, actualizar, eliminar } = require('../controllers/lecciones.controller');

const router = Router();

router.get('/curso/:idCurso', porCurso);
router.get('/:id', detalle);
router.post('/', verifyToken, crear);
router.put('/:id', verifyToken, actualizar);
router.delete('/:id', verifyToken, eliminar);

module.exports = router;

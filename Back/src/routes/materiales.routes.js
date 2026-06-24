const { Router } = require('express');
const { verifyToken } = require('../middlewares/auth.middleware');
const { porCurso, porLeccion, crear, actualizar, eliminar } = require('../controllers/materiales.controller');

const router = Router();

router.use(verifyToken);

router.get('/curso/:idCurso', porCurso);
router.get('/leccion/:idLeccion', porLeccion);
router.post('/', crear);
router.put('/:id', actualizar);
router.delete('/:id', eliminar);

module.exports = router;

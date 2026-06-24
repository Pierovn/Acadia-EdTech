const { Router } = require('express');
const { verifyToken } = require('../middlewares/auth.middleware');
const { hilosPorCurso, crearHilo, responderHilo, actualizarHilo, eliminarHilo } = require('../controllers/foro.controller');

const router = Router();

router.use(verifyToken);

router.get('/curso/:id', hilosPorCurso);
router.post('/', crearHilo);
router.post('/:id/responder', responderHilo);
router.put('/:id', actualizarHilo);
router.delete('/:id', eliminarHilo);

module.exports = router;

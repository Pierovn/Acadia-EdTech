const { Router } = require('express');
const { verifyToken } = require('../middlewares/auth.middleware');
const { hilosPorCurso, crearHilo, responderHilo } = require('../controllers/foro.controller');

const router = Router();

router.use(verifyToken);

router.get('/curso/:id', hilosPorCurso);
router.post('/', crearHilo);
router.post('/:id/responder', responderHilo);

module.exports = router;

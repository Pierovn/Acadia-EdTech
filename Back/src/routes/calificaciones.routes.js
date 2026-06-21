const { Router } = require('express');
const { verifyToken } = require('../middlewares/auth.middleware');
const { listar, registrar } = require('../controllers/calificaciones.controller');

const router = Router();

router.use(verifyToken);

router.get('/', listar);
router.post('/', registrar);

module.exports = router;

const { Router } = require('express');
const { verifyToken } = require('../middlewares/auth.middleware');
const { obtener, actualizar } = require('../controllers/progreso.controller');

const router = Router();

router.use(verifyToken);

router.get('/:id_curso', obtener);
router.put('/:id_curso', actualizar);

module.exports = router;

const { Router } = require('express');
const { verifyToken } = require('../middlewares/auth.middleware');
const { matricularse, misCursos } = require('../controllers/matriculas.controller');

const router = Router();

router.use(verifyToken);

router.get('/mis-cursos', misCursos);
router.post('/', matricularse);

module.exports = router;

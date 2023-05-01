const { Router } = require('express');
const router = Router();
const { renderIndex, renderLogin, renderHome, verifyToken } = require('../controllers/index.controller')

router.get('/', renderIndex);

router.post('/api/login', renderLogin)

router.post('/api/home', verifyToken, renderHome);

module.exports = router;
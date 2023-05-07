const { Router } = require('express');
const router = Router();
const validate = require('../middlewares/validateTokenHandler');
const { renderIndex, renderLogin, renderHome, renderRegister, registerController } = require('../controllers/index.controller');

router.get('/', renderIndex);

router.get('/api/register', renderRegister).post('/api/register', registerController)

router.post('/api/login', renderLogin)

router.get('/api/home', validate, renderHome);

module.exports = router;
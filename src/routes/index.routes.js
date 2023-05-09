const { Router } = require('express');
const router = Router();
const validate = require('../middlewares/validateTokenHandler');
const { renderIndex, postLogin, renderUserInfo, registerController } = require('../controllers/index.controller');

router.get('/', renderIndex);

router.post('/api/register', registerController);

router.post('/api/login', postLogin);

router.get('/api/home', validate, renderUserInfo);

module.exports = router;
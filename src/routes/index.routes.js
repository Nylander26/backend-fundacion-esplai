//Dependencies requires
const { Router } = require('express');
const router = Router();
const { renderIndex, postLogin, renderUserInfo, registerController } = require('../controllers/index.controller');
const validate = require('../middlewares/validateTokenHandler');

//Route for the index page
router.get('/', renderIndex);

//Manages the logic for the registration of the user
router.post('/api/register', registerController);

//Manages the logic for the login process 
router.post('/api/login', postLogin);

//Secure route that shows the info of the current user
router.get('/api/home', validate, renderUserInfo);

module.exports = router;
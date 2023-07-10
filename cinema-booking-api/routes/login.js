const express = require('express');

const { registerView, loginView, registerUser, loginUser, setCookieAtLogout } = require('../controllers/loginController');

const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
router.use(cookieParser())

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/register', registerView);
router.get('/', loginView);
router.post('/api/register', urlencodedParser, registerUser);
router.post('/api/login', urlencodedParser, loginUser);
router.get('/logout',setCookieAtLogout)

module.exports = router;
const express = require('express')
const router = express.Router();
const { mainView, bookChair } = require('../controllers/mainController');
const cookieParser = require('cookie-parser');
router.use(cookieParser())

//request body parser
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/main', mainView);
router.post('/api/booking', urlencodedParser, bookChair)

module.exports = router
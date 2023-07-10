const express = require('express')
const router = express.Router();
const cookieParser = require('cookie-parser');
const { paymentView, sendMail } = require('../controllers/emailController');
router.use(cookieParser())
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/payment/:chairId', paymentView)
router.post('/api/pay/:chairId', urlencodedParser, sendMail)

module.exports = router;
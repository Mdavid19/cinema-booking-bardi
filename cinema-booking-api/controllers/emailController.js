const bookingService = require('../models/bookingService')
const emailService = require('../models/emailService')


const paymentView = (req, res) => {
    let chairId = req.params.chairId
    return res.render('payment', { title: 'Cinema Booking', chairId: chairId })
}

const sendMail = async (req, res) => {
    let chairId = req.params.chairId
    const isEmail = await emailService.sendEmailToClient(req.body.email, chairId)
    if (isEmail) {
        bookingService.setPaidChair(chairId);
    }
    return res.redirect('/main')
}


module.exports = {
    paymentView,
    sendMail
}
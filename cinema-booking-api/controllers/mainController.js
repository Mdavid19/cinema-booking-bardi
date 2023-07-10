const bookingService = require('../models/bookingService')
const clientService = require('../models/clientService');
require('dotenv').config();


const mainView = async (req, resp) => {
  let cookies = getCookies(req);
  if(cookies.user){
    let chairs = await bookingService.getChairs();
    return resp.render('main', { title: 'Cinema Booking', chairs: chairs })
  }
  return resp.redirect('/')
}

const bookChair = async (req, resp) => {
  // Acces data from request
  let cookies = getCookies(req);
  let username = cookies.user;
  let chairNum = req.body.chairId;

  //Get user data from database
  let user = await clientService.getClientByUsername(username);

  //booking chair
  let result = await bookingService.bookChair(chairNum, user.clientId)

  if (result) {
    return resp.status(200).redirect(`/payment/${chairNum}`);
  }
  return resp.status(500).redirect('/main')
}



function getCookies(req) {
  let cookies = {};
  const cookiesArray = req.headers.cookie.split(';');

  cookiesArray.forEach((cookie) => {
    const [key, value] = cookie.trim().split('=');
    cookies[key] = value;
  });
  return cookies;
}


module.exports = {
  mainView,
  bookChair
}
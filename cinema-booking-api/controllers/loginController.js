const clientService = require('../models/clientService');
const bcrypt = require('bcryptjs')


// compare password
async function comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}

const registerView = async (req, res) => {
    const clients = await clientService.getClients();
    res.render("register", {
        title: 'Cinema Booking',
        invalidRegistration:false
    });
}

const registerUser = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    bcrypt.hash(password, 10, async function (err, hash) {
        let result = await clientService.registerClients(username, hash)
        if(!result){
            return res.render("register",{ title: 'Cinema Booking', invalidRegistration:true})
        }
        return res.redirect('/')
    })
    
}

const loginView = (req, res) => {
    res.render("login", { title: 'Cinema Booking' });
}

const loginUser = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let user = await clientService.getClientByUsername(username)
    if (await comparePassword(password, user.password)) {
        res.cookie('user', username)
        return res.redirect('/main')
    }

    return res.redirect('/')
}

const setCookieAtLogout = (req, res) => {
    res.clearCookie('user')
    res.redirect('/')
}

module.exports = {
    registerView,
    loginView,
    registerUser,
    loginUser,
    setCookieAtLogout
}
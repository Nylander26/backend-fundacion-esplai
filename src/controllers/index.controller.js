const axios = require('axios');
const User = require('../models/users');

const indexCtrl = {}

indexCtrl.renderIndex = (req, res) => {
    res.send("hola mundo");
}

module.exports = indexCtrl;
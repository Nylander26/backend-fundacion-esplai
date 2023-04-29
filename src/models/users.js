const { Schema , model } = require('mongoose');

const userSchema = new Schema({
    name_user: String,
    lastname_user: String,
    user_email: String,
    password: String
}, {
    timestamps: true
})

module.exports = model('user', userSchema);
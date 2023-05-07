const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Por favor ingrese el nombre."],
    },
    lastname: {
        type: String,
        required: [true, "Por favor ingrese el apellido."],
    },
    email: {
        type: String,
        required: [true, "Por favor ingrese el email."],
        unique: [true, "Direccion de email ya registrada."],
    },
    password: {
        type: String,
        required: [true, "Por favor ingrese la contraseña."]
    },
    passwordChecker: {
        type: String,
        //required: [true, "Por favor ingrese la contraseña."]
    } 
}, {
    timestamps: true
})

module.exports = model('user', userSchema);
const mongoose = require('mongoose');//import 

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type:String,
        require: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type:String,
        require: true,
        max: 50,
        unique: true,
    },
    password: {
        type:String,
        require: true,
        min: 6,
    },
}, {timestamps: true})

module.exports = mongoose.model('Users',userSchema);
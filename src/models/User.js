const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email");
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [{token: {type: String}}]
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = User.findOne({email: email});
    if (!user) {
        throw new Error("Unable to login");
    }

    const passwordsMatch = await bcrypt.compare(password, user.password)
    if (!passwordsMatch) {
        throw new Error('Incorrect Password');
    }

    return user;
}

userSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({_id: this._id}, process.env.SECRET, {expires: "1 week"});
    this.tokens.push({token});
    return token;
}

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};
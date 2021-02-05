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
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [{token: {type: String}}]
});

userSchema.statics.findByCredentials = async (emailid, password) => {
    const user = await User.findOne({email: emailid});
    if (!user) {
        throw new Error("Unable to login");
    }

    const passwordsMatch = await bcrypt.compare(password, user.password)
    if (!passwordsMatch) {
        throw new Error('Incorrect Password');
    }

    return user;
}

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.SECRET, {expiresIn: '1 week'});
    this.tokens.push({token});
    return token;
}

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema ({
    login: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },
    password: {
        type: String,
        minlength: 4
    },
    ADMIN: {
        type: Boolean,
        default: false
    }
})

UserSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        this.password = this.encryptPassword(this.password);
    }
    return next();
})

UserSchema.methods = {
    authenticate (plainTextPassword) {
        return bcrypt.compareSync(plainTextPassword, this.password);
    },
    encryptPassword (password) {
        return bcrypt.hashSync(password, 8);
    }
}

module.exports = mongoose.model('User', UserSchema);
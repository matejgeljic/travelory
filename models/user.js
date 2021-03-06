const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
});

//virtual field
userSchema.virtual('password')
    .set(function(password) {
        //create temp var
        this._password = password
        //generate timestamp
        this.salt = uuidv1()
        //encrypt password
        this.hashed_password = this.encryptedPassword(password)
    })
    .get(function() {
        return this._password
    })

//methods
userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptedPassword(plainText) === this.hashed_password
    },

    encryptedPassword: function(password) {
        if(!password) return "";
        
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return ""
        }
    }
}


module.exports = mongoose.model("User", userSchema);
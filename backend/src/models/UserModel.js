const mongoose = require('mongoose')

class User {
    constructor() {
        const UserSchema = new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            image: {
                type: String
            },
            mobile: {
                type: Number,
                required: true,
                minLength: [10, 'Mobile Number should be of 10 characters'],
                maxLength: [10, 'Mobile Number should be of 10 characters'],
                unique: true
            }
        })

        const UserModel = mongoose.model('User', UserSchema)
        return UserModel
    }
}


module.exports = new User()
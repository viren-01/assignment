const UserModel = require("../models/UserModel")

class UserService {
    async create(name, image = "", mobile) {
        try {

            let oldMobile = await UserModel.exists({ mobile });
            if (oldMobile) return { err: true, msg: "Mobile Already Exists" }

            const newUser = await UserModel.create({ name, image, mobile })

            console.log(newUser)
            return newUser

        } catch (error) {
            console.log(error)
            return { err: true, status: 500, msg: "Internal Server Error"}
        }

    }

    async update(name, image = "", mobile) {
        try {

            const updateUser = await UserModel.updateOne({ mobile }, {
                $set: { name, image, mobile }
            })

            console.log(updateUser)
            return updateUser

        } catch (error) {
            console.log(error)
            return { err: true, status: 500, msg: "Internal Server Error"}
        }

    }

    async delete(mobile) {
        try {

            const deleteUser = await UserModel.deleteOne({ mobile })

            console.log(deleteUser)
            return deleteUser

        } catch (error) {
            console.log(error)
            return { err: true, status: 500, msg: "Internal Server Error"}
        }

    }

    async view() {
        try {
            const allUsers = await UserModel.find()

            return allUsers

        } catch (error) {
            console.log(error)
            return { err: true, status: 500, msg: "Internal Server Error"}
        }

    }
}

module.exports = new UserService()
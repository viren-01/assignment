const UserService = require('../services/UserService')

class UserController {
    async createUser(req, res) {
        try {
            console.log(req.body)
            const { name, image, mobile } = req.body

            if (!name) {
                res.status(400).send({ err: true, response: {}, msg: "Name is required" })
            }

            if (!mobile || mobile?.length != 10) {
                res.status(400).send({ err: true, response: {}, msg: "Mobile is required and should be of 10 characters" })
            }

            else {
                const serviceResponse = await UserService.create(name, image, mobile)

                if (serviceResponse?.err) {
                    return res.status(400).send({ err: true, msg: "Mobile number already exists" })
                }

                return res.status(201).send({ err: false, response: serviceResponse, msg: "User Created Successfully" })

            }
        } catch (error) {
            console.log(error)
            res.status(500).send({ error: true, status: 500, response: error })
        }

    }


    async updateUser(req, res) {
        try {
            console.log(req.body)
            const { name, image, mobile } = req.body

            if (!mobile || mobile?.length != 10) {
                res.status(400).send({ err: true, response: {}, msg: "Mobile is required and should be of 10 characters" })
            }

            else {
                const serviceResponse = await UserService.update(name, image, mobile)

                res.status(200).send({ err: false, response: serviceResponse, msg: "User Updated Successfully" })

            }
        } catch (error) {
            console.log(error)
            res.status(500).send({ error: true, status: 500, response: error })
        }

    }

    async deleteUser(req, res) {
        try {
            console.log(req.body)
            const { mobile } = req.body

            console.log("ksajf", mobile)

            console.log(mobile.length)

            if (!mobile || mobile?.length != 10) {
                res.status(400).send({ err: true, response: {}, msg: "Mobile is required and should be of 10 characters" })
            }

            else {
                const serviceResponse = await UserService.delete(Number(mobile))

                res.status(200).send({ err: false, response: serviceResponse, msg: "User deleted Successfully" })

            }
        } catch (error) {
            console.log(error)
            res.status(500).send({ error: true, status: 500, response: error })
        }

    }

    async viewUser(req, res) {
        try {
            const serviceResponse = await UserService.view()

            return res.status(200).send({ err: false, response: serviceResponse, msg: "Success" })

        } catch (error) {
            console.log(error)
            res.status(500).send({ error: true, status: 500, response: error })
        }

    }

}

module.exports = new UserController()
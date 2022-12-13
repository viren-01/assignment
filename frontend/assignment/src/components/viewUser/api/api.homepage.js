import Axios from 'axios'

class HomeService {
    static viewUsers = async (mobile) => {
        try {
            const data = await Axios.get(`http://localhost:3000/view`, {params: {mobile}}, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
            })

            if (!data) return { err: true, statusCode: 500 }
            return {err: false, statusCode: 200, response: data}
        } catch (error) {
            console.log(error)
            return { err: true, statusCode: 500}
        }
    }

    static deleteUsers = async (mobile) => {
        try {
            const data = await Axios.post(`http://localhost:3000/deleteUser`,{
                mobile
            } ,{
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
            })

            if (!data) return { err: true, statusCode: 500 }
            return {err: false, statusCode: 200, response: data}
        } catch (error) {
            console.log(error)
            return { err: true, statusCode: 500}
        }
    }

    static createUser = async (mobile, name, image) => {
        try {
            const data = await Axios.post(`http://localhost:3000/createUser`,{
                mobile, name, image
            } ,{
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
            })

            if (!data) return { err: true, statusCode: 500 }
            return {err: false, statusCode: 201, response: data}
        } catch (error) {
            console.log(error)
            return { err: true, statusCode: 500}
        }
    }

    static editUser = async (mobile, name, image) => {
        try {
            const data = await Axios.post(`http://localhost:3000/updateUser`,{
                mobile, name, image
            } ,{
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
            })

            if (!data) return { err: true, statusCode: 500 }
            return {err: false, statusCode: 200, response: data}
        } catch (error) {
            console.log(error)
            return { err: true, statusCode: 500}
        }
    }
}

export default HomeService
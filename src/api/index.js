import axios from "axios"
const get = async (url, token) => {

    return new Promise(async (resolve, reject) => {
        try {
            let headers = {}
            if (token != null) {
                headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, }
            }
            const response = await axios.get(url, {
                headers: headers
            })
            console.log("axios", response.data);
            resolve(response.data)
        } catch (err) {
            console.log(err);
            reject(err)
        }



    })
}

const post = async (url, object, token) => {
    console.log("URL: " + url);
    console.log("OBJECT: " + object);
    return new Promise(async (resolve, reject) => {
        let headers = {}
        try {
            if (token != null) {
                headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, }
            }
            const response = await axios.post(url, object, {
                headers: headers
            })
            console.log("axios", response.data);
            resolve(response.data)
        } catch (err) {
            reject(err)
        }

    })
}

const file = async (url, fd) => {

    return new Promise(async (resolve, reject) => {

        setTimeout(async () => {
            try {
                const response = await axios.post(url, fd, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                console.log("axios", response.data);
                resolve(response.data)
            } catch (err) {
                reject(err)
            }

        }, 1000);

    })
}


const get_test = () => get("http://localhost:3000/api/tests/first_test")
const confirm_account = async (token) => get("http://localhost:3000/api/user/confirm?token=" + token)
const get_photos = () => get("")

const register_user_post = async (object) => post("http://localhost:3000/api/user/register", object)
const postDataAndToken = (object) => post("http://localhost:3000/api/authtoken", object, token)
const login_user = (login_info) => post("http://localhost:3000/api/user/login", login_info)

export {
    get_test,
    register_user_post,
    confirm_account,
    postDataAndToken,
    login_user
}
import axios from "axios"
const get = async (url, token, responseType) => {

    return new Promise(async (resolve, reject) => {
        try {
            let headers = {}
            let response_type = ""
            if (token != null) {
                headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, }
            }
            if (responseType != null) {
                response_type = responseType
            }

            const response = await axios.get(url, {
                headers: headers,
                responseType: response_type
            })
            resolve(response.data)
        } catch (err) {
            console.log(err);
            reject(err)
        }



    })
}

const patch = async (url, token, object) => {
    console.log(token + "ffwfweff");
    console.log(object + "FWEJIPFIJEOWWEJOIFWEJIO");
    return new Promise(async (resolve, reject) => {
        try {
            let headers = {}
            if (token != null) {
                headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, }
            }
            const response = await axios.patch(url, object, {
                headers: headers,
            })
            resolve(response.data)
        } catch (err) {
            console.log(err);
            reject(err)
        }



    })
}

const post = async (url, object, token, responseType) => {
    console.log("URL: " + url);
    console.log("OBJECT: " + object);
    return new Promise(async (resolve, reject) => {
        let headers = {}
        let response_type = ""
        try {
            if (token != null) {
                headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, }
            }
            if (responseType != null) {
                response_type = responseType
            }
            const response = await axios.post(url, object, {
                headers: headers,
                responseType: response_type
            })
            console.log("axios", response.data);
            resolve(response.data)
        } catch (err) {
            reject(err)
        }

    })
}



const file = async (url, token, fd) => {

    return new Promise(async (resolve, reject) => {
        let auth_token = token

        try {
            let headers = { 'Content-Type': 'multipart/form-data' }
            if (token != null) {
                headers = { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}`, }
            }
            const response = await axios.post(url, fd, {
                headers: headers,
            })
            console.log("axios", response.data);
            resolve(response.data)
        } catch (err) {
            reject(err)
        }


    })
}

const file_filter = async (url, token, fd) => {

    return new Promise(async (resolve, reject) => {
        let auth_token = token

        try {
            let headers = { 'Content-Type': 'multipart/form-data' }
            if (token != null) {
                headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, }
            }
            const response = await axios.post(url, fd, {
                headers: headers,
                responseType: 'blob'
            })
            console.log("axios", response.data);
            resolve(response.data)
        } catch (err) {
            reject(err)
        }


    })
}

const patch_file = async (url, token, fd) => {

    return new Promise(async (resolve, reject) => {
        let auth_token = token

        try {
            let headers = { 'Content-Type': 'multipart/form-data' }
            if (token != null) {
                headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, }
            }
            const response = await axios.patch(url, fd, {
                headers: headers,
            })
            console.log("axios", response.data);
            resolve(response.data)
        } catch (err) {
            reject(err)
        }


    })
}

const confirm_account = async (token) => get("http://localhost:3000/api/user/confirm?token=" + token)

const get_photos_list = async (token) => {

    let response = await get("http://localhost:3000/api/photos", token)
    return response

}
const get_photo = async (photo_id, token) => {
    console.log("PHOTO_ID: " + photo_id);
    let buffer = await get(photo_id, token)
    console.log("BUFFER: " + buffer);
    return buffer
}

const get_photo_blob = async (photo_id, token) => {
    console.log("PHOTO_ID: " + photo_id);
    let buffer = await get(photo_id, token, "blob")
    console.log("BUFFER: " + buffer);
    return buffer
}


const get_profile_picture = async (token) => {
    let buffer = await get("http://localhost:3000/api/profile/picture", token, "blob")

    return buffer
}

const get_user_profile_picture = async (token, email) => {
    let buffer = await post("http://localhost:3000/api/profile/picture/user", email, token, "blob")
    return buffer
}

const get_user_pictures = async (token) => {

    let buffer = await get("http://localhost:3000/api/profile/images", token)
    return buffer
}

const get_other_user_pictures = async (token, email) => {

    let buffer = await post("http://localhost:3000/api/profile/user/images", email, token)
    return buffer
}

const register_user_post = async (object) => post("http://localhost:3000/api/user/register", object)

const postDataAndToken = (object, token) => post("http://localhost:3000/api/authtoken", object, token)

const login_user = (login_info) => post("http://localhost:3000/api/user/login", login_info)

const logout_user = async (token) => {
    let data = await get("http://localhost:3000/api/profile/logout", token)
    console.log(data);
    return data
}

const post_photo = async (token, data) => {
    let buffer = await file("http://localhost:3000/api/photos", token, data)
    return buffer
}

const patch_photo = async (id, token, data) => {
    let buffer = await patch_file("http://localhost:3000/api/filters/" + id, token, data)
    return buffer
}

const get_filtered_photo = async (token, data) => {
    console.log(data);
    let buffer = await file_filter("http://localhost:3000/api/filters", token, data)
    return buffer
}

const update_tags = async (token, id, data) => {
    console.log("http://localhost:3000/api/photos" + id + "/tags/mass");
    console.log(token);
    console.log(data + "FEKOWFWOIJFWEIOFWEIJFWEIJFWEOJIFWEJIOFWEOIJFWEJFOWEOJFEJOI");
    let buffer = await patch("http://localhost:3000/api/photos/" + id + "/tags/mass", token, data)
    return buffer
}

const change_profile_picture = async (token, data) => {
    let response = await file("http://localhost:3000/api/profile", token, data)
    return response
}

const change_profile_info = async (token, data) => {
    let response = await patch("http://localhost:3000/api/profile", token, data)
}

export {
    register_user_post,
    confirm_account,
    postDataAndToken,
    login_user,
    get_photos_list,
    get_photo,
    get_profile_picture,
    get_user_pictures,
    logout_user,
    post_photo,
    get_filtered_photo,
    update_tags,
    get_photo_blob,
    patch_photo,
    get_user_profile_picture,
    get_other_user_pictures,
    change_profile_picture,
    change_profile_info
}
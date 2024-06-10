import { postDataAndToken, get_photos_list, get_photo, get_photo_blob } from "@/api/index.js"
const photos_store = {
    state() {
        return {
            photos_list: null
        }
    },
    getters: {
        GET_PHOTO_LIST(state) {
            return state.photos_list
        }
    },

    mutations: {
        SET_PHOTO_LIST(state, loaded_photos) {
            state.photos_list = loaded_photos
        }
    },

    actions: {
        async FETCH_PHOTOS_LIST({ state, commit, rootState }) {
            let token = rootState.auth.auth_token
            console.log(token);
            let data = await get_photos_list(token)
            console.log("HALO: " + data);
            commit("SET_PHOTO_LIST", data)
            return data
        },

        async FETCH_PHOTO({ state, commit, rootState }, id) {
            let reader = new FileReader()
            let token = rootState.auth.auth_token
            let photo_buffer = await get_photo(id, token)
            return new Promise((resolve, reject) => {
                reader.onloadend = function () {
                    const base64Photo = reader.result;
                    resolve(base64Photo); // Resolve the promise with the Base64 photo string
                };

                reader.onerror = function (error) {
                    reject(error); // Reject the promise if there's an error
                };

                // Convert the buffer to a Blob and read it as a data URL
                let blob = new Blob([photo_buffer], { type: 'image/png' });
                reader.readAsDataURL(blob);
            });
        },

        async FETCH_PHOTO_BLOB({ state, commit, rootState }, id) {
            console.log("ID: " + id);
            let reader = new FileReader()
            let token = rootState.auth.auth_token
            let photo_buffer = await get_photo_blob(id, token)

            return new Promise((resolve, reject) => {
                reader.onloadend = function () {
                    const base64Photo = reader.result;
                    resolve(base64Photo); // Resolve the promise with the Base64 photo string
                };

                reader.onerror = function (error) {
                    reject(error); // Reject the promise if there's an error
                };

                // Convert the buffer to a Blob and read it as a data URL
                let blob = new Blob([photo_buffer], { type: 'image/png' });
                reader.readAsDataURL(blob);
            });
        },
    }
}

export default photos_store
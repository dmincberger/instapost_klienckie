import { get_profile_picture, get_user_pictures, post_photo, get_filtered_photo, update_tags, patch_photo, get_user_profile_picture, get_other_user_pictures, change_profile_picture, change_profile_info } from "@/api/index.js"

const profile_store = {

    //state
    state() {
        return {
            profile_pic: null,
            profile_photo_list: null,
            photo_edit_info: null,
            photo_edit_image: null,
        }
    },

    //mutations czyli setters
    mutations: {
        async SET_PROFILE_PHOTO_LIST(state, photos) {
            console.log("SETTING");
            state.profile_photo_list = photos
        },
        async SET_PHOTO_EDIT_INFO(state, photo_info) {
            state.photo_edit_info = photo_info
        },
        async SET_PHOTO_EDIT_IMAGE(state, photo_image) {
            state.photo_edit_image = photo_image
        },
    },

    //getters
    getters: {
        async GET_PROFILE_PHOTO_LIST(state) {
            return state.profile_photo_list
        },
        async GET_PHOTO_EDIT_INFO(state) {
            return state.photo_edit_info
        },
        async GET_PHOTO_EDIT_IMAGE(state) {
            return state.photo_edit_image
        },
    },

    // tu zapytania do serwera z pomocą naszego api
    actions: {
        async FETCH_PROFILE_PICTURE({ state, commit, rootState }) {
            let token = rootState.auth.auth_token
            let buffer = await get_profile_picture(token, "blob")
            return URL.createObjectURL(buffer)
        },
        async FETCH_USER_PROFILE_PICTURE({ state, commit, rootState }, email) {
            let token = rootState.auth.auth_token
            let buffer = await get_user_profile_picture(token, email, "blob")
            return URL.createObjectURL(buffer)
        },
        async FETCH_PROFILE_PHOTOS_LIST({ state, commit, rootState }) {
            let token = rootState.auth.auth_token
            let data = await get_user_pictures(token)
            console.log("HALO: " + JSON.stringify(data));
            await commit("SET_PROFILE_PHOTO_LIST", data)
        },
        async FETCH_USER_PHOTOS_LIST({ state, commit, rootState }, email) {
            let token = rootState.auth.auth_token
            let data = await get_other_user_pictures(token, email)
            console.log("HALO: " + JSON.stringify(data));
            return data
        },
        async POST_PHOTO({ state, commit, rootState }, photo_data) {
            let token = rootState.auth.auth_token
            let response = await post_photo(token, photo_data)
            return response
        },

        async PATCH_PHOTO({ state, commit, rootState }, object) {
            let token = rootState.auth.auth_token
            let id = object.id
            let data = object.photo_data
            let response = await patch_photo(id, token, data)
            return response
        },

        async FETCH_FILTERED_PHOTO({ state, commit, rootState }, photo_data) {
            console.log(photo_data);
            let token = rootState.auth.auth_token
            let response = await get_filtered_photo(token, photo_data)
            return response
        },
        async SET_EDIT_INFO({ state, commit }, photo_info) {
            await commit("SET_PHOTO_EDIT_INFO", photo_info)
        },
        async SET_EDIT_IMAGE({ state, commit }, photo_image) {
            await commit("SET_PHOTO_EDIT_IMAGE", photo_image)

        },

        async UPDATE_TAG({ state, commit, rootState }, object) {
            let token = rootState.auth.auth_token
            console.log("ID: " + object.id);
            console.log("TAGS: " + object.tags);
            let response = await update_tags(token, object.id, object.tags)
            return response
        },

        async CHANGE_PICTURE({ state, commit, rootState }, object) {
            let token = rootState.auth.auth_token
            let response = await change_profile_picture(token, object)
            return response
        },

        async CHANGE_INFO({ state, commit, rootState }, info_object) {
            let token = rootState.auth.auth_token
            let response = await change_profile_info(token, info_object)
            return response
        }

    }

}

export default profile_store
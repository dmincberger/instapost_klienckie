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
            this.photos_list = loaded_photos
        }
    },

    actions: {
        FETCH_PHOTOS({ state, commit }) {

        }
    }
}

export default photos_store
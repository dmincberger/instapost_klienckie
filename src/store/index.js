import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import account_store from './account_store.js'
import photos_store from './photos_store.js';
import profile_store from './profile_store.js'

const modules = {
    auth: account_store,
    photos: photos_store,
    profile: profile_store
}
const store = createStore({
    modules,
    plugins: [createPersistedState()]
})

export default store
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import account_store from './account_store.js'
import photos_store from './photos_store.js';

const modules = {
    account_store,
    photos_store
}
const store = createStore({
    modules,
    plugins: [createPersistedState()]
})

export default store
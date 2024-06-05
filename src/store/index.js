import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import tests from './test.js'

const modules = {
    tests
}
const store = createStore({
    modules,
    plugins: [createPersistedState()]
})

export default store
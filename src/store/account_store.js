import { get_test, register_user_post, confirm_account, login_user } from "@/api"

const account_store = {

    //state
    state() {
        return {
            test_list: [],
            test_loading: false,
            test_error: null,
            auth_token: null,
        }
    },

    //mutations czyli setters
    mutations: {
        SET_TEST_LIST(state, new_test) {
            state.test_list = new_test
        },
        SET_TOKEN(state, new_auth_token) {
            state.auth_token = new_auth_token
        },
    },

    //getters
    getters: {
        GET_TEST_LIST(state) {
            return state.test_list
        },
        GET_CONFIRMATION_LINK(state) {
            console.log("ZWRACANE: " + state.confirm_link);
            return state.confirm_link
        },
        GET_AUTH_TOKEN(state) {
            return state.auth_token
        }
    },

    // tu zapytania do serwera z pomocą naszego api
    actions: {
        async FETCH_TEST({ state, commit }) {

            // najpierw ustawiamy stan ładowania na true

            // potem wywołujemy funkcję z api, która
            // odbiera dane z serwera (poprzez axios) i ustawia listę cars w store
            // w razie błędu ustawia error w store (catch)
            // niezależnie od błędu lub jego braku (finally), kończy loading
            const data = await get_test()
            console.log("axios", data);
            commit("SET_TEST_LIST", data)
        },

        async REGISTER_USER({ state, commit }, register_info) {
            console.log("TO JEST INFO: " + JSON.stringify(register_info));
            const data = await register_user_post(register_info)
            if (data.match(/\/api\/user\/confirm\?token=([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/)) {
            }
            return data
        },

        async LOGIN_USER({ state, commit }, login_info) {
            const data = await login_user(login_info)
            console.log("LOGIN ODP STORE: " + data);
            if (data["JWT"] != undefined) {
                commit("SET_TOKEN", data["JWT"])
            }
            return data
        },

        async CONFIRM_ACCOUNT({ state, commit }, token) {
            const data = await confirm_account(token)
            console.log(data);
            return data
        },


    }

}

export default account_store
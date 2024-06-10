import { register_user_post, confirm_account, login_user, logout_user } from "@/api"

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
            console.log(new_auth_token + "KOG");
            state.auth_token = new_auth_token
        },
    },

    //getters
    getters: {
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


        // najpierw ustawiamy stan ładowania na true

        // potem wywołujemy funkcję z api, która
        // odbiera dane z serwera (poprzez axios) i ustawia listę cars w store
        // w razie błędu ustawia error w store (catch)
        // niezależnie od błędu lub jego braku (finally), kończy loading



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
                console.log("CO");
                commit("SET_TOKEN", data["JWT"])
            }
            return data
        },

        async CONFIRM_ACCOUNT({ state, commit }, token) {
            const data = await confirm_account(token)
            console.log(data);
            return data
        },

        async LOGOUT_USER({ state, commit }) {
            let token = state.auth_token
            const data = await logout_user(token)
            console.log(data);

            if (data == "success" || data == "expired") {
                commit("SET_TOKEN", null)
                console.log(token);
                return data
            } else {
                return "error: " + data
            }
        }

    }

}

export default account_store
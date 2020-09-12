import axios from 'axios'
export default{
    namespaced: true,

    state: {
        token: null,
        user: { "name": null,
                "email": null,
                "role": null
        },
    },

    getters: {
        authenticated (state) {
            return state.token && state.user
        },

        user (state){
            return state.user
        }
    },

    mutations: {
        SET_TOKEN (state, token){
            state.token =token
        },
        SET_USER (state, user){
            state.user =user
        },
    },
    actions: {
        async login({ dispatch }, credentials){
            await axios.post('auth/login', credentials)
            .then((result)=>{
                console.log(result.data.data.token); 
                return dispatch('attempt', result.data.data.token)
            })
            .catch((error)=>{
                console.log(error); 
            })
        },
        async attempt ( { commit, state }, token){
            if(token){
                commit('SET_TOKEN', token)
            }
            if(!state.token){
                return
            }
            try {
                let response = await axios.get('auth/user',{
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                commit('SET_USER', response.data.data.user)
            }catch(e){
                commit('SET_USER', {"name": null,
                                    "email": null,
                                    "role": null
                })
                commit('SET_TOKEN', null)
            }
        },
        logout({ commit, state }) {
            return axios.get('auth/logout',{
                    headers: {
                        'Authorization': 'Bearer ' + state.token
                    }
                }).then(() =>{
                    commit('SET_USER', {"name": null,
                                        "email": null,
                                        "role": null
                    })
                    commit('SET_TOKEN', null)
            })
        }
    },
    modules: {
    }
}

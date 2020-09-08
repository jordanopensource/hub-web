// Authentication Store
const cookieparser = process.server ? require('cookieparser') : undefined;
const cookie = process.client ? require('js-cookie') : undefined;
import axios from 'axios';

const state = () => {
  return {
    auth: null,
    user: null
  }
};

const getters = {
  auth(state) {
    return (state.auth)
  },
  user(state) {
    return (state.user)
  }
};

const mutations = {
  setAuth(state, auth) {
    state.auth = auth
  },
  setUser(state, user) {
    state.user = user
  }
};

const actions = {
  async nuxtServerInit({commit},{req}) {
    let auth = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = JSON.parse(parsed.auth);
        await axios.get(process.env.baseUrl + '/users/' + auth.id).then(res => commit('setUser', res.data))
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setAuth', auth)
  },
  logout({commit}) {
    cookie.remove('auth')
    commit('setAuth', null)
    commit('setUser', null)
  },
  async login({commit}, credintials) {
    await axios.post(process.env.baseUrl + '/auth/local', credintials)
      .then(response => {
        const auth = {
          accessToken: response.data.jwt,
          username: response.data.user.username,
          id: response.data.user.id
        }
        const user = response.data.user
        commit('setAuth', auth)
        commit('setUser', user)
        cookie.set('auth', auth, {
          sameSite: 'lax',
          secure: true
        })
      })
      .catch(e => error(e))
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}

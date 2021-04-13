// Members Store
import axios from 'axios';

const state = {
  loadedMembers: [],
  membersCount: 1,
  regRes: null,
  updateRes: null,
  loadedUser: null,
  excludedContributors: [],

};

const getters = {
  loadedMembers(state) {
    return (state.loadedMembers)
  },
  loadedUser(state) {
    return (state.loadedUser)
  },
  membersCount(state) {
    return (state.membersCount)
  },
  regRes(state) {
    return (state.regRes)
  },
  updateRes(state) {
    return (state.updateRes)
  },
  excludedContributors(state) {
    return (state.excludedContributors)
  },

};

const mutations = {
  setMembers(state, members) {
    state.loadedMembers = members
  },
  setloadedUser(state, user) {
    state.loadedUser = user
  },
  setMembersCount(state, count) {
    state.membersCount = count
  },
  addMember(state, user) {
    state.loadedMembers.push(user)
  },
  setRegRes(state, res) {
    state.regRes = res
  },
  setUpdateRes(state, res) {
    state.updateRes = res
  },
  setExcludedContributors(state, res) {
    state.excludedContributors = res
  },

};

const actions = {
  async fetchUsers(vuexContext, context) {      //gets all users
    let request
    if (vuexContext.getters.auth) {
      const token = vuexContext.getters.auth.accessToken;
      const header = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      let path = process.env.baseUrl + "/users?_sort=memberSince:DESC"
      request = [path, header]
    } else {
      request = [process.env.baseUrl + "/users/public?_sort=memberSince:DESC"]
    }
    await axios.get(...request)
      .then(res => {
        const membersArray = []
        for (const key in res.data) {
          membersArray.push({
            ...res.data[key]
          })
        }
        vuexContext.commit("setMembers", membersArray);
      })
      .catch(e => context.error(e));
  },
  async fetchOneUser(vuexContext, userId) {
    let request
    if (vuexContext.getters.auth) {
      const token = vuexContext.getters.auth.accessToken;
      const header = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      let path = process.env.baseUrl + "/users/" + userId
      request = [path, header]
    } else {
      request = [process.env.baseUrl + "/users/public/" + userId]
    }
    await axios.get(...request)
      .then(res => {
        vuexContext.commit("setloadedUser", res.data);
      })
  },
  async countMembers(vuexContext, context) {
    await axios
      .get(process.env.baseUrl + "/users/count")
      .then(res => {
        const count = res.data
        vuexContext.commit("setMembersCount", count);
      })
      .catch(e => context.error(e));
  },
  async newUser(vuexContext, user) {
    await axios.post(process.env.baseUrl + "/auth/local/register", user)
      .then(res => {
        vuexContext.commit("setRegRes", res);
      })
      .catch(error => {
        vuexContext.commit("setRegRes", error.response);
      })
  },
  async updateUser(vuexContext, user) {
    const token = vuexContext.getters.auth.accessToken;
    const header = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    await axios.put(process.env.baseUrl + "/users/" + user.id, user, header)
      .then(res => {
        vuexContext.commit("setUpdateRes", res);
        vuexContext.commit("setUser", res.data);
      })
      .catch(error => {
        vuexContext.commit("setUpdateRes", error.response);
      })
  },
  async fetchExcludeContributors(vuexContext, context) {      //gets users except contributors
    let request
    if (vuexContext.getters.auth) {
      const token = vuexContext.getters.auth.accessToken;
      const header = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      let path = process.env.baseUrl + "/users?_sort=memberSince:DESC&membershipType=supporter&membershipType=active"
      request = [path, header]
    } else {
      request = [process.env.baseUrl + "/users/public?_sort=memberSince:DESC&membershipType=supporter&membershipType=active"]
    }
    await axios.get(...request)
      .then(res => {
        const membersArray = []
        for (const key in res.data) {
          membersArray.push({
            ...res.data[key]
          })
        }
        vuexContext.commit("setExcludedContributors", membersArray);
      })
      .catch(e => context.error(e));
  },
};

export default {
  state,
  mutations,
  actions,
  getters
}

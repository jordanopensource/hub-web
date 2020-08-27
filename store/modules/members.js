// Members Store
import axios from 'axios';

const state = {
  loadedMembers: [],
  membersCount: 1,
  regRes: null
};

const getters = {
  loadedMembers(state) {
    return (state.loadedMembers)
  },
  membersCount(state) {
    return (state.membersCount)
  },
  regRes(state) {
    return (state.regRes)
  },

};

const mutations = {
  setMembers(state, members) {
    state.loadedMembers = members
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
};

const actions = {
  async fetchMembers(vuexContext, context) {
    await axios
      .get(process.env.baseUrl + "/users?_sort=memberSince:DESC")
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
    .then(res=>{
      vuexContext.commit("setRegRes", res);
    })
    .catch(error=>{
      vuexContext.commit("setRegRes", error.response);
    })
  },
};

export default {
  state,
  mutations,
  actions,
  getters
}

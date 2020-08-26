// Tasks Store
import axios from 'axios';

const state = {
  assignees: []
};

const getters = {
  assignees(state) {
    return (state.assignees)
  }
};

const mutations = {
  setAssignees(state, assignees) {
    state.assignees = assignees
  }
};

const actions = {
  async addAssignee(context, task) {
    await axios
      .put(process.env.baseUrl + "/tasks/" + task.id, task)
      .then(res => {
        var ar = res.data.assignees.map((assignee) => assignee.user.id);
        vuexContext.commit("setAssignees", ar);
        })
      .catch(e => context.error(e));
  },
  setAssignees(vuexContext, assigneesArray) {
    vuexContext.commit("setAssignees", assigneesArray);
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}

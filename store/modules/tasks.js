// Tasks Store
import axios from 'axios';

const state = {
  applicants: []
};

const getters = {
  applicants(state) {
    return (state.applicants)
  }
};

const mutations = {
  setApplicants(state, applicants) {
    state.applicants = applicants
  }
};

const actions = {
  async addApplicant(vuexContext, task) {
    const token = vuexContext.getters.auth.accessToken;
    const header = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    await axios
      .put(process.env.baseUrl + "/tasks/" + task.id, task, header)
      .then(res => {
        var ar = res.data.applicants.map((applicant) => applicant.user.id);
        vuexContext.commit("setApplicants", ar);
        })
  },
  setApplicants(vuexContext, applicantsArray) {
    vuexContext.commit("setApplicants", applicantsArray);
  },
  addTask(vuexContext, task) {
    const token = vuexContext.getters.auth.accessToken;
    const header = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    const newTask = {}
    for (var key in task) {
      if (task.hasOwnProperty(key) && task[key] != null) {
        newTask[key] = task[key]
      }
    }
    newTask.taskOwner = {
      id: vuexContext.getters.auth.id
    }
    return axios.post(process.env.baseUrl + "/tasks", newTask, header)
    .then(res => {
      console.log(res.data)
    })
    .catch(e => context.error(e));
  },
  editTask(vuexContext, editedTask) {
    const token = vuexContext.getters.auth.accessToken;
    const header = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    return axios.put(process.env.baseUrl + "/tasks/" + editedTask.id, editedTask, header)
      .then(res => {
        console.log(res.data)
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

// Tasks Store
import axios from 'axios';

const actions = {
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
    .then(res => {})
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
      .then(res => {})
      .catch(e => context.error(e));
  },
};

export default {
  actions
}

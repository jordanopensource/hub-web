import Vuex from 'vuex';
import members from './modules/members';
import auth from './modules/auth';
import menus from './modules/menus';
import tasks from './modules/tasks';

const createStore = () => {
  return new Vuex.Store({
    modules: {
        members,
        auth,
        menus,
        tasks
    }
  })
}
export default createStore

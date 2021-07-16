import { createStore } from 'redux';
import backend from '../common/backend';
import actions from './actions';
import reducers from './reducers';

class ReduxHelper {
  getStore() {
    if (!this.store) {
      this.store = createStore(reducers);
    }
    return this.store;
  }

  async getProjects() {
    const projects = await backend.getProjects();
    this.store.dispatch(actions.setProjects(projects));
  }
}

export default new ReduxHelper();

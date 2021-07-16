import cloudbase from '@cloudbase/js-sdk';

class BackEnd {
  async initialize() {
    this.app = cloudbase.init({
      env: 'quadratic-funding-1edc914e16f235',
      region: 'ap-guangzhou',
    });
    this.db = this.app.database();
  }

  getDatabase = () => {
    return this.db;
  };

  getApp = () => {
    return this.app;
  };

  login = async () => {
    const auth = this.getApp().auth();
    await auth.anonymousAuthProvider().signIn();
  };

  async getProjects() {
    const result = await this.getDatabase().collection('projects').get();
    return result.data;
  }
}

export default new BackEnd();

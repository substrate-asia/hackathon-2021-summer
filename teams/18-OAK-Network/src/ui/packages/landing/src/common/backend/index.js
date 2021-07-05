
class BackEnd {
  async initialize () {
    const cloudbase = (await import('@cloudbase/js-sdk')).default;
    const app = cloudbase.init({
      env: 'quadratic-funding-1edc914e16f235',
      region: 'ap-guangzhou'
    });
    this.db = app.database();
  }

  async getProjects () {
    const result = await this.db.collection("projects").get();
    return result.data;
  }
}

export default new BackEnd();

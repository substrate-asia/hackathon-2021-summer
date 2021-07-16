import _ from 'lodash';
import { getWeb3Api } from 'common/utils';

class QuadraticFunding {
  constructor() {
    this.api = '';
  }

  // Initial the Polkadot.js api promise
  async init() {
    this.api = await getWeb3Api();
  }

  // Storage Module

  /**
   * Read the QuadraticFunding's storage data
   * @param {*} method QuadraticFunding's method name
   * @param  {...any} args QuadraticFunding's method's params
   */
  readStorage(method, ...args) {
    return this.api.query.quadraticFunding[method](...args);
  }

  async getCurrentBlockNumber() {
    const blockNumber = await this.api.query.system.number();
    return blockNumber.toNumber();
  }

  async getProjectCount() {
    const projectCount = await this.readStorage('projectCount');
    return projectCount.toNumber();
  }

  async getProjectInfo(projectIndex) {
    const projectInfo = await this.readStorage('projects', projectIndex);
    return projectInfo;
  }

  async getGrantRoundCount() {
    const roundCount = await this.readStorage('roundCount');
    return roundCount.toNumber();
  }

  async getGrantRoundInfo(grantRoundIndex) {
    const roundInfo = await this.readStorage('rounds', grantRoundIndex);
    return roundInfo;
  }

  async getIdentity(accountId) {
    const identity = await this.api.query.identity.identityOf(accountId);
    return identity;
  }
}

export default QuadraticFunding;

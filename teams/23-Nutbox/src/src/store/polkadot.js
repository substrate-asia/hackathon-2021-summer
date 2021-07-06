import Cookie from 'vue-cookies'
import {
  LOCALE_KEY
} from '../config'

export default {
  namespaced: true,
  state: {
    // polkadot
    api: null,
    apiState: null,
    subBalance: {},
    subLocked: {},
    subNominators: {},
    subBonded: {},
    bonded: '',
    nominators: [],
    // communityIds
    communitys: [],
    // projectIds
    projects: [],
    crowdstakings: [],
    isConnected: true,
    loadingStaking: true,
    account: Cookie.get('polkadot-account'),
    allAccounts: [],
    balance: 0,
    locked: 0,
    totalStaked: 0,
    unLocking: 0,
    redeemable: 0,
    currentBlockNum: {},
    allValidatorInfosInOurDB: [],

    // crowdloan
    subFund: {},
    auctionEnd: {},
    showingCrowdloan: {},
    clCommunitys: [],
    loadingFunds: true,
    loadingContributions: true,
    clProjectFundInfos: [],
    clLeasePeriod: {}
  },
  mutations: {
    // pokadot
    saveCommunitys: (state, communitys) => {
      state.communitys = communitys
    },
    saveProjects: (state, projects) => {
      state.projects = projects
    },
    saveCrowdstakings: (state, crowdstakings) => {
      state.crowdstakings = crowdstakings
    },
    saveSubBalance: (state, subBalance) => {
      state.subBalance = subBalance
    },
    saveSubLocked: (state, subLocked) => {
      state.subLocked = subLocked
    },
    saveSubNominators: (state, subNominators) => {
      state.subNominators = subNominators
    },
    saveSubBonded: (state, subBonded) => {
      state.subBonded = subBonded
    },
    saveBonded: (state, bonded) => {
      state.bonded = bonded
    },
    saveNominators: (state, nominators) => {
      state.nominators = nominators
    },
    saveApiState: (state, apiState) => {
      state.apiState = apiState
    },
    saveIsConnected: (state, isConnected) => {
      state.isConnected = isConnected
    },
    saveLoadingStaking: (state, loadingStaking) => {
      state.loadingStaking = loadingStaking
    },
    saveApi: (state, api) => {
      state.api = api
    },
    // saveIsConnected: (state, isConnected) => {
    //   state.isConnected = isConnected
    // },
    saveAccount: (state, account) => {
      state.account = account,
        Cookie.set('polkadot-account', account, '30d')
    },
    saveAllAccounts: (state, allAccounts) => {
      state.allAccounts = allAccounts
    },
    saveBalance: (state, balance) => {
      state.balance = balance
    },
    saveLocked: (state, locked) => {
      state.locked = locked
    },
    saveTotalStaked: (state, totalStaked) => {
      state.totalStaked = totalStaked
    },
    saveUnlocking: (state, unLocking) => {
      state.unLocking = unLocking
    },
    saveRedeemable: (state, redeemable) => {
      state.redeemable = redeemable
    },
    saveCurrentBlockNum: (state, blockNum) => {
      state.currentBlockNum = blockNum
    },
    saveAllValidatorInfosInOurDB: (state, allValidatorInfosInOurDB) => {
      state.allValidatorInfosInOurDB = allValidatorInfosInOurDB
    },
    // crowdloan
    saveSubFund: (state, subFund) => {
      state.subFund = subFund
    },
    saveAuctionEnd: (state, auctionEnd) => {
      state.auctionEnd = auctionEnd
    },
    saveShowingCrowdloan: (state, crowdloans) => {
      state.showingCrowdloan = crowdloans
    },
    saveClCommunitys: (state, clCommunitys) => {
      state.clCommunitys = clCommunitys
    },
    saveLoadingFunds: (state, loadingFunds) => {
      state.loadingFunds = loadingFunds
    },
    saveLoadingContributions: (state, loadingContributions) => {
      state.loadingContributions = loadingContributions
    },
    saveClLeasePeriod: (state, clLeasePeriod) => {
      state.clLeasePeriod = clLeasePeriod
    },
    saveClProjectFundInfos: (state, funds) => {
      state.clProjectFundInfos = funds
    },
  },
  getters: {
    // polkadot
    available: (state) => {
      if (state.balance && state.locked) {
        return state.balance.sub(state.locked)
      } else {
        return 0
      }
    },
     // crowdloan
     currentLease: state => {
      return state.currentBlockNum.mod(state.clLeasePeriod)
    },
    cardInfo: state => (paraId, communityId) => {
      const card = state.showingCrowdloan.filter(c => parseInt(c.para.paraId) == parseInt(paraId) && c.community.communityId == communityId)
      if (card.length > 0) {
        return card[0]
      }
      return null
    },
    currentBlockNum: state => {
      return state.currentBlockNum
    },
    paraIds: state => {
        return state.showingCrowdloan?.map(c => c.para?.paraId)
    },
    fundInfo: state => (paraId) => {
        const funds = state.clProjectFundInfos.filter(fund => fund.paraId === paraId)
        if (funds.length > 0){
            return funds[0]
        }
        return null
    },
    projectStatus: (state, getters) => paraId => {
        const fund = getters.fundInfo(paraId)
        return fund && fund.status
    },
    showingCard: (state) => {
      return state.showingCrowdloan
    }
  }
}

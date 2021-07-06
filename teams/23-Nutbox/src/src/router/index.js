import Vue from 'vue'
import VueRouter from 'vue-router'

import Blog from '../views/Blog/Blog'
import CrowdStaking from '../views/CrowdStaking/CrowdStaking'
import Crowdloan from '../views/Crowdloan/Crowdloan'
import PolkadotCrowdloan from '../views/Crowdloan/Polkadot'
import KusamaCrowdloan from '../views/Crowdloan/Kusama'
import RococoCrowdloan from '../views/Crowdloan/Rococo'
import Wallet from '../views/Wallet/Wallet'
import PolkadotWallet from '../views/Wallet/Polkadot'
import KusamaWallet from '../views/Wallet/Kusama'
import RococoWallet from '../views/Wallet/Rococo'
import Admin from '../views/Admin/Admin'
import PolkadotAdmin from '../views/Admin/Polkadot'
import KusamaAdmin from '../views/Admin/Kusama'
import PolkadotCrowdstaking from '../views/CrowdStaking/Polkadot'
import KusamaCrowdstaking from '../views/CrowdStaking/Kusama'
import RococoAdmin from '../views/Admin/Rococo'
import RococoCommunity from '../views/Crowdloan/Community/Rococo'
import KusamaCommunity from '../views/Crowdloan/Community/Kusama'
import RococoParachain from '../views/Crowdloan/Parachain/Rococo'
import KusamaParachain from '../views/Crowdloan/Parachain/Kusama'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/crowdloan'
  },
  {
    path:'/wallet',
    redirect: '/wallet/polkadot',
    component: Wallet,
    children: [
      {
        path:'polkadot',
        component: PolkadotWallet
      },
      {
        path:'kusama',
        component: KusamaWallet
      },
      {
        path: 'rococo',
        component: RococoWallet
      }
    ]
  },
  {
    path: '/crowdloan',
    name: 'crowdloan',
    component: Crowdloan,
    redirect: '/crowdloan/kusama',
    children: [
      {
        path: 'kusama',
        name: 'kusama',
        component: KusamaCrowdloan
      },
      {
        path: 'polkadot',
        name: 'polkadot',
        component: PolkadotCrowdloan
      },
      {
        path: 'rococo',
        name: 'rococo',
        component: RococoCrowdloan
      },
    ]
  },
  {
    path: '/crowdloan/rococo/community/:communityid/:nominatorId',
    component: RococoCommunity
  },
  {
    path: '/crowdloan/kusama/community/:communityid',
    component: KusamaCommunity
  },
  {
    path: '/crowdloan/kusama/community/:communityid/:nominatorId',
    component: KusamaCommunity
  },
  {
    path: '/crowdloan/rococo/parachain/:paraid',
    component: RococoParachain
  },
  {
    path: '/crowdloan/kusama/parachain/:paraid',
    component: KusamaParachain
  },
  {
    path: '/crowdstaking',
    component: CrowdStaking,
    redirect: '/crowdstaking/polkadot',
    children: [
      {
        path: 'kusama',
        component: KusamaCrowdstaking
      },
      {
        path: 'polkadot',
        component: PolkadotCrowdstaking
      }
    ]
  },
  {
    path: '/blog',
    component: Blog,
  },
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: '',
        component: PolkadotAdmin
      },
      {
        path: 'kusama',
        component: KusamaAdmin
      },
      {
        path: 'rococo',
        component: RococoAdmin
      }
    ]
  }
]

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})

export default router

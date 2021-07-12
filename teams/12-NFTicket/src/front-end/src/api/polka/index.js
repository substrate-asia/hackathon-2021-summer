import { globalStore } from 'rekv';
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { setSS58Format } from '@polkadot/util-crypto';

import {
    TYPES,
    NODE_URL
} from '../../constants'

let api = null;
let initializing = false;

const ss58Format = 50;
const keyring = new Keyring({ type: 'sr25519', ss58Format });

export const initPolkadotApi = (cb) => {
    if (initializing) return;
    // set ss58Format
    initializing = true;
    setSS58Format(50);
    const wsProvider = new WsProvider(NODE_URL);
    const ws = new WebSocket(NODE_URL);

    ApiPromise.create({ provider: wsProvider, types: TYPES }).then((res) => {
        res.ws = ws;
        globalStore.setState({ api: res });
        api = res;
        console.log('api inited ......');
        if (cb) cb();
    });
};
// get timestamp
export const getTimestamp = async () => {
    const res = await api.query.timestamp.now();
    return res;
};
// get address balance
export const getBalance = async (address) => {
    const  { nonce, data: balance }= await api.query.system.account(address);
    // store.setState({ nonce, balance: balance.toHuman() });
    return balance.toHuman()
};
//监听余额的变化
export const regBalanceEvent = async (address,cb) => {
    const unsub = await api.query.system.account(address,({nonce,data:balance}) =>{
        if(cb) cb(balance.toHuman())
    });
}
  
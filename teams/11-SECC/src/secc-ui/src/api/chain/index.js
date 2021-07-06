/*
 * @Author: wudi(max24@vip.qq.com)
 * @Date: 2021-06-23 16:39:37
 * @Description: 
 */
import store from '@/store';
import { Keyring } from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { ApiPromise, WsProvider } from '@polkadot/api';

async function createAPI() {
  await cryptoWaitReady();

  const wsProvider = new WsProvider(process.env.REACT_APP_WS_URL);
  const api = await ApiPromise.create({ provider: wsProvider,
    types: {
      AccountInfo: "AccountInfoWithDualRefCount",
      PersonInfo: {
        name: "Vec<u8>",
        id_card: "Vec<u8>",
        height: "u16",
        weight: "u16",
        chronic: "Vec<u8>"
      },
      DeviceType: "u8",
      RelationType: "u8"
    } });
  return api;
}

function getKeyPair() {
  const state = store.getState();

  const keyring = new Keyring({ type: 'sr25519' });
  const pair = keyring.addFromUri(state.user.mnemonic);
  return pair;
}

export {
  createAPI,
  getKeyPair
}

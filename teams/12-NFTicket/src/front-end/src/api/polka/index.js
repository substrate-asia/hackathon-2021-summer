import { globalStore } from 'rekv';
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { setSS58Format } from '@polkadot/util-crypto';
import { ContractPromise } from '@polkadot/api-contract';
import { stringToU8a, u8aToHex ,u8aToString} from '@polkadot/util';


import {
    TYPES,
    NODE_URL
} from '../../constants'
import meeting_abi from './offlinemeeting.json'
import main_abi from './main.json'

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

export const regEvent= async () =>{
   
}
//主合约address
const main_address = "63K26xBBzVcDE5jAm6yksfVQCDZEjRfcNFf9owPVmn5XBQ4D"
let main_contract;
/**
   * 获取所有的会议
   */
 export const getAllMeeting= async (cb) =>{
    console.log("getAllMeeting---start")
    const value = 0;
    const gasLimit = -1;//不限制gas
    const alicePair = keyring.addFromUri('//Alice');
    console.log("Alice pair-->" + JSON.stringify(alicePair.address))

    main_contract = new ContractPromise(api, main_abi, main_address);

    const { result, output } = await main_contract.query.getAllMeeting(alicePair.address, { value, gasLimit });
    if (result.isOk) {
      console.log('Success', output.toHuman());
      if(cb) cb(output.toHuman()) 
    } else {
      console.error('Error', result.asErr);
    }
  }

//线下合约address
const meeting_address = "64PGzV7fVGhgHZLvyjXY5L3VRqj9YhEZWG2u4md7gvSdLcmh";
let meeting_contract;
//返回用户的所有已经购买的票.
export const getUserAllTicket = async (cb) =>{
    console.log("getUserAllTicket---start")
    const value = 0;
    const gasLimit = -1;//不限制gas
    const alicePair = keyring.addFromUri('//Alice');
    console.log("Alice pair-->" + JSON.stringify(alicePair.address))

    main_contract = new ContractPromise(api, main_abi, main_address);
   
    const user = alicePair.address;
    
    const { result, output } = await main_contract.query.getUserAllTicket(alicePair.address, { value, gasLimit },user);
    if (result.isOk) {
      console.log('Success', output.toHuman());
      if(cb) cb(output.toHuman())
    } else {
      console.error('Error', result.asErr);
    }
}
export const addZone = async (cb) =>{
    console.log("addZone---start")
    const value = 3000n * 1000000n;
    const gasLimit = 3000n * 1000000n;//不限制gas
    const alicePair = keyring.addFromUri('//Alice');
    console.log("Alice pair-->" + JSON.stringify(alicePair.address))


    const name = '1';
    const rows = 1;
    const cols = 1;
    const price = 1;
    meeting_contract = new ContractPromise(api, meeting_abi, meeting_address);

    await meeting_contract.tx.addZone({ value, gasLimit }, name,rows,cols,price).signAndSend(alicePair, (result) => {
              if (result.status.isInBlock) {
                console.log('测试合约--正在提交到链上');
              } else if (result.status.isFinalized) {
                console.log('测试合约--交易确认');
                console.log(result.toHuman())
              }
    });
}

//
export const getZone = async (address,cb) =>{
  console.log("getZone---start")
  const value = 0;
  const gasLimit = -1;//不限制gas
  const alicePair = keyring.addFromUri('//Alice');
  console.log("Alice pair-->" + JSON.stringify(alicePair.address))

  meeting_contract = new ContractPromise(api, meeting_abi, address);

  const { result, output } = await meeting_contract.query.getZone(alicePair.address, { value, gasLimit });
  if (result.isOk) {
    console.log('Success', output.toHuman());
    if(cb) cb(output.toHuman())
  } else {
    console.error('Error', result.asErr);
  }
}

//线下会议买票--接口OK
export const buyTicket = async (mZoneId,mRows,mCols,mPrice,cb) =>{
  console.log("买票buyTicket---start")
  var money=mPrice//.replace(/,/g, '')
  console.log(money)
  const value = money;//价钱不够会报(13个0(对应合约里的price)--Contract trapped during execution.)
  const gasLimit=-1;//300000n * 1000000n;//gas不够会报(The executed contract exhausted its gas limit.)
  const alicePair = keyring.addFromUri('//Alice');
  const zoneId = mZoneId;
  const rows=mRows;
  const cols=mCols;
  let params = [];
  params.push(zoneId,rows,cols)
  meeting_contract = new ContractPromise(api, meeting_abi, meeting_address);
  await meeting_contract.tx
  .buyTicket({ gasLimit,value },
    ...params)
  .signAndSend(alicePair, (result) => {
    if (result.status.isInBlock) {
      console.log('线下会议测试买票 buyTicket- ->--正在提交到链上');
    } else if (result.status.isFinalized) {
      console.log('线下会议测试买票 buyTicket- ->--交易确认');
      if(cb) cb(result.toHuman())
      console.log(result.toHuman())
    }
  });
}


//查询验票员--接口OK
export const getInspector = async (cb)=>{
  console.log("查询验票员getInspector---start")
  const value = 0;
  const gasLimit = -1;//不限制gas
  const alicePair = keyring.addFromUri('//Alice');

  meeting_contract = new ContractPromise(api, meeting_abi, meeting_address);

  const { result, output } = await meeting_contract.query.getInspector(alicePair.address, { value, gasLimit });
  if (result.isOk) {
    console.log('查询验票员getInspector-->Success-->验票员address-->', output.toHuman()[0]);
    if(cb) cb(output.toHuman())
  } else {
    console.error('查询验票员getInspector-->Error', result.asErr);
  }
}

//检票
//checkTicket (user: AccountId, classId: u32, tokenId: u64, timeStamp: u64, msg: Vec<u8>, hash: Vec<u8>)
export const checkTicket = async (_user, _classId, _tokenId, _timeStamp, _msg, _hash, owner,mPrice, cb)=>{
  console.log("检票checkTicket---start")
  var money=mPrice//.replace(/,/g, '')
  console.log(money)
  const value = money;//价钱不够会报(13个0(对应合约里的price)--Contract trapped during execution.)
  const gasLimit=-1;//300000n * 1000000n;//gas不够会报(The executed contract exhausted its gas limit.)
  const alicePair = keyring.addFromUri('//Alice');
  const user = _user;
  const classId=_classId;
  const tokenId=_tokenId;
  const timeStamp = _timeStamp;
  const msg = alicePair.sign(stringToU8a(_msg));
  // const msg = _msg
  //  console.log('signature222',u8aToHex(alicePair.sign(msg)))
  const hash = _hash;
  console.log('msg---',_msg)
  console.log('hash---',hash)
  let params = [];
  params.push(user,classId,tokenId,timeStamp,msg,hash)
  meeting_contract = new ContractPromise(api, meeting_abi, meeting_address);

  await meeting_contract.tx
  .checkTicket({ gasLimit,value },
    ...params)
  .signAndSend(owner, (result) => {
    if (result.status.isInBlock) {
      console.log('检票checkTicket- ->--正在提交到链上');
    } else if (result.status.isFinalized) {
      console.log('检票checkTicket- ->--交易确认');
      if(cb) cb(result.toHuman())
      console.log(result.toHuman())
    }
  });
}



export const getTimestampBlock = async (cb)=>{
  console.log("getTimestampBlock---start")
  const value = 0;
  const gasLimit = -1;//不限制gas
  const alicePair = keyring.addFromUri('//Alice');

  meeting_contract = new ContractPromise(api, meeting_abi, meeting_address);

  const { result, output } = await meeting_contract.query.getTimestampBlock(alicePair.address, { value, gasLimit });
  if (result.isOk) {
    console.log('查询验票员getInspector-->Success-->验票员address-->', output.toHuman()[0]);
    if(cb) cb(output.toHuman())
  } else {
    console.error('查询验票员getInspector-->Error', result.asErr);
  }

}






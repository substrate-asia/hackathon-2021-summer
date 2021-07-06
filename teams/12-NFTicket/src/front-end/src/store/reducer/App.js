import {setTokenKey,setUsernameKey,setBottomstatusKey,setShowmodalKey,setShowmodaltwoKey,setAccountokmodalKey} from "../Type";

import keyring from '@polkadot/ui-keyring';
import { cryptoWaitReady ,mnemonicGenerate } from '@polkadot/util-crypto';

cryptoWaitReady().then(() => {
    // load all available addresses and accounts
    keyring.loadAll({ ss58Format: 42, type: 'sr25519' });
    // additional initialization here, including rendering
    const mnemonic = mnemonicGenerate(12);
    const { pair, json } = keyring.addUri(mnemonic, 'myStr0ngP@ssworD', { name: 'mnemonic acc' });
    //存储助记词
    localStorage.setItem('words', mnemonic);
    // console.log("--->"+JSON.stringify(json))
  
  });

const app = {
    token:"",
    username:"",
    bottomstatus:false,
    showmodal:false,
    showmodaltwo:false,
    showaccountok:false
}

//Reducer
const configReducer = function(state = app,action){
    console.log(action)
    switch(action.type){
        //token
        case setTokenKey:{
            return {
                ...state,
                token:action.value,
            }
        }
        //username
        case setUsernameKey:{
            return {
                ...state,
                username:action.value,
            }
        }
        //Bottomstatus
        case setBottomstatusKey:{
            return {
                ...state,
                bottomstatus:action.value,
            }
        }
        //Account Modal
        case setShowmodalKey:{
            return {
                ...state,
                showmodal:action.value,
            }
        }
        //Account Modal Two
        case setShowmodaltwoKey:{
            return {
                ...state,
                showmodaltwo:action.value,
            }
        }
        //Create Account OK
        case setAccountokmodalKey:{
            return {
                ...state,
                showaccountok:action.value,
            }
        }

        default:
            return state;
    }
}

export default configReducer;
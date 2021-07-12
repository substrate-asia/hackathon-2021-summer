import React, { useState,useEffect } from 'react'
import styles from './index.module.css'
import {useDispatch} from 'react-redux';

//action
import { setShowmodalAction,setShowmodaltwoAction } from '../../store/action/App';


import { Keyring } from '@polkadot/keyring'
import { cryptoWaitReady ,mnemonicGenerate } from '@polkadot/util-crypto';

const { blake2AsHex } = require('@polkadot/util-crypto');

const keyring = new Keyring({ type: 'sr25519', ss58Format: 42 });
var  words;
cryptoWaitReady().then(() => {
    // load all available addresses and accounts
    // keyring.loadAll({ ss58Format: 42, type: 'sr25519' });
    // additional initialization here, including rendering

    let mnemonic = null;
    //检查存没存助记词
    if(localStorage.hasOwnProperty('words')){
        //取出来
        mnemonic=localStorage.getItem("words")
        if(mnemonic!=null&&mnemonic.length>0){
            words=mnemonic.trim().split(' ')
            console.log("已经存过助记词:",words)
        }
    }
    else
    {
        //新生成助记词
        mnemonic = mnemonicGenerate(12);
  
        if(mnemonic!=null&&mnemonic.length>0){
            words=mnemonic.trim().split(' ')
            console.log("新生成助记词:",words)
        }
    }
    //存储助记词
    localStorage.setItem('words', mnemonic);
    const pair= keyring.createFromUri(mnemonic, { name: 'sz-arrom' }); 
    localStorage.setItem('nft-address-hex', blake2AsHex(pair.address));
    localStorage.setItem('nft-address', pair.address);
    localStorage.setItem('nft-pair', pair);
    // localStorage.setItem('nft-address', blake2AsHex(pair.address));
  
  });


// 生成钱包助记词
function CreateWalletOne(_props) {
    const dispatch = useDispatch();
    if(words==null){
        words= _props.words
    }
    return (
        <div className={styles.accbody}>
            {/* mask */}
            <div className={styles.flexaccountmask}></div>
            <div className={styles.flexaccount}>
                <div className={styles.flexaccountform}>
                <div className={styles.flexaccountformtips}>
                    <span>
                    Please write down the following 12 words 
                    and keep them in a safe place
                    </span>
                </div>
                <div className={styles.flexaccountformwarning}>
                    <span>
                    Attention: Please no dot screenshot words
                    </span>
                </div>
                <div className={styles.flexaccountformtextarea}>
                    <div className={styles.flexaccountformtextareacon}>
                        {/* seed */}
                        <div className={styles.seedwords}>
                            <div className={styles.seedwordspanel}>
                            {
                                words.map((item)=>{
                                    return <span key={item}>{item}</span>
                                })
                            }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.flexaccountformbtn}>
                    <button className={styles.flexaccountbtn}
                    onClick={()=>{
                        dispatch(setShowmodalAction(false))
                        dispatch(setShowmodaltwoAction(true))
                    }}>Continue</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default CreateWalletOne;
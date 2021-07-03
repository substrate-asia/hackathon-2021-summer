import React, { useState,useEffect } from 'react'
import styles from './index.module.css'
import {useDispatch} from 'react-redux';

//action
import { setShowmodalAction,setShowmodaltwoAction } from '../../store/action/App';


// 生成钱包助记词
function CreateWalletOne(_props) {
    const [words,setWords] = useState([]);

    const dispatch = useDispatch();

    useEffect(()=>{
        setWords(_props.words)
    });

    function createtwo(){
        return <div>

        </div>
    };

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
                                words.map((item,i)=>{
                                    return <span key={i}>{item}</span>
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
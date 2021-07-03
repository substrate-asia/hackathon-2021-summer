import React, { useState,useEffect } from 'react'
import styles from './index.module.css'
import {useDispatch} from 'react-redux';
import ok from '../../images/ok.png'
import close from '../../images/close.png'

//action
import { setAccountokmodalAction } from '../../store/action/App';

// 生成钱包助记词
function CreateWalletOK(props) {
    const [words,setWords] = useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
        setWords(props.words)
    });

    return (
        <div className={styles.accbody}>
            {/* mask */}
            <div className={styles.flexaccountmask}></div>
            <div className={styles.flexaccountok}>
                <div className={styles.flexaccountform}>
                    <div className={styles.flexaccountformcont}>
                        <img src={ok} alt=""></img>
                        <span>Done!</span>
                    </div>
                    <div className={styles.flexaccountformclose}>
                        <img src={close} alt=""
                        onClick={
                            ()=>{
                                dispatch(setAccountokmodalAction(false))
                            }
                        }></img>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateWalletOK;
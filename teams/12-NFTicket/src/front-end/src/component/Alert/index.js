import React, { useState,useEffect } from 'react'
import styles from './index.module.css'
import {useDispatch} from 'react-redux';
import close from '../../images/close.png'
//action
import { setShowalertAction } from '../../store/action/App';

// 生成钱包助记词
function NAlert(props) {
    const [msg,setMsg] = useState('');
    const dispatch = useDispatch();

    useEffect(()=>{
        setMsg(props.msg)
    });

    return (
        <div className={styles.accbody}>
            {/* mask */}
            <div className={styles.flexaccountmask}></div>
            <div className={styles.flexaccountok}>
                <div className={styles.flexaccountform}>
                    <div className={styles.flexaccountformcont}>
                        <span>{msg}</span>
                    </div>
                    {/* <div className={styles.flexaccountformclose}>
                        <img src={close} alt=""
                        onClick={
                            ()=>{
                                dispatch(setShowalertAction(false))
                            }
                        }></img>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default NAlert;
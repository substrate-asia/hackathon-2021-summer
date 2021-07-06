import React, { useState,useEffect } from 'react'
import styles from './index.module.css'
import {useDispatch} from 'react-redux';

//action
import { setShowmodaltwoAction,setAccountokmodalAction } from '../../store/action/App';


// 生成钱包助记词
function CreateWalletTwo(props) {
    const dispatch = useDispatch();

    // const [words,setWords] = useState([]);
    let  [selectWords,setSelectWords] = useState([]);
    const mnemonic=localStorage.getItem("words")
    var  words;
    if(mnemonic!=null&&mnemonic.length>0){
        words=mnemonic.trim().split(' ')
    }
    words.sort();  
    function handleClick(item,index) {
        //选中的进数组
        selectWords ={
            ...selectWords,
            item
        }
        setSelectWords(selectWords)
        words.splice(index,1)
    }
    return (
        <div className={styles.accbody}>
            {/* mask */}
            <div className={styles.flexaccountmask}></div>
            <div className={styles.flexaccount}>
                <div className={styles.flexaccountform}>
                <div className={styles.flexaccountformtips}>
                    <span>
                    Please click words in the order, to confirm
                    words correct
                    </span>
                </div>
                <div className={styles.flexaccountformtextarea}>
                    <div className={styles.flexaccountformtextareacon}>
                        {/* seed */}
                        {
                            selectWords?(selectWords.map((item,i)=>{
                                return <span key={i}>{item}</span>
                            })):null
                        
                        }
                    </div>
                </div>
                <div className={styles.seedwords}>
                    <div className={styles.seedwordspanel}>
                    {
                        words.map((item,i)=>{
                            return <span key={i} onClick={() => handleClick(item,i)}>{item}</span>
                        })
                    }
                    </div>
                </div>
                <div className={styles.flexaccountformbtn}>
                    <button className={styles.flexaccountbtn}
                    onClick={()=>{
                        dispatch(setShowmodaltwoAction(false))
                        dispatch(setAccountokmodalAction(true))
                    }}>Confirm</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default CreateWalletTwo;
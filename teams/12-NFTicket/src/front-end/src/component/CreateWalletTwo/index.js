import React, { useState,useEffect } from 'react'
import styles from './index.module.css'
import {useDispatch} from 'react-redux';

//action
import { setShowmodaltwoAction,setAccountokmodalAction } from '../../store/action/App';


// 生成钱包助记词
function CreateWalletTwo(props) {
    const dispatch = useDispatch();
    var  keywords;
    // useEffect(()=>{
    //     console.log("是否执行.......")
    //     
    //     // console.log("是否执行.......",keywords)
    // });
   
    const  [selectWords,setSelectWords] = useState([]);

    const  [words,setWords] = useState([]);
    const addText = (item) =>{
        //选中的进数组
        setSelectWords([ ...selectWords,
            item])
        //移除一个元素
        let newWords = words.filter(name =>{
            return name!==item
        })
        setWords(newWords)
    }
    useEffect(()=>{
        const mnemonic=localStorage.getItem("words")
        if(mnemonic!=null&&mnemonic.length>0){
            keywords=mnemonic.trim().split(' ')
            console.log(keywords)
            keywords.sort();  
            console.log(keywords)
            setWords(keywords)
        }
    },[])
   
    {/** 助记词的顺序是否一致 */}
    const checkMnemonic = () =>{
        const mnemonic=localStorage.getItem("words")
        const oriWords=mnemonic.trim().split(' ')
        console.log("原来的助记词",oriWords)
        console.log("选择的单词",selectWords)
        if(JSON.stringify(oriWords)==JSON.stringify(selectWords)){
            dispatch(setShowmodaltwoAction(false))
            dispatch(setAccountokmodalAction(true))
            {/** 头部显示地址 */}
        }else{
           {/*** 选择错误时的处理 */}
           console.log("助记词的顺序有问题....")
        }
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
                        <div className={styles.seedwordspanel}>
                        {
                            selectWords?(selectWords.map((item,i)=>{
                                return <span key={i}>{item}</span>
                            })):null
                        }
                        </div>
                    </div>
                </div>
                <div className={styles.seedwords}>
                    <div className={styles.seedwordspanel}>
                    {
                       words? (words.map((item,i)=>{
                            return <span key={i} onClick={addText.bind(this,item)}>{item}</span>
                        })):null
                    }
                    </div>
                </div>
                <div className={styles.flexaccountformbtn}>
                    <button className={styles.flexaccountbtn}
                    onClick={checkMnemonic.bind(this)}>Confirm</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default CreateWalletTwo;
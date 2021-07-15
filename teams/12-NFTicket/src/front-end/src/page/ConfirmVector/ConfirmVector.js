import React, { Component } from 'react'
import TopBar from '../../component/TopBar'
import styles from './ConfirmVector.module.css'
import { Button,Flex,WhiteSpace } from 'antd-mobile'
import time from '../../images/icon_time.png'
import hongvector from '../../images/vector/HongVector.png'
import zivector from '../../images/vector/ZiVector.png'
import chengvector from '../../images/vector/ChengVector.png'
import huangvector from '../../images/vector/HuangVector.png'
import stage from '../../images/desk/Rectangle5.png'
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {parseMoneyText} from '../../utils/formart.js'
//action
import { setBottomstatusAction } from '../../store/action/App';

class ConfirmVector extends Component{

    state={
        maxMoney:"",
    }

    componentDidMount() {
        //actions  隐藏底部状态栏
        this.props.actions.setBottomstatus(true);
        const {zoomList}= this.props.location.state
        console.log("选座位的页面-----start------")
        console.log(zoomList)
        //找一个最大值
        var max = zoomList.reduce((obj1,obj2) =>{
            return obj1[1].price > obj2[1].price ? obj1 :obj2
        })
        var moeny = max[1].price;
        const {value}=parseMoneyText(moeny)
        this.setState({
            maxMoney:value.toString()
        })
        console.log()
    }
    
    comfirmTicket=() =>{
        //
        const { data ,zoomList}= this.props.location.state
        var max = zoomList.reduce((obj1,obj2) =>{
            return obj1[1].price > obj2[1].price ? obj1 :obj2
        })
        var path={
            pathname:'/Home/Payment',
            state:{
                data,
                max
            }
         }
        this.props.history.push(path)
    }
    render() {
        
        //搜索框高度
        const searchbarHeight = 45;
        //空白区域高度
        const whitespaceHeight = 9;
        //账户信息高度
        const accountInfoHeight = 42;
        //最后+26是因为直接按照前面的减去之后会有一部分留白区域,多种机型上都是26,就加上这个26[**暂时不清楚什么原因**]
        const height = parseInt(window.innerHeight)-searchbarHeight-whitespaceHeight-accountInfoHeight;

        const { data }= this.props.location.state
        var {name,start_time} = data
        var str1=[];
        for(let i=0;i<12;i++){
            str1.push(<img src={hongvector} onClick={()=>{alert("360")}}/>)
        }

        var str2=[];
        for(let i=0;i<18;i++){
            str2.push(<img src={zivector} onClick={()=>{alert("300")}}/>)
        }

        var str3=[];
        for(let i=0;i<18;i++){
            str3.push(<img src={chengvector} onClick={()=>{alert("240")}}/>)
        }

        var str4=[];
        for(let i=0;i<18;i++){
            str4.push(<img src={huangvector} onClick={()=>{alert("180")}}/>)
        }
        

        return (
            <div className={styles.wrapperbody}>
                {/** 标题栏 */}
                <TopBar></TopBar>
                <div className={styles.wrapper} style={{height:''+height+'px'}}>
                    <div className={styles.contant}>
                    <WhiteSpace/>
                    <div className={styles.flexcontent}>
                        <div className={styles.title}><span>{name}</span></div>
                        <div className={styles.title2}>
                            <img src={time} className={styles.timeIcon}></img>
                            <span className={styles.timeText}>{start_time}</span>
                        </div>
                        {/* 四种座位 */}
                        <div className={styles.vector4}>
                            <div className={styles.vectorbg}>
                                <img src={hongvector} className={styles.vectorIcon}/>
                                <div className={styles.vectorspan}><span className={styles.vectorspanspan}>360</span></div>
                                <div className={styles.vectorspan}><span className={styles.vectorspanspan}>NMT</span></div>
                            </div>
                            <div className={styles.vectorbg}>
                                <img src={zivector} className={styles.vectorIcon}/>
                                <div className={styles.vectorspan}><span className={styles.vectorspanspan}>300</span></div>
                                <div className={styles.vectorspan}><span className={styles.vectorspanspan}>NMT</span></div>
                            </div>
                            <div className={styles.vectorbg}>
                                <img src={chengvector} className={styles.vectorIcon}/>
                                <div className={styles.vectorspan}><span className={styles.vectorspanspan}>240</span></div>
                                <div className={styles.vectorspan}><span className={styles.vectorspanspan}>NMT</span></div>
                            </div>
                            <div className={styles.vectorbg}>
                                <img src={huangvector} className={styles.vectorIcon}/>
                                <div className={styles.vectorspan}><span className={styles.vectorspanspan}>180</span></div>
                                <div className={styles.vectorspan}><span className={styles.vectorspanspan}>NMT</span></div>
                            </div>
                        </div>

                        {/* 排座位 */}
                        <WhiteSpace/>
                        <WhiteSpace/>
                        <div>
                            <div className={styles.stageTitle}>
                                <div className={styles.stageImage}><img src={stage} /></div>
                                <div className={styles.stageText}>
                                    <span>Stage</span>
                                </div>
                            </div>
                            <div style={{width:'100%',height:'20px'}}></div>
                            <div className={styles.no1_vector}>
                                <div className={styles.onevector}>
                                    {str1}
                                </div>
                                <div className={styles.onevector}>
                                    {str1}
                                </div>
                                <div className={styles.onevector}>
                                    {str1}
                                </div>
                            </div>
                            
                            <div style={{width:'100%',height:'20px'}}></div>
                            
                            <div className={styles.no2_vector}>
                                <div className={styles.onevector}>
                                    {str2}
                                </div>
                                <div className={styles.onevector}>
                                    {str2}
                                </div>
                                <div className={styles.onevector}>
                                    {str2}
                                </div>
                            </div>

                            <div style={{width:'100%',height:'20px'}}></div>
                            
                            <div className={styles.no3_vector}>
                                <div className={styles.onevector}>
                                    {str3}
                                </div>
                                <div className={styles.onevector}>
                                    {str3}
                                </div>
                                <div className={styles.onevector}>
                                    {str3}
                                </div>
                                <div className={styles.onevector}>
                                    {str3}
                                </div>
                            </div>

                            <div style={{width:'100%',height:'20px'}}></div>
                            
                            <div className={styles.no4_vector}>
                                <div className={styles.onevector}>
                                    {str4}
                                </div>
                                <div className={styles.onevector}>
                                    {str4}
                                </div>
                                <div className={styles.onevector}>
                                    {str4}
                                </div>
                                <div className={styles.onevector}>
                                    {str4}
                                </div>
                                <div className={styles.onevector}>
                                    {str4}
                                </div>
                                <div className={styles.onevector}>
                                    {str4}
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className={styles.bottomconfirm}>
                    <div className={styles.bottomleft}>
                        <div className={styles.bottomleftspan1}><span>{this.state.maxMoney}</span></div>
                        <div className={styles.bottomleftspan2}><span>NMT</span></div>
                        <div className={styles.bottomleftspan3}><span>1</span></div>
                        <div className={styles.bottomleftspan4}><span>ticket</span></div>
                    </div>
                    <div className={styles.bottomright}>
                        {/** 确认按钮 */}
                        <Button type="primary" inline size="small"
                            onClick={() => this.comfirmTicket()}
                            style={{ borderRadius:'30px',width:'128px',height:'31px',margin: '20px' }}>
                            Confirm
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}


//获取最新的store里的状态，通过this.props获取
const mapStateToProps = (state)=>{
    return {
        app:state.app
    }
  }
  //更新状态提交到store
  const mapDispatchToProps = (dispatch)=>{
    return {
        actions:bindActionCreators({
          setBottomstatus:setBottomstatusAction
        },dispatch)
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConfirmVector);

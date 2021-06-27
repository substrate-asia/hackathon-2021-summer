import { Flex, Pagination, Icon } from 'antd-mobile'
import React, { Component } from 'react'
import TopBar from '../../component/TopBar'
import icon from '../../images/icon_detail.png'
import iconEwm from '../../images/icon_ewm.png'
import left from '../../images/icon_left.png'
import right from '../../images/icon_right.png'
import styles from './TicketDetail.module.css'


import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
//action
import { setBottomstatusAction } from '../../store/action/App';

const locale = {
    prevText: 'Prev',
    nextText: 'Next',
};
class TicketDetail extends Component {

    
    componentDidMount() {
        //actions  隐藏底部状态栏
        this.props.actions.setBottomstatus(true);
    }

    render() {
        //搜索框高度
        const searchbarHeight = 25;
        //空白区域高度
        const whitespaceHeight = 9;
        //账户信息高度
        const accountInfoHeight = 42;
        //最后+26是因为直接按照前面的减去之后会有一部分留白区域,多种机型上都是26,就加上这个26[**暂时不清楚什么原因**]
        const height = parseInt(window.innerHeight)-searchbarHeight-whitespaceHeight-accountInfoHeight;
        
        return (
            <div className={styles.detail}>
                <TopBar></TopBar>
                <Flex>
                    <div className={styles.detailView} style={{height:""+height+"px"}}>
                        <div className={styles.detailOutLine}>
                            <div className={styles.detailImg}>
                                <img src={icon} alt=""></img>
                            </div>

                            {/** 票据信息 */}
                            <div className={styles.eventName}>
                                <label> Event name</label>
                                <h1 className={styles.removeMargin}>Event name</h1>
                            </div>
                            <Flex className={styles.ticketDesc}>
                                <Flex.Item>
                                    <label className={styles.labelText}> Date</label>
                                    <div className={styles.descText}>
                                        <span>Event name</span>
                                    </div>
                                </Flex.Item>
                                <Flex.Item >
                                    <label className={styles.labelText}> Time</label>
                                    <div className={styles.descText}>
                                        <span>14:00-18:00</span>
                                    </div>
                                </Flex.Item>
                            </Flex>
                            <Flex className={styles.ticketDesc}>
                                <Flex.Item>
                                    <label className={styles.labelText}> Row</label>
                                    <div className={styles.descText}>
                                        <span>12</span>
                                    </div>
                                </Flex.Item>
                                <Flex.Item >
                                    <label className={styles.labelText}> Seat</label>
                                    <div className={styles.descText}>
                                        <span>36</span>
                                    </div>
                                </Flex.Item>
                            </Flex>
                            {/** 绘制虚线 */}
                            
                            <div>
                                <div className={styles.dottedLine}></div>
                            </div>

                            {/** 分页器 */}
                            <div>
                                <div className={styles.showEwm}>
                                    <img src={left} alt="" className={styles.leftArrow}></img>
                                    <img src={iconEwm} alt="" className={styles.ewmImg}></img>
                                    <img src={right} alt="" className={styles.rightArrow}></img>
                                </div>
                                <Pagination mode="number" total={5} current={3} />
                            </div>

                            
                            <div className={styles.dottedLineGroup}>
                                <div className={styles.dottedLineLeft}></div>
                                <div className={styles.dottedLineRight}></div>
                            </div>

                            <div className={styles.dottedLineBoxGroup}>
                                <div className={styles.dottedLineBoxLeft}></div>
                                <div className={styles.dottedLineBoxRight}></div>
                            </div>
                        </div>
                    </div>
                </Flex>
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
  )(TicketDetail);
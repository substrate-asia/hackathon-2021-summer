import { Checkbox,InputItem,Button,Flex } from 'antd-mobile'
import React, { Component } from 'react'
import TopBar from '../../component/TopBar'
import styles from './CreateEvent.module.css';

import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
//action
import { setBottomstatusAction } from '../../store/action/App';


const CheckboxItem = Checkbox.CheckboxItem;
class CreateEvent extends Component {

    componentDidMount() {
        //actions  隐藏底部状态栏
        this.props.actions.setBottomstatus(true);
    }
    render() {
        return(
            <div className={styles.container}>
                <TopBar></TopBar>
                <div className={styles.contant}>
                    <div className={styles.flexcontent}>
                        <div className={styles.title}><span>Create a event</span></div>
                        <div className={styles.name1}><span>Event Name</span></div>
                        <div className={styles.inputout}>
                        <InputItem
                            // {...getFieldProps('input3')}
                            placeholder="eg.Taylor Swift concert"
                        />
                        <div className={styles.line}></div>
                        </div>
                        <div className={styles.name2}><span>Poster</span></div>
                        <div>
                        <Button type="primary" inline size="small" style={{ borderRadius:'30px',width:'120px',height:'30px',marginLeft: '10px' }}>Select file</Button>
                        </div>
                        <div className={styles.name2}><span>Location</span></div>
                        <div>
                        <CheckboxItem key='0'>
                            Online
                        </CheckboxItem>
                        </div>
                        <div>
                        <CheckboxItem key='1'>
                            Offline
                        </CheckboxItem>
                        </div>
                        <div className={styles.name3}><span>Discription</span></div>
                        <div className={styles.inputout}>
                        <InputItem
                            // {...getFieldProps('input3')}
                            placeholder="eg.The instruction about Taylor Swift concert"
                        />
                        <div className={styles.line}></div>
                        </div>
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
  )(CreateEvent);
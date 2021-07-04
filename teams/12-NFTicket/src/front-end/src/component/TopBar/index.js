import React, { Component } from 'react'
import { Modal,Flex, SearchBar, WhiteSpace, Popover, NavBar, Icon } from 'antd-mobile'
import img1 from '../../images/icon.png'
import wallet from '../../images/icon_wallet.png'
import search from '../../images/search.png'
import styles from './index.module.css'


import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

//action
import { setShowmodalAction } from '../../store/action/App';
import { Button } from 'react-scroll'


const Item = Popover.Item;


class TopBar extends Component {


    state = {
        visible: false,
        selected: '',
        show:false,
    };
    onSelect = (opt) => {
        console.log(opt.props.value);
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
        //点击事件的处理
        if(opt.props.value=="create"){
            this.props.actions.setShowModal(true)
        }
    };

    showModalAlert=()=>{
        console.log(111111);
    };

    handleCancel = (show)=>{
        this.setState({
            show
        });
    };

    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    };

    render() {
        return (
            <div className={styles.content}>
                <SearchBar className={styles.searchBar} placeholder="Search" maxLength={8} />
                <WhiteSpace />
                {/**
                 * 导航栏
                 */}
                <NavBar
                    mode="light"
                    rightContent={
                        <Popover mask
                            overlayClassName="fortest"
                            overlayStyle={{ color: 'currentColor' }}
                            visible={this.state.visible}
                            overlay={[
                                (<Item key="4" value="create" data-seed="logId">create</Item>),
                                (<Item key="5" value="import" style={{ whiteSpace: 'nowrap' }}>import</Item>),
                            ]}
                            align={{
                                overflow: { adjustY: 0, adjustX: 0 },
                                offset: [-10, 0],
                            }}
                            onVisibleChange={this.handleVisibleChange}
                            onSelect={this.onSelect}
                        >
                            <div style={{
                                height: '100%',
                                padding: '0 15px',
                                marginRight: '-15px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            >
                                <div className={styles.accountInfoRight} >
                                    <img src={wallet} className={styles.walletIcon}></img>
                                    <div className={styles.rightText}>
                                        <span onClick={() => {
                                            this.props.actions.setShowModal(true)
                                        }}>0x4234...1e45</span>
                                    </div>
                                </div>
                            </div>
                        </Popover>
                    }
                    leftContent={
                        <div className={styles.accountInfoLeft}>
                            <img className={styles.iconImg} src={img1} alt="" />
                            <div className={styles.iconText}>
                                <span className={styles.lableText}>NFTicket</span>
                            </div>
                            <div className={styles.searchImg}>
                                <img src={search} alt="" />
                            </div>
                        </div>
                    }
                >
                </NavBar>
            </div>
        )
    }
}


//获取最新的store里的状态，通过this.props获取
const mapStateToProps = (state) => {
    console.log(state.app);
    return {
        app: state.app
    }
}
//更新状态提交到store
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            setShowModal: setShowmodalAction
        }, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopBar);


import React, { Component, button } from 'react';
import { ListView ,Modal} from 'antd-mobile';
// import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

//action
import { setTokenAction, setUsernameAction, setBottomstatusAction, setShowmodalAction, setShowmodaltwoAction, setAccountokmodalAction } from '../../store/action/App';


import './home.css';
import TopBar from '../../component/TopBar';

import CreateWalletOne from '../../component/CreateWalletOne';
import CreateWalletTwo from '../../component/CreateWalletTwo';
import CreateWalletOK from '../../component/CreateWalletOK';


import { ApiPromise, WsProvider } from '@polkadot/api';

async function initPolkdot(){
  const wsProvider = new WsProvider('ws://127.0.0.1:9944');
  const api = await ApiPromise.create({ provider: wsProvider });
  console.log(api.genesisHash.toHex());
}


const alert = Modal.alert;
const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Title',
    des: '描述',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: 'Title',
    des: '描述',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Title',
    des: '描述',
  },
];
const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
  const dataBlob = {};
  for (let i = 0; i < NUM_ROWS; i++) {
    const ii = (pIndex * NUM_ROWS) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  return dataBlob;
}

class Home extends Component {
  
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      words: [
        "minor",
        "nasty",
        "wasp",
        "major",
        "pumpkin",
        "lounge",
        "door",
        "blade",
        "trip",
        "value",
        "render",
        "cook"
      ],
      dataSource,
      isLoading: true,
      dataList: [{
        flag: "A",
        createMonth: "12",
        desc: "Description",
        enentName: "Event Name",
        location: "Location details",
        startTime: "Start time"
      }, {
        flag: "A",
        createMonth: "12",
        desc: "Description",
        enentName: "Event Name",
        location: "Location details",
        startTime: "Start time"
      }, {
        flag: "A",
        createMonth: "12",
        desc: "Description",
        enentName: "Event Name",
        location: "Location details",
        startTime: "Start time"
      }],
      showToast: false
    };
   
    initPolkdot()
  };

  componentDidMount() {

    const tokendata = "mytoken";
    //actions
    this.props.actions.setToken(tokendata);
    //actions  显示底部状态栏
    this.props.actions.setBottomstatus(false);
  }
  componentWillMount() {
    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 600);
  }

  componentWillUnmount() {
    this.props.actions.setShowModal(false);
    this.props.actions.setShowModalTwo(false);
    this.props.actions.setAccountOKModal(false);
  }

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', document.documentElement.clientHeight);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.rData = { ...this.rData, ...genData(++pageIndex) };
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  }

  render = () => {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          height: 0
        }}
      />
    );
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      const imageHeight = window.innerWidth - 30 - 30;
      return (
        <div key={rowID} className='card-content'
          style={{
            backgroundImage: "url('./images/cardimg.png')",
            backgroundRepeat: 'no-repeat',
            height: '' + imageHeight + 'px',
          }} onClick={() => this.props.history.push('/Home/activityDetail')}>
          <div className="top-container">
            <div className='top-name' style={{
              borderRadius: '50px', width: '50px', height: '50px',
              backgroundColor: "#ffffff",
              display: 'flex'
            }}>
              <span className="top-text">A</span>
            </div>
            <div className='top-time-group'>
              <div className='top-time-1'>12</div>
              <div className='top-time-2'>Nav</div>
            </div>
          </div>
          <div className='bottom-container'>
            <div>
              <div style={{ marginBottom: '8px', textShadow: '#fff 1px 0 0,#fff 0 1px 0,#fff -1px 0 0,#fff 0 -1px 0' }}>Description</div>
              <div style={{ marginBottom: '8px', fontSize: '24px', fontWeight: 'bold', textShadow: '#fff 1.2px 0 0,#fff 0 1.2px 0,#fff -1.2px 0 0,#fff 0 -1.2px 0' }}>Event Name</div>
              <div style={{ display: 'flex' }}><div><img style={{ margin: '0px 5px 5px 0px', width: '15px', height: '15px' }} src='./images/location.png'></img></div><span style={{ textShadow: '#fff 1px 0 0,#fff 0 1px 0,#fff -1px 0 0,#fff 0 -1px 0' }}>Location details</span></div>
              <div style={{ display: 'flex' }}><div><img style={{ margin: '0px 5px 5px 0px', width: '15px', height: '15px' }} src='./images/time.png'></img></div><span style={{ textShadow: '#fff 1px 0 0,#fff 0 1px 0,#fff -1px 0 0,#fff 0 -1px 0' }}>Start time</span></div>
            </div>
          </div>
        </div>
      );
    };

    //搜索框高度
    const searchbarHeight = 25;
    //空白区域高度
    const whitespaceHeight = 9;
    //账户信息高度
    const accountInfoHeight = 42;
    //底部Tab高度
    const tabbarHeight = 46;

    const height = parseInt(window.innerHeight) - searchbarHeight - whitespaceHeight - accountInfoHeight - 2 * tabbarHeight + 26;
    return (
      <div className="content" style={{ position: "absolute" }}>
        <TopBar></TopBar>
        <div>
          <ListView
            ref={el => this.lv = el}
            dataSource={this.state.dataSource}
            renderHeader={() => { console.log("card-height=" + window.innerHeight + "///" + document.documentElement.clientHeight) }}
            renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
              {this.state.isLoading ? 'Loading...' : 'Loaded'}
            </div>)}
            renderRow={row}
            renderSeparator={separator}
            className=""
            pageSize={4}
            useBodyScroll
            onScroll={() => { console.log('scroll'); }}
            scrollRenderAheadDistance={500}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={10}
            style={{ height: '' + height + 'px', overflow: 'auto' }}
          />
        </div>

        <div className={this.props.app.showmodal ? 'showmodal' : 'hidemodal'}
          style={{ height: "" + window.innerHeight + "px" }}>
          {/* 生成钱包助记词---弹窗 */}
          <CreateWalletOne words={this.state.words}></CreateWalletOne>
        </div>

        <div className={this.props.app.showmodaltwo ? 'showmodaltwo' : 'hidemodaltwo'}
          style={{ height: "" + window.innerHeight + "px" }}>
          {/* 输入钱包助记词---弹窗 */}
          <CreateWalletTwo words={this.state.words}></CreateWalletTwo>
        </div>

        <div className={this.props.app.showaccountok ? 'showaccountokmodal' : 'hideaccountokmodal'}
          style={{ height: "" + window.innerHeight + "px" }}>
          {/* 输入钱包助记词---弹窗 */}
          <CreateWalletOK words={this.state.words}></CreateWalletOK>
        </div>
      </div>
    );
  }
}

//获取最新的store里的状态，通过this.props获取
const mapStateToProps = (state) => {
  return {
    app: state.app
  }
}
//更新状态提交到store
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      setToken: setTokenAction,
      setUsername: setUsernameAction,
      setBottomstatus: setBottomstatusAction,
      setShowModal: setShowmodalAction,
      setShowModalTwo: setShowmodaltwoAction,
      setAccountOKModal: setAccountokmodalAction
    }, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

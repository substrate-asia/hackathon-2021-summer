import React, { Component } from 'react';
import { ListView } from 'antd-mobile';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

//action
import {
  setTokenAction, setUsernameAction, setBottomstatusAction,
  setShowmodalAction, setShowmodaltwoAction, setAccountokmodalAction
} from '../../store/action/App';


import './home.css';
import TopBar from '../../component/TopBar';

import CreateWalletOne from '../../component/CreateWalletOne';
import CreateWalletTwo from '../../component/CreateWalletTwo';
import CreateWalletOK from '../../component/CreateWalletOK';
import NAlert from '../../component/Alert';

import {initPolkadotApi,getAllMeeting} from '../../api/polka'
import img1 from '../../images/big_1.png'
import img2 from '../../images/big_2.png'
import img3 from '../../images/big_3.png'



const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
  const dataBlob = {};
  for (let i = 0; i < NUM_ROWS; i++) {
    const ii = (pIndex * NUM_ROWS) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  console.log("长度:",dataBlob)
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
      showToast: false,
    };

  };

  async componentDidMount() {
    console.log("DidMount");
    //actions  显示底部状态栏
    this.props.actions.setBottomstatus(false);
    //获取链上会议列表
    initPolkadotApi( async () =>{
      getAllMeeting((result) =>{
        console.log("--------getAllMeeting-----------")
        //添加模拟数据
        result = [
          {"desc":"K-pop, short for Korean popular music, is a genre of music originating in South Korea as part of South Korean culture.[1] It is influenced by styles and genres from around the world, such as pop, experimental, rock, jazz, gospel, hip hop, R&amp;B, reggae, electronic dance, folk, country, and classical on top of its traditional Korean music roots. The more modern form of the genre emerged with the formation of one of the earliest K-pop groups, the boy band Seo Taiji and Boys, in 1992. Their experimentation with different styles and genres of music and integration of foreign musical elements helped reshape and modernize South Korea's contemporary music scene.","name":"Kpop All Night","address":"Modern Sky Lab","start_time":"20:30 (UTC+8)","sponsorFrist":"T","month":"AUG","day":21,"meeting_addr":"64RWinXw26GE2cDPwStsDz96uRdwSwrg6EAex8BovXVEWqq4","sponsor":"Ty","poster":"3"},
          {"desc":"The Weeknd","name":"Livestream","address":"Online","start_time":"12:00 (UTC+8)","sponsorFrist":"H","month":"SEP","day":25,"meeting_addr":"64RWinXw26GE2cDPwStsDz96uRdwSwrg6EAex8BovXVEWqq4","sponsor":"Hy","poster":"1"},
          {"desc":"Tanya Schultz","name":"Candy Utopia","address":"Modern SkyLab","start_time":"10:00 (UTC+8)","sponsorFrist":"C","month":"OCT","day":12,"meeting_addr":"64RWinXw26GE2cDPwStsDz96uRdwSwrg6EAex8BovXVEWqq4","sponsor":"Cy","poster":"2"}
        ]
        setTimeout(() => {
          console.log(result)
          this.rData = result;
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
          });
        }, 200);
        console.log("--------getAllMeeting end-----------")
     })
    })
  }
  // //线下会议:64RWinXw26GE2cDPwStsDz96uRdwSwrg6EAex8BovXVEWqq4
  // async meeting_BuyTicket(api){
  //   //getZoneById (zoneId: u8)
  //   console.log("线下会议通过ID获取Zone-->")
  //     const value = 0;
  //     const gasLimit=-1;
  //   const alicePair = keyring.addFromUri('//Alice');
  //   const zoneId = 0;
  //         const { gasConsumed, result, output }  = await meeting_contract.query
  //         .getZoneById(alicePair.address,{value,gasLimit}, zoneId)
  //     console.log("线下会议通过ID获取Zone-->",result.toHuman());
  //     console.log("线下会议通过ID获取Zone-->",output.toHuman());
  // }

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
 
  
    const row = (rowData, sectionID, rowID) => {

      const imageHeight = window.innerWidth - 30 - 30;
      var path={
         pathname:'/Home/activityDetail',
         state:rowData
      }
      var imgPath;
      if(rowData.poster==1){
        imgPath= img1
      }else if(rowData.poster==2){
        imgPath= img2
      }else{
        imgPath= img3
      }
      console.log('url地址',imgPath)
      return (
        <div key={rowID} className='card-content'
          style={{
            backgroundImage:`url(${imgPath})`,
            backgroundRepeat: 'no-repeat',
            height: '' + imageHeight + 'px',
          }} onClick={() => this.props.history.push(path)}>
          <div className="top-container">
            <div className='top-name' style={{
              borderRadius: '50px', width: '50px', height: '50px',
              backgroundColor: "#ffffff",
              display: 'flex'
            }}>
              <span className="top-text">{rowData.sponsorFrist}</span>
            </div>
            <div className='top-time-group'>
              <div className='top-time-1'>{rowData.day}</div>
              <div className='top-time-2'>{rowData.month}</div>
            </div>
          </div>
          <div className='bottom-container'>
            <div>
              <div  className='meeting_bg' style={{color:'#fff'}}>
                {rowData.desc}
                </div>
              <div style={{ marginBottom: '8px', fontSize: '24px', fontWeight: 'bold', textShadow: '#fff 1.2px 0 0,#fff 0 1.2px 0,#fff -1.2px 0 0,#fff 0 -1.2px 0' }}>{rowData.name}</div>
              <div style={{ display: 'flex' }}><div><img style={{ margin: '0px 5px 5px 0px', width: '15px', height: '15px' }} src='./images/location.png'></img></div><span style={{ textShadow: '#fff 1px 0 0,#fff 0 1px 0,#fff -1px 0 0,#fff 0 -1px 0' }}>{rowData.address}</span></div>
              <div style={{ display: 'flex' }}><div><img style={{ margin: '0px 5px 5px 0px', width: '15px', height: '15px' }} src='./images/time.png'></img></div><span style={{ textShadow: '#fff 1px 0 0,#fff 0 1px 0,#fff -1px 0 0,#fff 0 -1px 0' }}>{rowData.start_time}</span></div>
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

    const height = parseInt(window.innerHeight) - searchbarHeight - whitespaceHeight - accountInfoHeight - 2 * tabbarHeight + 26+51;
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
          <CreateWalletTwo ></CreateWalletTwo>
        </div>

        <div className={this.props.app.showaccountok ? 'showaccountokmodal' : 'hideaccountokmodal'}
          style={{ height: "" + window.innerHeight + "px" }}>
          {/* 输入钱包助记词---弹窗 */}
          <CreateWalletOK ></CreateWalletOK>
        </div>

        <div className={this.props.app.showalert ? 'showalertmodal' : 'hidealertmodal'}
          style={{ height: "" + window.innerHeight + "px" }}>
          <NAlert msg="助记词顺序有问题"></NAlert>
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

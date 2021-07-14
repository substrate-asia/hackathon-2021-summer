import React, { Component } from 'react'
import TopBar from '../../component/TopBar'
import styles from './sort.module.css'
import { Tabs, WhiteSpace, Badge,ListView, Result } from 'antd-mobile';
import TicketItem from '../../component/TicketItem'

import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

//action
import { setTokenAction,setUsernameAction,setBottomstatusAction } from '../../store/action/App';

import {initPolkadotApi,getUserNftTicket} from '../../api/polka'


const tabs = [
  { title: <Badge >Unchecked</Badge> },
  { title: <Badge >Checked</Badge> },
  { title: <Badge >Refund</Badge> },
];


const data = [

];

const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
  const dataBlob = {};
  for (let i = 0; i < NUM_ROWS; i++) {
    const ii = (pIndex * NUM_ROWS) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  console.log("数据的条数:",dataBlob)
  return dataBlob;
}

class sort extends Component {

  constructor(props){
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      isLoading: true,
      current:1,
    };
  }
   
  componentDidMount(){
    //actions  显示底部状态栏
    this.props.actions.setBottomstatus(false);
    initPolkadotApi( async () =>{
      getUserNftTicket((result) =>{
        console.log("--------getUserNftTicket-----------")
        console.log(result)
        console.log("--------getUserNftTicket end-----------")
     })
  })
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
  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    console.log('arrom', event);
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.rData = { ...this.rData, ...genData(++pageIndex) };
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  }

  renderTabs=() =>{

    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <TicketItem  key={rowID}></TicketItem>
      );
    };

    //搜索框高度
    const searchbarHeight = 25;
    //空白区域高度
    const whitespaceHeight = 9;
    //账户信息高度
    const accountInfoHeight = 42;
    //标题高度
    const titleHeight = 72;
    //三栏Tab字体高度
    const tabtextHeight = 46;
    //底部Tab高度
    const tabbarHeight = 46;

    const height = parseInt(window.innerHeight)-searchbarHeight-whitespaceHeight-accountInfoHeight-titleHeight-tabtextHeight-2*tabbarHeight+26;

    return (
      
      <div className={styles.tabs}>
        
        <div className={styles.tabstop}>
          <div className={styles.tabstopcont}>
          </div>
        </div>
         
        <div className={styles.tabsgroup}>
          <Tabs tabBarTextStyle={{
              height:'44px',
              marginBottom:'3px',
              fontSize:'14px',
              fontWeight:'bold',
            }} 
            tabs={tabs}
            initialPage={0}
            tabBarUnderlineStyle={{
              width:'32%',
              height:'36px',
              marginLeft:'2px',
              marginBottom:'6px',
              zIndex:-1,
              borderRadius:'25px',
              backgroundColor:'#2f7ef5'
            }}
            tabBarBackgroundColor='rgba(255,255,255,0.1)'
            tabBarActiveTextColor='#ffffff'
            tabBarInactiveTextColor='#2f7ef5'
            onChange={(tab, index) => {this.state.current=index;console.log('onChange', index, tab);}}
            onTabClick={(tab, index) => { this.state.current=index;console.log('onTabClick', index, tab); }}
          >
            <div style={{   display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' , marginBottom: '60px' }}>
              <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderHeader={() => <span>header</span>}
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
                onEndReachedThreshold={8}
                style={{overflow: 'auto' ,width:'100%',height:''+height+'px'}}/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height:''+height+'px', backgroundColor: '#fff' }}>
              Content of second tab
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height:''+height+'px', backgroundColor: '#fff' }}>
              Content of third tab
            </div>
          </Tabs>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.sort}>
        <TopBar></TopBar>
        <h1 className={styles.title}>My Tickets</h1>
        {/** 切换标签 */}
        {this.renderTabs()}
        
        
      </div>
    )
  }
}
//获取最新的store里的状态，通过this.props获取
const mapStateToProps = (state)=>{
  console.log("homehomehomehomehomehome");
  console.log(state.app);
  return {
      app:state.app
  }
}
//更新状态提交到store
const mapDispatchToProps = (dispatch)=>{
  return {
      actions:bindActionCreators({
        setToken:setTokenAction,
        setUsername:setUsernameAction,
        setBottomstatus:setBottomstatusAction
      },dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(sort);

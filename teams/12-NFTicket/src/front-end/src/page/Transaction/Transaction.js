import React, { Component } from 'react'
import { Tabs, ListView, Badge } from 'antd-mobile';



import TopBar from '../../component/TopBar'
import styles from './Transaction.module.css'
import nmtIcon from '../../images/icon_nmt.png'
import RecordItem from '../../component/RecordItem/RecordItem';

import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
//action
import { setTokenAction,setUsernameAction,setBottomstatusAction } from '../../store/action/App';


const tabs = [
  { title: <Badge >Deposit</Badge> },
  { title: <Badge >Withdraw</Badge> }
];
function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      <span>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}

const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: 'McDonald\'s invites you',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
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

class Transaction extends Component {

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      isLoading: true,
    };
  }

  componentDidMount(){
     this.props.actions.setBottomstatus(true);
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

  render() {

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
        <RecordItem></RecordItem>
      );
    };


    return (
      <div className={styles.body}>
        <TopBar></TopBar>
        <div className={styles.topLable}>
          <div className={styles.labelView}>
            <span className={styles.transLable}>Transaction</span>
          </div>
          <div className={styles.unitView}>
            <img src={nmtIcon} alt="" className={styles.nmtIcon}></img>
            <span className={styles.unitLable}>NMT(NFTMart)</span>
          </div>
        </div>
        <div className={styles.recordListView}>
          <Tabs tabs={tabs}
            initialPage={0}
            tabBarTextStyle={styles.tabBarStyle}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
          >
            <div >
              <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderHeader={() => <span>header</span>}
                renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                  {this.state.isLoading ? 'Loading...' : 'Loaded'}
                </div>)}
                renderRow={row}
                renderSeparator={separator}
                className="am-list"
                pageSize={4}
                useBodyScroll
                onScroll={() => { console.log('scroll'); }}
                scrollRenderAheadDistance={500}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
              Content of second tab
                        </div>
          </Tabs>
        </div>
      </div>
    )
  }

}
//获取最新的store里的状态，通过this.props获取
const mapStateToProps = (state)=>{
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
)(Transaction);

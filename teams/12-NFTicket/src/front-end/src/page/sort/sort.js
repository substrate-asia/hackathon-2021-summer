import React, { Component } from 'react'
import TopBar from '../../component/TopBar'
import styles from './sort.module.css'
import { Tabs, WhiteSpace, Badge,ListView } from 'antd-mobile';
import TicketItem from '../../component/TicketItem'

const tabs = [
  { title: <Badge >Unchecked</Badge> },
  { title: <Badge >Checked</Badge> },
  { title: <Badge >Refund</Badge> },
];


const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Event name',
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
  console.log("数据的条数:",dataBlob)
  return dataBlob;
}

export default class sort extends Component {

  constructor(props){
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
    const tabtextHeight = 44;
    //底部Tab高度
    const tabbarHeight = 46;
    //最后+26是因为直接按照前面的减去之后会有一部分留白区域,多种机型上都是26,就加上这个26[**暂时不清楚什么原因**]
    const height = parseInt(window.innerHeight)-searchbarHeight-whitespaceHeight-accountInfoHeight-titleHeight-tabtextHeight-2*tabbarHeight+26;

    return (
      <div className={styles.tabs}>
        <Tabs tabBarTextStyle={{height:'44px',fontSize:'14px',lineHeight:'14px'}} tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
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

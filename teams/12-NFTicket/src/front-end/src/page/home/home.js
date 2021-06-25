import React, { Component } from 'react';
import { ListView, Card, SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'


import './home.css';
import TopBar from '../../component/TopBar';


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
      }]
    };
  };

  componentDidMount() {
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

  render=() => {
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
      return (
        <div key={rowID} className='card-content'
          style={{ backgroundImage: "url('./images/bg/back.jpg')" }} onClick={() => this.props.history.push('/Home/activityDetail')}>
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
    //最后+26是因为直接按照前面的减去之后会有一部分留白区域,多种机型上都是26,就加上这个26[**暂时不清楚什么原因**]
    const height = parseInt(window.innerHeight)-searchbarHeight-whitespaceHeight-accountInfoHeight-2*tabbarHeight+26;
    return (
      <div className="content">
        <TopBar></TopBar>
        {/* <SearchBar className="search-bar" placeholder="Search" maxLength={8} />
        <WhiteSpace /> */}
        {/* <div className="account-info" style={{ width: '100%', height: '25px' }}> */}
          {/* <div className="account-info-left" style={{ display: 'flex' }}>
            <img className='icon-img' src='./images/icon.png' />
            <div className='icon-text'>
              <span>NFTicket</span>
    //搜索框高度
    const searchbarHeight = 25;
    //空白区域高度
    const whitespaceHeight = 9;
    //账户信息高度
    const accountInfoHeight = 25;
    //底部Tab高度
    const tabbarHeight = 46;
    //最后+26是因为直接按照前面的减去之后会有一部分留白区域,多种机型上都是26,就加上这个26[**暂时不清楚什么原因**]
    const height = parseInt(window.innerHeight)-searchbarHeight-whitespaceHeight-accountInfoHeight-2*tabbarHeight+26;
    return (<div className="content">
        <SearchBar className="search-bar" placeholder="Search" maxLength={8} />
        <WhiteSpace />
        <div className="account-info" style={{width:'100%',height:'25px'}}>
            <div className="account-info-left" style={{display:'flex'}}>
              <img className='icon-img' src='./images/icon.png'/>
              <div className='icon-text'>
                <span>NFTicket</span>
              </div>
              <img className='search-icon' src='./images/search.png'/>
            </div>
            <img className='search-icon' src='./images/search.png' />
          </div> */}
          {/* <div className='account-info-right'>
            <div className='right-text'>
              <span>0x4234...1e45</span>
            </div>
          </div> */}
        {/* </div> */}
        <div>
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderHeader={() => {console.log("card-height="+window.innerHeight +"///"+document.documentElement.clientHeight)}}
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
          style={{height:''+height+'px',overflow:'auto'}}
        />
        </div>
      </div>);
  }
}

export default Home;

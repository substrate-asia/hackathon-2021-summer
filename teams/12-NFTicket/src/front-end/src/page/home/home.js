import React,{Component} from 'react';
import { ListView,Card,SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'


import './home.css';


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
      dataList:[{
        flag:"A",
        createMonth:"12",
        desc:"Description",
        enentName:"Event Name",
        location:"Location details",
        startTime:"Start time"
      },{
        flag:"A",
        createMonth:"12",
        desc:"Description",
        enentName:"Event Name",
        location:"Location details",
        startTime:"Start time"
      },{
        flag:"A",
        createMonth:"12",
        desc:"Description",
        enentName:"Event Name",
        location:"Location details",
        startTime:"Start time"
      }]
    };
  };

  componentWillMount() {
    console.log(parseInt(document.body.clientHeight));
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
    console.log('reach end', document.body.clientHeight);
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
        style={{ height:'250px',padding: '15px 15px',
        margin:'15px 15px',
        backgroundImage:`url('./images/bg/back.jpg')`,
        borderRadius:'25px' }}>
          <div style={{display:'flex',width:'50px'}}>
            <img style={{ height: '64px', marginRight: '15px',borderRadius:'30px' }} src={obj.img} alt="" />
            <div style={{
                lineHeight: '10px',
                color: '#888',
                fontSize: 18,
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
              }}>Title</div>
          </div>
          <div style={{ display: 'flex', padding: '15px 0' }}>
            <div style={{ lineHeight: 1 }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.des}</div>
              <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>{rowID}</span></div>
            </div>
          </div>
        </div>
      );
    };
    const height = parseInt(document.body.clientHeight)-1000;
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
            <div className='account-info-right'>
              <div className='right-text'>
                <span>0x4234...1e45</span>
              </div>
            </div>
        </div>
        <div>
          <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderHeader={() => {}}
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
          style={{height:''+756+'px',overflow:'auto'}}
        />
        </div>
    </div>);
  }
}

export default Home;

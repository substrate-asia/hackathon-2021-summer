
import React,{Button,Component} from 'react';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

class Create extends Component{
  constructor(props) {
    super(props);

    this.state = {
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
  componentDidMount() {
    Events.scrollEvent.register('begin', (to, element)=> {
      console.log('begin', arguments);
    });

    Events.scrollEvent.register('end', (to, element)=> {
      console.log('end', arguments);
    });

    scrollSpy.update();
  }
  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }
  scrollToTop() {
    scroll.scrollToTop();
  }
  scrollToBottom() {
    scroll.scrollToBottom();
  }
  scrollTo() {
    scroll.scrollTo(100);
  }
  scrollMore() {
    scroll.scrollMore(100);
  }
  handleSetActive(to) {
    console.log(to);
  }
  render() {
    return (
      <div style={{height:'auto',overflow:'auto'}}>

        
        <a onClick={this.scrollToTop}>To the top!</a>
        <br/>
        <a onClick={this.scrollToBottom}>To the bottom!</a>
        <br/>
        <a onClick={this.scrollTo}>Scroll to 100px from the top</a>
        <br/>
        <a onClick={this.scrollMore}>Scroll 100px more from the current position!</a>
        <a onClick={this.scrollToTop}>To the top!</a>
        <br/>
        <a onClick={this.scrollToBottom}>To the bottom!</a>
        <br/>
        <a onClick={this.scrollTo}>Scroll to 100px from the top</a>
        <br/>
        <a onClick={this.scrollMore}>Scroll 100px more from the current position!</a>
        <a onClick={this.scrollToTop}>To the top!</a>
        <br/>
        <a onClick={this.scrollToBottom}>To the bottom!</a>
        <br/>
        <a onClick={this.scrollTo}>Scroll to 100px from the top</a>
        <br/>
        <a onClick={this.scrollMore}>Scroll 100px more from the current position!</a>
        <a onClick={this.scrollToTop}>To the top!</a>
        <br/>
        <a onClick={this.scrollToBottom}>To the bottom!</a>
        <br/>
        <a onClick={this.scrollTo}>Scroll to 100px from the top</a>
        <br/>
        <a onClick={this.scrollMore}>Scroll 100px more from the current position!</a>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  console.log("createcreatecreatecreatecreate")
  console.log(state.app);
  return {
      config:state.app
  }
}

const mapDispatchToProps = (dispatch)=>{
  
  return {
      actions:bindActionCreators({

      },dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
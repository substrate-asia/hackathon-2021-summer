import React,{Component} from 'react';
import {NavLink,Link} from 'react-router-dom';
import './BottomTab.css';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import bottomMine from "../../images/bottom-mine.png";

class BottomTab extends Component{
    constructor(){
        super();
        this.state={
            current:1,
            hide:false,
        }
    }

    setCurrentIndex(index) {
        this.setState({current:index});
    }

    render(){
        return(
            <div className={this.props.app.bottomstatus?'hidebottom':''}>
                <div className='routes-list'>
                    <Link className="tab-item" onClick={()=>{this.setCurrentIndex(1)}} to="/Home">
                        <div className="tab-item-icon"><img src={this.state.current===1?"./images/on/home-on.png":"./images/on/home-off.png"} 
                            alt="" width="20px" height="20px" /></div>
                        {/* <div className="tab-item-name">活动</div> */}
                    </Link>
                    <Link className="tab-item" onClick={()=>{this.setState({current:2})}} to="/Create"
                    activestyle={{backgroundImage:'./1.png'}}>
                        <div className="tab-item-icon"><img src={this.state.current===2?"./images/on/create-on.png":"./images/on/create-off.png"} 
                            alt="" width="20px" height="20px" /></div>
                        {/* <div className="tab-item-name">搜索</div> */}
                    </Link>
                    <Link className="tab-item" onClick={()=>{this.setState({current:3})}} to="/Home"
                    activestyle={{fontWeight:'bold',color:'red'}}>
                        <div className="tab-item-icon-middle"><img src={this.state.current===3?"./images/on/scan.png":"./images/on/scan.png"} 
                            alt="" width="50px" height="50px" /></div>
                        <div className="tab-item-name"></div>
                    </Link>
                    <Link className="tab-item" onClick={()=>{this.setState({current:4})}} to="/Sort"
                    activestyle={{fontWeight:'bold',color:'red'}}>
                        <div className="tab-item-icon"><img src={this.state.current===4?"./images/on/ticket-on.png":"./images/on/ticket-off.png"} 
                            alt="" width="20px" height="18px" /></div>
                        {/* <div className="tab-item-name">票据</div> */}
                    </Link>
                    <Link className="tab-item" onClick={()=>{this.setState({current:5})}} to="/Mine"
                    activestyle={{fontWeight:'bold',color:'red'}}>
                        <div className="tab-item-icon"><img src={this.state.current===5?"./images/on/me-on.png":"./images/on/me-off.png"} 
                            alt="" width="20px" height="20px" /></div>
                        {/* <div className="tab-item-name">我的</div> */}
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        app:state.app
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
)(BottomTab);
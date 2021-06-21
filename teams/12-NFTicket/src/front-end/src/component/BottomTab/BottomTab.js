import React,{Component} from 'react';
import {NavLink,Link} from 'react-router-dom';
import './BottomTab.css';

class BottomTab extends Component{
    constructor(){
        super();
        this.state={
            current:0,
        }
    }

    setCurrentIndex(index) {
        this.setState({current:index});
        console.log(index);
    }

    render(){
        return(
            <div className='routes-list'>
                <Link className="tab-item" onClick={()=>{this.setState({current:1})}} to="/Home">
                    <div className="tab-item-icon"><img src={this.state.current===1?"./images/1_active.png":"./images/1.png"} 
                        alt="" width="25px" height="25px" /></div>
                    {/* <div className="tab-item-name">活动</div> */}
                </Link>
                <NavLink className="tab-item" onClick={()=>{this.setState({current:2})}} to="/Search"
                activeStyle={{backgroundImage:'./1.png'}}>
                    <div className="tab-item-icon"><img src={this.state.current===2?"./images/2_active.png":"./images/2.png"} 
                        alt="" width="25px" height="25px" /></div>
                    {/* <div className="tab-item-name">搜索</div> */}
                </NavLink>
                <NavLink className="tab-item" onClick={()=>{this.setState({current:3})}} to="/Create"
                activeStyle={{fontWeight:'bold',color:'red'}}>
                    <div className="tab-item-icon-middle"><img src={this.state.current===3?"./images/3_active.png":"./images/3.png"} 
                        alt="" width="39px" height="39px" /></div>
                    <div className="tab-item-name"></div>
                </NavLink>
                <NavLink className="tab-item" onClick={()=>{this.setState({current:4})}} to="/Sort"
                activeStyle={{fontWeight:'bold',color:'red'}}>
                    <div className="tab-item-icon"><img src={this.state.current===4?"./images/4_active.png":"./images/4.png"} 
                        alt="" width="25px" height="25px" /></div>
                    {/* <div className="tab-item-name">票据</div> */}
                </NavLink>
                <NavLink className="tab-item" onClick={()=>{this.setState({current:5})}} to="/Mine"
                activeStyle={{fontWeight:'bold',color:'red'}}>
                    <div className="tab-item-icon"><img src={this.state.current===5?"./images/5_active.png":"./images/5.png"} 
                        alt="" width="25px" height="25px" /></div>
                    {/* <div className="tab-item-name">我的</div> */}
                </NavLink>
            </div>
        )
    }
}

export default BottomTab;
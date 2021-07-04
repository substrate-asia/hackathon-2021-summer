import React,{Component} from 'react';
import {Route} from 'react-router-dom';

import Home from './page/home/home';
import App from './App';
import Sort from './page/sort/sort';
import Create from './page/create/create';
import Search from './page/search/search';
import Mine from './page/mine/mine';
import TestModule from './page/testmodule/testmodule';
import TicketDetail from './page/TicketDetail/TicketDetail';
import ActivityDetail from './page/ActivityDetail/ActivityDetail';
import ConfirmVector from './page/ConfirmVector/ConfirmVector';
import CreateEvent from './page/CreateEvent/CreateEvent';
import Payment from './page/Payment/Payment';
import Transaction from './page/Transaction/Transaction';
import MyWallet from './page/MyWallet/MyWallet';
import './router.css';

class Routes extends Component{
    render(){
        return(
            <div className="wrapper">
                <div className='routes-list' style={{height:'100%'}}>
                    <Route exact path='/Home' component={Home}></Route>
                    <Route exact path='/' component={Home}></Route>
                    <Route exact path='/Sort' component={Sort}></Route>
                    <Route exact path='/Create' component={CreateEvent}></Route>
                    <Route exact path='/Search' component={Search}></Route>
                    <Route exact path='/Mine' component={Mine}></Route>
                    <Route exact path='/TestModule' component={TestModule}></Route>
                    <Route path='/Sort/ticketDetail' component={TicketDetail}></Route>
                    {/** 活动详情页面 */}
                    <Route path='/Home/activityDetail' component={ActivityDetail}></Route>
                    {/** 确认座位页面 */}
                    <Route path='/Home/ConfirmVector' component={ConfirmVector}></Route>
                    {/** 创建Event页面 */}
                    {/* <Route path='/Home/createEvent' component={CreateEvent}></Route> */}
                    {/** 购买页面*/}
                    <Route path='/Home/Payment' component={Payment}></Route>
                    {/** 交易记录页面 */}
                    <Route path='/Mine/Transaction' component={Transaction}></Route>
                    {/** 我的钱包页面 */}
                    <Route path='/Mine/wallet' component={MyWallet}></Route>
                </div>
            </div>
        )
    }
}

export default Routes;
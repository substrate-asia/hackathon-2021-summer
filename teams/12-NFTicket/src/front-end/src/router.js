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
import './router.css';

class Routes extends Component{
    render(){
        return(
            <div className="wrapper">
                <div className='routes-list' style={{height:'100%'}}>
                    <Route exact path='/Home' component={Home}></Route>
                    <Route exact path='/' component={App}></Route>
                    <Route exact path='/Sort' component={Sort}></Route>
                    <Route exact path='/Create' component={Create}></Route>
                    <Route exact path='/Search' component={Search}></Route>
                    <Route exact path='/Mine' component={Mine}></Route>
                    <Route exact path='/TestModule' component={TestModule}></Route>
                    <Route path='/Sort/ticketDetail' component={TicketDetail}></Route>
                </div>
            </div>
        )
    }
}

export default Routes;
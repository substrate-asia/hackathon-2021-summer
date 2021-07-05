import React from "react";
import { Switch, Route} from 'react-router-dom'

import Home from './Home';
import Galaxy from "./Galaxy";
import SignIn from "./author/SignIn";
import SignUp from "./author/SignUp";
import SignKey from "./author/SignKey";
import Wallet from "./author/Wallet";
import Profile from "./author/Profile";
import Stage from "./story/Stage";
import Finance from "./chain//Finance";
import Era from "./Era";
import Space from "./Space";
import Stars from "./Stars";
import Community from "./Community";
import Expedition from "./Expedition";

// import 404 from './404'


export default function Content() {
    return (
      <Switch>
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-key" component={SignKey} />
        <Route path="/wallet" component={Wallet} />
        <Route path="/profile" component={Profile} />
        <Route path="/finance" component={Finance} />
        <Route path="/galaxy" component={Galaxy} />
        <Route path="/space" component={Space} />
        <Route path="/era" component={Era} />
        <Route path="/stars" component={Stars} />
        <Route path="/community" component={Community} />
        <Route path="/expedition" component={Expedition} />
        <Route path="/stage/:stage_id" component={Stage} />
        <Route path="/" exact component={Home} />
      </Switch>
    )
}
import React from 'react';
import Home from './Home'
import Prices from './Prices'
import NewCryto from './NewCryto'
import CoinDetail from './CoinDetail'
import {HashRouter, NavLink, Route} from "react-router-dom";

class Main extends React.Component {

    render() {
        return (
            <HashRouter>
                <div>
                    <h1>Crytocurrency Tracker</h1>
                    <ul className="header">
                        <li><NavLink exact to="/portfolio">Portfolio</NavLink></li>
                        <li><NavLink to="/current-crytos">Current Crytos</NavLink></li>
                        <li><NavLink to="/prices">Prices</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/portfolio" component={Home}/>
                        <Route path="/current-crytos" component={NewCryto}/>
                        <Route path="/prices" component={Prices}/>
                        <Route path="/coins/:id" component={CoinDetail}/>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default Main
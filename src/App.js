import React from 'react';
import './App.css';
import api from './test/crytoAPI';
import buttons from './config/buttonsConfig';
import axios from 'axios';
import request from 'superagent';
import localCache from './localCache';
import {HashRouter, Link, NavLink, Route} from "react-router-dom";

let NumberFormat = require('react-number-format');


class CrytoForm extends React.Component {
    state = {name: '', name_abbrev: '', amount_purchased: '', price: ''};

    handleSubmit = (e) => {
        e.preventDefault();
        let name = this.state.name.trim();
        let name_abbrev = this.state.name_abbrev.trim();
        let amount_purchased = this.state.amount_purchased.trim();
        let price = this.state.price.trim();
        if (!name || !name_abbrev || !amount_purchased || !price) {
            return;
        }
        this.props.addHandler(name, name_abbrev, amount_purchased, price);
        this.setState({name: '', name_abbrev: '', amount_purchased: '', price: ''});
    };

    handleNameChange = (e) => this.setState({name: e.target.value});

    handleNameAbbrevChange = (e) => this.setState({name_abbrev: e.target.value});

    handleAmountPurchasedChange = (e) => this.setState({amount_purchased: e.target.value});

    handlePriceChange = (e) => this.setState({price: e.target.value});

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2">
                        <button type="button" className="btn btn-primary"
                                onClick={this.handleSubmit}>Add Crytocurrency
                        </button>
                    </div>
                    <div className="col-sm-3">
                        <input type="text" className="form-control"
                               placeholder="Name"
                               value={this.state.name}
                               onChange={this.handleNameChange}
                        />
                    </div>
                    <div className="col-sm-3">
                        <input type="text" className="form-control"
                               placeholder="Name Abbrev."
                               maxLength="3"
                               value={this.state.name_abbrev}
                               onChange={this.handleNameAbbrevChange}
                        />
                    </div>
                    <div className="col-sm-2">
                        <input type="number" className="form-control"
                               placeholder="Amount Purchased"
                               min="0"
                               value={this.state.amount_purchased}
                               onChange={this.handleAmountPurchasedChange}
                        />
                    </div>
                    <div className="col-sm-2">
                        <input type="number" className="form-control"
                               placeholder="Price"
                               min="0"
                               value={this.state.price}
                               onChange={this.handlePriceChange}
                        />
                    </div>

                </div>
            </div>
        );

    }
}

class Cryto extends React.Component {
    state = {
        status: '',
        name: this.props.cryto.name,
        name_abbrev: this.props.cryto.name_abbrev,
        amount_purchased: this.props.cryto.amount_purchased,
        price: this.props.cryto.price,
        market_cap: this.props.cryto.market_cap,
        volume_24h: this.props.cryto.volume_24h,
        circulating_supply: this.props.cryto.circulating_supply
    };
    handleEdit = () => this.setState({status: 'edit'});

    handleDelete = () => this.setState({status: 'deleteCryto'});

    handleConfirm = (e) => this.setState({status: ''},
        this.props.deleteHandler(this.props.cryto.price)
    );

    handleCancel = () => {
        this.setState({
            status: '',
            name: this.props.cryto.name,
            name_abbrev: this.props.cryto.name_abbrev,
            amount_purchased: this.props.cryto.amount_purchased,
            price: this.props.cryto.price
        });
    };


    handleNameChange = (e) => this.setState({name: e.target.value});
    handleNameAbbrevChange = (e) => this.setState({name: e.target.value});
    handleAmountPurchasedChange = (e) => this.setState({amount_purchased: e.target.value});
    handlePriceChange = (e) => this.setState({price: e.target.value});

    handleSave = (e) => {
        e.preventDefault();
        let name = this.state.name.trim();
        let name_abbrev = this.state.name_abbrev.trim();
        let amount_purchased = this.state.amount_purchased.trim();
        let price = this.state.price.trim();

        if (!name || !name_abbrev || !amount_purchased || !price) {
            return;
        }
        this.setState({status: ''});
        this.props.updateHandler(this.props.cryto.price,
            name, name_abbrev, amount_purchased, price);
    };


    render() {
        let activeButtons = buttons.normal;
        let leftButtonHandler = this.handleEdit;
        let rightButtonHandler = this.handleDelete;
        let fields = [
            <p key={'name'}>{this.state.name}</p>,
            <p key={'name_abbrev'}>{this.state.name_abbrev}</p>,
            <p key={'amount_purchased'}>Total Purchased: {this.state.amount_purchased}</p>,
            <p key={'price'}>Price Per Coin: {this.state.price}</p>,
            <p key={'total_invested'}>Total Invested: €{this.state.price * this.state.amount_purchased}</p>
        ];

        let additionalInfoFields = [
            <p key={'market_cap'}>Market Cap: {this.state.market_cap}</p>,
            <p key={'volume_24h'}>Volume (24h): {this.state.volume_24h}</p>,
            <p key={'circulating_supply'}>Circulating Supply: {this.state.circulating_supply}</p>
        ];

        if (this.state.status === 'edit') {
            activeButtons = buttons.edit;
            leftButtonHandler = this.handleSave;
            rightButtonHandler = this.handleCancel;
            fields = [
                <input type="text" className="form-control"
                       value={this.state.name}
                       onChange={this.handleNameChange}/>,
                <input type="text" className="form-control"
                       value={this.state.name_abbrev}
                       onChange={this.handleNameAbbrevChange}/>,
                <input type="number" className="form-control"
                       min="0"
                       value={this.state.amount_purchased}
                       onChange={this.handleAmountPurchasedChange}/>,
                <input type="number" className="form-control"
                       min="0"
                       value={this.state.price}
                       onChange={this.handlePriceChange}/>
            ];
        }

        if (this.state.status === 'deleteCryto') {
            activeButtons = buttons.delete;
            leftButtonHandler = this.handleCancel;
            rightButtonHandler = this.handleConfirm;
        }

        return (
            <div className="col-sm-6">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        {this.props.cryto.name} ({this.props.cryto.name_abbrev})
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-6">{fields}</div>
                            <div className="col-md-6">{additionalInfoFields}</div>
                        </div>
                    </div>
                    <div className="panel-footer">
                        <div className="btn-group btn-group-justified" role="group" aria-label="...">
                            <div className="btn-group" role="group">
                                <button type="button"
                                        className={'btn ' + activeButtons.leftButtonColor}
                                        onClick={leftButtonHandler}>
                                    {activeButtons.leftButtonVal}
                                </button>
                            </div>
                            <div className="btn-group" role="group">
                                <button type="button"
                                        className={'btn ' + activeButtons.rightButtonColor}
                                        onClick={rightButtonHandler}>
                                    {activeButtons.rightButtonVal}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class CrytoList extends React.Component {
    render() {
        let crytoRows = this.props.crytos.map(
            (c) =>
                <Cryto key={c.price} cryto={c}
                       updateHandler={this.props.updateHandler}
                       deleteHandler={this.props.deleteHandler}/>
        );


        return (
            <div className="container-fluid crytos">
                <div className="row">
                    {crytoRows}
                </div>
            </div>
        );
    }
}


class CrytoApp extends React.Component {

    render() {
        return (
            <div className="jumbotron">
                <Main/>
            </div>
        );
    }
}


class Main extends React.Component {

    render() {
        return (
            <HashRouter>
                <div>
                    <h1>Crytocurrency Tracker</h1>
                    <ul className="header">
                        <li><NavLink exact to="/">Portfolio</NavLink></li>
                        <li><NavLink to="/current-crytos">Current Crytos</NavLink></li>
                        <li><NavLink to="/prices">Prices</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Home}/>
                        <Route path="/current-crytos" component={NewCryto}/>
                        <Route path="/prices" component={Prices}/>
                        <Route path="/coins/:id" component={coinDetail}/>
                    </div>
                </div>
            </HashRouter>
        );
    }
}


class coinDetail extends React.Component {
    state = {};

    componentDidMount() {
        let coinName = '' ;
        let stockCoins = ['Bitcoin', 'Stellar' , 'Litecoin' , 'Ethereum' , 'Ripple'] ;
        if (!stockCoins.includes(this.props.match.params.id )) {
            coinName = 'Placeholder'
        }else{
            coinName = this.props.match.params.id
        }

        request.get(
        '/coinInfo/coins/' + coinName + '.json', (err, res) => {
                let json = JSON.parse(res.text);
                localCache.setCoin(json);
                this.setState({});
            });
    }

    render() {
        let display = <p>No coin details</p>;
        let coin = localCache.getCoin();
        if (coin) {
            display = (
                <div>
                    <AdditionalInfo coin={coin}/>
                </div>
            );
        }
        return (
            <div>
                {display}
            </div>
        );
    }
}


class AdditionalInfo extends React.Component {
    render() {
        let coin = this.props.coin;
        return (
            <div>

                <div className="panel panel-primary">
                    <div className="panel-heading"><h2>{coin.id}</h2></div>
                    <div>
                        <img src={coin.image}
                             alt={coin.name}
                             width="150"
                             height="150"
                        />
                    </div>
                    <div className="panel-body"><p>{coin.description}</p>
                        <h3>Transaction Volume</h3>
                        <p>{coin.transaction_volume.btc}</p>
                        <p>{coin.transaction_volume.eur}</p></div>
                </div>
            </div>
        );
    }
}


class Home extends React.Component {
    render() {
        let totalCrytos = api.getAll();
        let totalCoinAmount = api.getTotalCoins();
        let totalInvested = api.getTotalInvestment();

        let crytoDetails = totalCrytos.map(function (d, idx) {
            return <tr>
                <th scope="row">{idx + 1}</th>
                <td key={idx}><Link to={"/coins/" + d.name}>{d.name + ' ' + d.name_abbrev}</Link></td>
                <td key={idx}>{d.amount_purchased}</td>
                <td key={idx}>{d.price}</td>
                <td key={idx}>{d.market_cap}</td>
                <td key={idx}>{d.volume_24h}</td>
                <td key={idx}>{d.circulating_supply}</td>
            </tr>
        });

        return (
            <div>
                <h2>Portfolio Information</h2><br/>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="well">Total Number of Crytocurrencies Invested in: {totalCrytos.length}</div>
                    </div>
                    <div className="col-sm-4">
                        <div className="well">Total Number of Coins: {totalCoinAmount}</div>
                    </div>
                    <div className="col-sm-4">
                        <div className="well">Total Portfolio Value (€): {totalInvested}</div>
                    </div>
                </div>

                <table className="table table-striped">
                    <caption>Current Portfolio</caption>
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Amount Held</th>
                        <th scope="col">Purchase Price (€)</th>
                        <th scope="col">Market Cap</th>
                        <th scope="col">Volume (24h)</th>
                        <th scope="col">Circulating Supply</th>
                    </tr>
                    </thead>
                    <tbody>
                    {crytoDetails}
                    </tbody>
                </table>
            </div>
        );
    }
}

class NewCryto extends React.Component {

    updateCryto = (key, n, nb, a, p) => {
        api.update(key, n, nb, a, p);
        this.setState({});
    };

    deleteCryto = (k) => {
        api.deleteCryto(k);
        this.setState({});
    };

    addCryto = (n, nb, a, p) => {
        api.add(n, nb, a, p);
        this.setState({});
    };

    render() {
        let crytos = api.getAll();
        return (
            <div>
                <CrytoForm addHandler={this.addCryto}/><br/>
                <CrytoList crytos={crytos}
                           updateHandler={this.updateCryto}
                           deleteHandler={this.deleteCryto}/>
            </div>
        );
    }
}


class Prices extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cryptos: []
        };
    }

    componentDidMount() {
        let listOfCrytos = api.getNameAbbrevList().join();

        axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=' + listOfCrytos + '&tsyms=EUR')
            .then(res => {
                const cryptos = res.data;
                this.setState({cryptos: cryptos});
            })

    }

    render() {
        return (
            <div className="App">
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Live Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(this.state.cryptos).map((key) => (
                        <tr className="">
                            <td>{key}</td>
                            <td><NumberFormat value={this.state.cryptos[key].EUR} displayType={'text'}
                                              decimalprecision={2} thousandSeparator={true} prefix={'€'}/></td>
                        </tr>

                    ))}
                    </tbody>
                </table>
                <div className="well well-sm">All prices courtesy of cryptocompare.com</div>
            </div>
        )
    }
}


export default CrytoApp;
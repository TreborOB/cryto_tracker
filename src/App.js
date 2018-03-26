import React from 'react';
import './App.css';
import api from './test/stubAPI';
import buttons from './config/buttonsConfig';
import axios from 'axios';
import {HashRouter, NavLink, Route} from "react-router-dom";

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
    }

    handleNameChange = (e) => this.setState({name: e.target.value});

    handleNameAbbrevChange = (e) => this.setState({name_abbrev: e.target.value});

    handleAmountPurchasedChange = (e) => this.setState({amount_purchased: e.target.value});

    handlePriceChange = (e) => this.setState({price: e.target.value});

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2">
                        <button type="button" className="btn btn-success"
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
                    <div className="col-sm-3">
                        <input type="number" className="form-control"
                               placeholder="Amount Purchased"
                               value={this.state.amount_purchased}
                               onChange={this.handleAmountPurchasedChange}
                        />
                    </div>
                    <div className="col-sm-2">
                        <input type="number" className="form-control"
                               placeholder="Price"
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
        price: this.props.cryto.price
    };
    handleEdit = () => this.setState({status: 'edit'});

    handleDelete = () => this.setState({status: 'deleteCryto'});

    handleConfirm = (e) => this.setState({status: ''},
        this.props.deleteHandler(this.props.cryto.price)
    );

    handleSave = (e) => null;
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
        this.setState({status: ''})
        this.props.updateHandler(this.props.cryto.price,
            name, name_abbrev, amount_purchased, price);
    };


    render() {
        let activeButtons = buttons.normal;
        let leftButtonHandler = this.handleEdit;
        let rightButtonHandler = this.handleDelete;
        let fields = [
            <p key={'namebb'}>{this.state.name}</p>,
            <p key={'name_abbrev'}>{this.state.name_abbrev}</p>,
            <p key={'amount_purchased'}>Total Purchased: {this.state.amount_purchased}</p>,
            <p key={'price'}>Price Per Coin: {this.state.price}</p>,
            <p key={'total_invested'}>Total Invested: {this.state.price * this.state.amount_purchased}</p>
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
                <input type="text" className="form-control"
                       value={this.state.amount_purchased}
                       onChange={this.handleAmountPurchasedChange}/>,
                <input type="text" className="form-control"
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
            <div className="col-sm-3">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        {this.props.cryto.name} ({this.props.cryto.name_abbrev})
                    </div>
                    <div className="panel-body">
                        {fields}
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
                        <li><NavLink to="/new-cryto">New Cryto</NavLink></li>
                        <li><NavLink to="/prices">Prices</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Home}/>
                        <Route path="/new-cryto" component={NewCryto}/>
                        <Route path="/prices" component={Prices}/>
                        <Route path="/contact" component={Contact}/>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

class Home extends React.Component {
    render() {
        let totalCrytos = api.getAll();
        let totalCoinAmount = api.getTotalCoins();
        let totalInvested = api.getTotalInvestment();

        return (
            <div>
                <h2>Portfolio Information</h2><br/>
                <div className="well">Total Number of Crytocurrencies Invested in: {totalCrytos.length}</div>
                <div className="well">Total Number of Coins: {totalCoinAmount}</div>
                <div className="well">Total Investment (€): {totalInvested}</div>
            </div>
        );
    }
}

class Contact extends React.Component {
    render() {
        return (
            <div>
                <h2>MORE INFORMATION</h2>
                <p>Link to GitHub profile <a href="https://github.com/TreborOB">GitHub</a>.
                </p>
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
                <CrytoForm addHandler={this.addCryto}/>
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
                <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Purchase Price</th>
                        <th>Live Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(this.state.cryptos).map((key) => (
                        <tr className="">
                            <td>{key}</td>
                            <td>Doe</td>
                            <td><NumberFormat value={this.state.cryptos[key].EUR} displayType={'text'}
                                              decimalPrecision={2} thousandSeparator={true} prefix={'€'}/></td>
                        </tr>

                    ))}
                    </tbody>
                </table>
            </div>
        )
    }

}

export default CrytoApp;
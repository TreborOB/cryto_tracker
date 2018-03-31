import React from 'react';
import api from '../api/crytoAPI';
import axios from 'axios';
let NumberFormat = require('react-number-format');

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

        console.log(this.state.cryptos.toString())
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


export default Prices;
import React from 'react';
import api from '../api/crytoAPI';
import ReactTable from 'react-table'
import {Link} from "react-router-dom"

class Home extends React.Component {
    render() {
        let totalCrytos = api.getAll();
        let totalCoinAmount = api.getTotalCoins();
        let totalInvested = api.getTotalInvestment();

        const columns = [{
            Header: 'Name',
            accessor: 'name',
            Cell: ({row}) => (<Link to={{pathname: `/coins/${row.name}`}}>{row.name}</Link>),
        }, {
            Header: 'Amount Held',
            accessor: 'amount_purchased'
        }, {
            Header: 'Price',
            accessor: 'price',
        }, {
            Header: 'Market Cap',
            accessor: 'market_cap',
        }, {
            Header: 'Volume_24h',
            accessor: 'volume_24h',
        }, {
            Header: 'Circulating Supply',
            accessor: 'circulating_supply',
        }];

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
                <ReactTable
                    data={totalCrytos}
                    columns={columns}
                    minRows={10}
                    defaultPageSize={10}
                />
            </div>
        );
    }
}

export default Home
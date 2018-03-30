import React from 'react';
import buttons from '../config/buttonsConfig';

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
                            <div className="col-md-6">{fields}
                            </div>
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

export default Cryto
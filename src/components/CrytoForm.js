import React from 'react';

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

export default CrytoForm
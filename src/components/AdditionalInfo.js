import React from 'react';

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

export default AdditionalInfo;
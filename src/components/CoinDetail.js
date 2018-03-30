import React from 'react';
import localCache from './localCache';
import AdditionalInfo from './AdditionalInfo'
import request from 'superagent';

class coinDetail extends React.Component {

    componentDidMount() {
        let coinName = '';
        let stockCoins = ['Bitcoin', 'Stellar', 'Litecoin', 'Ethereum', 'Ripple'];
        if (!stockCoins.includes(this.props.match.params.id)) {
            coinName = 'Placeholder'
        } else {
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

export default coinDetail
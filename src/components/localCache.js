class LocalCache {

    constructor() {
        this.coin = null;
    }

    setCoin(coin) {
        this.coin = coin;
    }

    getCoin() {
        return this.coin;
    }

}

export default (new LocalCache() );

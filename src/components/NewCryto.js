import React from 'react';
import api from '../api/crytoAPI';
import CrytoList from './CrytoList'
import CrytoForm from './CrytoForm'

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

export default NewCryto
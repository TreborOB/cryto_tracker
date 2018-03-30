import React from 'react';
import Cryto from './Cryto'

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

export default CrytoList
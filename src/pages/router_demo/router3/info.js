import React from 'react';

export default class Info extends React.Component {


    render() {
        return (
            <div>
                this is for dynamic route.
                {this.props.match.params.mainId}
            </div>
        );
    }
}
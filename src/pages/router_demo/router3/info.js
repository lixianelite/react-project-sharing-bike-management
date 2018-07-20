import React from '../../../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react';

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
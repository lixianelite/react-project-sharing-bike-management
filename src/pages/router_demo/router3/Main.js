import React from '../../../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react';
import { Link } from '../../../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react-router-dom';


export default class Main extends React.Component {


    render() {
        return (
            <div>
                this is main page.
                <br/>
                <Link to="/main/test-id">Click me1</Link>
                <br/>
                <Link to="/main/456">Click me2</Link>
                <hr/>
                {this.props.children}
            </div>
        );
    }
}
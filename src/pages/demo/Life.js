import React from 'react';

import Child from './Child';

import './index.less'

import {Button} from 'antd';

export default class Life extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            count: 0
        };
    }

    handleAdd=()=>{
        this.setState({
            count: this.state.count+1
        })
    }


    render() {

        return <div className="content">
            <p>React Life Cycle Introduction</p>

            <Button onClick={this.handleAdd}>AntD Click</Button>

            <button onClick={this.handleAdd}>Click</button>

            <p>{this.state.count}</p>

            <Child name={this.state.count}></Child>
        </div>
    }
}
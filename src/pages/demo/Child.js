import React from 'react';

export default class Child extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            count: 0
        };
    }

    componentWillMount() {
        console.log('will Mount');
    }

    componentDidMount() {
        console.log('did mount');
    }

    componentWillReceiveProps(newProps) {
        console.log('will Props' + newProps.name);
    }

    shouldComponentUpdate() {
        console.log('should update');
        return true;
    }

    componentWillUpdate() {
        console.log('will Update');
    }

    componentDidUpdate(){
        console.log('did update')
    }

    render() {
        return <div>
            <p>This is child page</p>
            <p>{this.props.name}</p>
        </div>
    }
}
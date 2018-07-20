import React from 'react';
import {Card, Table, Modal} from 'antd';
import axios from './../../axios/index';

export default class BasicTable extends React.Component {

    state = {
        dataSource2: []
    }

    componentDidMount() {
        const dataSource = [
            {   
                key: 1,
                id: '0',
                userName: 'Jack',
                gender: '1',
                state: '1',
                interest: 'basketball',
                birthday: '2000-01-01',
                address: 'Atlanta Georgia',
                time: '08:00'
            },
            {
                key:2,
                id: '1',
                userName: 'Tom',
                gender: '1',
                state: '1',
                interest: 'basketball',
                birthday: '2000-01-01',
                address: 'Atlanta Georgia',
                time: '08:00'
            },
            {
                key:3,
                id: '2',
                userName: 'Lily',
                gender: '1',
                state: '1',
                interest: 'basketball',
                birthday: '2000-01-01',
                address: 'Atlanta Georgia',
                time: '08:00'
            },
        ]
        this.setState({
            dataSource: dataSource
        })

        this.request();
    }

    request = () => {
        axios.ajax({
            url: 'table/list',
            data: {
                params: {
                    page:1
                },
            isShowLoading: true
            }
        }).then((res) => {
            if(res.code === 0) {
                this.setState({
                    dataSource2: res.result
                })
            }
        })
    }

    onRowClick = (record, index) => {
        let selectKey = [index];
        Modal.info({
            title: 'info',
            content: `userName: ${record.userName}, hobby: ${record.interest}`
        })
        this.setState({
            selectedRowKeys: selectKey,
            seleckedItem: record
        })
    }




    render() {

        const columns = [
            {
                title: 'Id',
                dataIndex: 'id'
            },
            {
                title: 'Username',
                dataIndex: 'userName'
            },
            {
                title: 'Gender',
                dataIndex: 'gender',
                render(gender) {
                    return gender === 1 ? 'Male' : 'Female'
                }
            },
            {
                title: 'Status',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1' : 'Fish',
                        '2' : 'Shark',
                        '3' : 'Dolphin',
                        '4' : 'Salmon',
                        '5' : 'Turpila'
                    }
                    return config[state];
                }
            },
            {
                title: 'Interest',
                dataIndex: 'interest',
                render(interest) {
                    let config = {
                        '1' : 'Basketball',
                        '2' : 'Swim',
                        '3' : 'Soccer',
                        '4' : 'Footbal',
                        '5' : 'Baseball',
                        '6' : 'Pingpang',
                        '7' : 'Tennis',
                        '8' : 'Volleyball'
                    }
                    return config[interest];
                }
            },
            {
                title: 'Birthday',
                dataIndex: 'birth date'
            },
            {
                title: 'Address',
                dataIndex: 'address'
            }
        ]
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }


        return (
            <div>
                <Card title="Basic Table">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />

                </Card>

                <Card title="Dynamic Table" style={{margin:'10px 0px'}}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />

                </Card>


                <Card title="Mock - Select" style={{margin:'10px 0px'}}>
                    <Table
                        bordered
                        rowSelection = {rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            };
                        }}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />

                </Card>
            </div>
        )
    }
}
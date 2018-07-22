import React from 'react';
import {Card, Table, Modal, Button, message} from 'antd';
import axios from './../../axios/index';
import utils from '../../utils/utils';

export default class BasicTable extends React.Component {

    state = {
        dataSource2: []
    }

    params = {
        page: 1
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
        let _this = this;
        axios.ajax({
            url: 'table/list',
            data: {
                params: {
                    page:this.params.page
                },
            isShowLoading: true
            }
        }).then((res) => {
            if(res.code === 0) {
                this.setState({
                    dataSource2: res.result.list,
                    selectedRowKeys: [],
                    selectedRows:null,
                    pagination: utils.pagination(res, (current)=>{
                        _this.params.page = current;
                        this.request();
                    })

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

    handleDelete = () => {
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map((item) => 
            ids.push(item.id)
        )

        Modal.confirm({
            title: 'Warning',
            content: 'Are you sure?',
            onOk: () => {
                message.success(`Delete success! ${ids.join(',')}`);
                this.request();
            }
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
                dataIndex: 'birthdate'
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

        const rowCheckSelection = {
            type: 'checkBox',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
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

                <Card title="Mock - Multi-Select" style={{margin:'10px 0px'}}>
                    <div style={{marginBottom: 10}}>
                        <Button onClick={this.handleDelete}>Delete</Button>
                    </div>
                    <Table
                        bordered
                        rowSelection = {rowCheckSelection}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />

                </Card>


                <Card title="Mock - Pagination" style={{margin:'10px 0px'}}>
                    <div style={{marginBottom: 10}}>
                        <Button onClick={this.handleDelete}>Delete</Button>
                    </div>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={this.state.pagination}
                    />

                </Card>
            </div>
        )
    }
}
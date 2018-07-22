import React from 'react';
import {Card, Table, Badge, Modal, message} from 'antd';
import axios from './../../axios/index';

export default class AdvancedTable extends React.Component {

    state={}
    params = {page: 1}

    componentDidMount() {
        this.request();
    }

    request = () => {

        axios.ajax({
            url: 'table/high/list',
            data: {
                params: {
                    page:this.params.page
                },
            isShowLoading: true
            }
        }).then((res) => {
            if(res.code === 0) {
                this.setState({
                    dataSource: res.result.list,
                })
            }
        })
    }

    handleChange = (pagination, filters, sorter) => {
        this.setState({
            sortOrder: sorter.order
        })
    }

    handleDelete = (item) => {
        Modal.confirm({
            title: 'Confirm',
            content: 'Are you sure?',
            onOk: () =>{
                message.success('Delete Success');
                this.request();
            }
        })
    }


    render() {

        const columns = [
            {
                title: 'Id',
                width:80,
                dataIndex: 'id'
            },
            {
                title: 'Username',
                width:80,
                dataIndex: 'userName'
            },
            {
                title: 'Gender',
                width:80,
                dataIndex: 'gender',
                render(gender) {
                    return gender === 1 ? 'Male' : 'Female'
                }
            },
            {
                title: 'Status',
                width:80,
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
                width:80,
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
                width:120,
                dataIndex: 'birth date'
            },
            {
                title: 'Address',
                width:120,
                dataIndex: 'address'
            }
        ]

        const columns2 = [
            {
                title: 'Id',
                width:80,
                dataIndex: 'id',
                fixed: 'left'
            },
            {
                title: 'Username',
                width:80,
                dataIndex: 'userName',
                fixed: 'left'
            },
            {
                title: 'Gender',
                width:80,
                dataIndex: 'gender',
                render(gender) {
                    return gender === 1 ? 'Male' : 'Female'
                }
            },
            {
                title: 'Status',
                width:80,
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
                width:80,
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
                width:120,
                dataIndex: 'birth date1'
            },
            {
                title: 'Birthday',
                width:120,
                dataIndex: 'birth date2'
            },{
                title: 'Birthday',
                width:120,
                dataIndex: 'birth date3'
            },{
                title: 'Birthday',
                width:120,
                dataIndex: 'birth date4'
            },{
                title: 'Birthday',
                width:120,
                dataIndex: 'birth date5'
            },{
                title: 'Birthday',
                width:120,
                dataIndex: 'birth date6'
            },{
                title: 'Birthday',
                width:120,
                dataIndex: 'birth date7'
            },{
                title: 'Birthday',
                width:120,
                dataIndex: 'birth date8'
            },{
                title: 'Birthday',
                width:120,
                dataIndex: 'birth date9'
            },{
                title: 'Birthday',
                width:120,
                dataIndex: 'birth date10'
            },
            {
                title: 'Address',
                width:120,
                dataIndex: 'address'
            }
        ]

        const columns3 = [
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
                title: 'Age',
                dataIndex: 'age',
                sorter: (a, b)=> {
                    return a.age - b.age
                },
                sortOrder: this.state.sortOrder
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

        const columns4 = [
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
                title: 'Age',
                dataIndex: 'age',
            },
            {
                title: 'Status',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1' : <Badge status="success" text="success"/>,
                        '2' : <Badge status="error" text="error"/>,
                        '3' : <Badge status="default" text="default"/>,
                        '4' : <Badge status="processing" text="processing"/>,
                        '5' : <Badge status="warning" text="warning"/>
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
            },
            {
                title: 'Operation',
                render:  (text, item) => {
                    return <a onClick={(item) => {this.handleDelete(item)}}>Delete</a>
                }
            }
        ]
    
        return (
            <div>

                <Card title="Fixed Head Table">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{y:240}}
                    />

                </Card>


                <Card title="Left Fixed Table" style={{margin:'10px 0px'}}>
                    <Table
                        bordered
                        columns={columns2}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{x:1720}}
                    />

                </Card>

                <Card title="Sortable Table" style={{margin:'10px 0px'}}>
                    <Table
                        bordered
                        columns={columns3}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        onChange={this.handleChange}
                    />

                </Card>

                <Card title="Badge Table" style={{margin:'10px 0px'}}>
                    <Table
                        bordered
                        columns={columns4}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        onChange={this.handleChange}
                    />

                </Card>


            </div>
        )
    }

}

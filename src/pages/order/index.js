import React from 'react';
import {Card, Button, Table, Form, Select, Modal, message, DatePicker} from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
import '../../style/common.less';
const FormItem = Form.Item;
const Option = Select.Option;

export default class Order extends React.Component {

    state = {}

    params = {
        page:1
    }

    componentDidMount() {
        this.requestList()
    }

    requestList = () => {
        let _this = this;
        axios.ajax({
            url: "/order/list",
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            let list = res.result.item_list.map((item, index) => {
                item.key = index;
                return item;
            });
            this.setState({
                list,
                pagination: Utils.pagination(res, (current) => {
                    _this.params
                })
            })
        })
    }


    
    render() {
        const columns = [
            {
                title: 'Order ID',
                dataIndex: 'order_sn'
            },
            {
                title: 'Bike SN',
                dataIndex: 'bike_sn'
            },
            {
                title: 'Username',
                dataIndex: 'username'
            },
            {
                title: 'Telephone',
                dataIndex: 'mobile'
            },
            {
                title: 'Distance',
                dataIndex: 'distance'
            },
            {
                title:'Total Time',
                dataIndex: 'total_time',
            },
            {
                title:'Status',
                dataIndex: 'status'
            },
            {
                title:'Start Time',
                dataIndex: 'start_time',
                render: Utils.formateDate
            },
            {
                title:'End Time',
                dataIndex: 'end_time',
                render: Utils.formateDate
            },
            {
                title:'Order Fee',
                dataIndex: 'total_fee'
            },
            {
                title:'User Pay',
                dataIndex: 'user_pay'
            }
        ]
        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card style={{marginTop:10}}>
                    <Button>Order Detail</Button>
                    <Button>Complete Order</Button>
                </Card>
                <div className="content-wrap">
                <Table
                    bordered
                    columns={columns}
                    dataSource={this.state.list}
                    pagination={this.state.pagination}
                    />
                </div>
            </div>
        )
    }
}

class FilterForm extends React.Component{

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout="inline">
                <FormItem label="City">
                    {
                        getFieldDecorator('city_id') (
                            <Select placeholder="All" style={{width:110}}>
                                <Option value="">All</Option>
                                <Option value="2">Chicago</Option>
                                <Option value="3">Seattle</Option>
                                <Option value="4">New York</Option>
                                <Option value="5">Los Angelas</Option>
                                <Option value="6">San Fransico</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="Order Time">
                    {
                        getFieldDecorator('start_time') (
                            <DatePicker showtime format="YYYY-MM-D HH:mm:ss" />
                        )
                    }
                    {
                        getFieldDecorator('end_time') (
                            <DatePicker style={{marginLeft: 5}} showtime format="YYYY-MM-D HH:mm:ss" />
                        )
                    }
                </FormItem>

                <FormItem label="Order Status">
                    {
                        getFieldDecorator('order_status') (
                            <Select placeholder="All" style={{width:100}}>
                                <Option value="">All</Option>
                                <Option value="1">In use</Option>
                                <Option value="2">Break</Option>
                                <Option value="3">Complete</Option>
                            </Select>
                        )
                    }
                </FormItem>

                <FormItem>
                    <Button type="primary" style={{margin:'0 20px'}}>Search</Button>
                    <Button>Reset</Button>
                </FormItem>
            </Form>
        );
    }
};
FilterForm = Form.create({})(FilterForm);
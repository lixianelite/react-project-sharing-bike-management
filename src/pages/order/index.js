import React from 'react';
import {Card, Button, Table, Form, Select, Modal, message, DatePicker} from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
import '../../style/common.less';
const FormItem = Form.Item;
const Option = Select.Option;

export default class Order extends React.Component {

    state = {
        orderInfo: {},
        orderConfirmVisble: false
    }

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
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        })
    }

    handleConfirm = ()=>{
        let item = this.state.seleckedItem;
        if(!item) {
            return;
        }
        axios.ajax({
            url:'/order/ebike_info',
            data:{
                params: {
                    OrderId: item.id
                }
            }
        }).then((res)=>{
            if(res.code === 0 ){
                this.setState({
                    orderInfo:res.result,
                    orderConfirmVisble: true
                })
            }
        })
    }

    handleFinishOrder = () => {
       let item = this.state.seleckedItem;
        axios.ajax({
            url:'/order/finish_order',
            data:{
                params:{
                    orderId: item.id
                }
            }
        }).then((res)=>{
            if(res.code === 0 ){
                message.success('Order Complete!');
                this.setState({
                    orderInfo:res.result,
                    orderConfirmVisble: false
                })
                this.requestList();
            }
        })
    }

    onRowClick = (record, index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            seleckedItem: record
        })
    }

    openOrderDetail = () => {
        let item = this.state.seleckedItem;
        if(!item) {
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`, '_blank');
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
        
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span:25}
        }

        const selectedRowKeys = this.state.selectedRowKeys;

        const rowSelection = {
            type: 'radio',
            selectedRowKeys: selectedRowKeys
        }

        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.openOrderDetail}>Order Detail</Button>
                    <Button type="primary" onClick= {this.handleConfirm}>Complete Order</Button>
                </Card>
                <div className="content-wrap">
                <Table
                    bordered
                    columns={columns}
                    dataSource={this.state.list}
                    pagination={this.state.pagination}
                    rowSelection={rowSelection}
                    onRow={(record, index) => {
                        return {
                            onClick: () => {
                                this.onRowClick(record, index);
                            }
                        }
                    }}
                    />
                </div>
                <Modal
                    title="Complete Order"
                    visible={this.state.orderConfirmVisble}
                    onCancel={()=>{
                        this.setState({
                            orderConfirmVisble:false
                        })
                    }}
                    onOk={this.handleFinishOrder}
                    width={600}
                >
                    <Form layout="horizontal">
                        <FormItem label="Bike SN" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="Battery" {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="Start Time" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="Location" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
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
                </FormItem>
                <FormItem label="Order Time">
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
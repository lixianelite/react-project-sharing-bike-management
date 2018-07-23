import React from 'react';
import {Card, Button, Table, Form, Select, Modal, message, DatePicker} from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
import '../../style/common.less';
import BaseForm from '../../components/BaseForm';
import Etable from '../../components/Etable';
const FormItem = Form.Item;

export default class Order extends React.Component {

    state = {
        orderInfo: {},
        orderConfirmVisble: false
    }

    params = {
        page:1
    }

    formList = [
        {
            type:'SELECT',
            label: 'City',
            field: 'city',
            placeholder: 'All',
            initialValue: '1',
            width: 100,
            list: [{id: '0', name: 'All'}, {id: '1', name: 'Atlanta'}, {id: '2', name: 'Seatle'},{id: '3', name: 'Chicago'},{id: '4', name: 'Los Angelas'}]
        },
        {
            type:'DATESELECT'
        },
        {
            type:'SELECT',
            label: 'Order Status',
            field: 'order_status',
            placeholder: 'All',
            initialValue: '1',
            width: 80,
            list: [{id: '0', name: 'All'},{id: '1', name: 'In use'}, {id: '2', name: 'Break'}, {id: '3', name: 'Complete'}]
        }
    ]

    componentDidMount() {
        this.requestList()
    }

    requestList = () => {
        let _this = this;
        axios.requestList(_this, "/order/list", this.params);
    }

    handleConfirm = ()=>{
        let item = this.state.selectedItem;
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
       let item = this.state.selectedItem;
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

    openOrderDetail = () => {
        let item = this.state.selectedItem;
        if(!item) {
            return;
        }
        window.open(`/#/common/order/detail/${item[0].id}`, '_blank');
    }

    handleFilter = (params) => {
        this.prarams = params;
        this.requestList();
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
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}/>
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.openOrderDetail.bind(this)}>Order Detail</Button>
                    <Button type="primary" onClick= {this.handleConfirm}>Complete Order</Button>
                </Card>
                <div className="content-wrap">
                    <Etable
                        updateSelectedItem = {Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys = {this.state.selectedRowKeys}
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
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
import React from 'react';
import {Card, Button, Table, Form, Select, Modal, message} from 'antd';
import axios from './../../axios/index';
import Utils from './../../utils/utils';
import '../../style/common.less';
const FormItem = Form.Item;
const Option = Select.Option;

export default class City extends React.Component {

    state = {
        list: [],
        isShowOpenCity: false
    }
    
    params = {
        page: 1
    }


    handleOpenCity = () => {
        this.setState({
            isShowOpenCity: true
        })
    }

    handleSubmit = () => {
        const cityInfo = this.cityForm.props.form.getFieldsValue();
        console.log(cityInfo);
        axios.ajax({
            url: '/city/open',
            data: {
                params:cityInfo
            }
        }).then((res) => {
            if(res.code === 0){
                message.success('Open Success');
                this.setState({
                    isShowOpenCity: false
                });
                this.requestList();
            }
        })
    }

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        let _this = this;
        axios.ajax({
            url: "/open_city",
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            this.setState({
                list: res.result.item_list.map((item, index) => {
                    item.key = index;
                    return item;
                }),
                pagination: Utils.pagination(res, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        })
    }


    render() {
    
        const columns = [
            {
                title: 'City ID',
                dataIndex: 'id'
            },
            {
                title: 'City Name',
                dataIndex: 'name'
            },
            {
                title: 'mode',
                dataIndex: 'mode'
            },
            {
                title: 'Operation mode',
                dataIndex: 'op_mode'
            },
            {
                title: 'Franchise Company',
                dataIndex: 'franchise_name'
            },
            {
                title:'City Admin',
                dataIndex: 'city_admins',
                render(arr){
                    return arr.map((item)=> {
                        return item.user_name
                    }).join(',');
                }
            },
            {
                title:'Open Time',
                dataIndex: 'open_time'
            },
            {
                title:'Update Time',
                dataIndex: 'update_time',
                render: Utils.formateDate
            },
            {
                title:'System Username',
                dataIndex: 'sys_user_name'
            }
        ]

        return (
            <div>
                <Card>
                    <FilterForm/>
                </Card>
                <Card style={{marginTop: 10}}>
                    <Button type="primary" onClick={this.handleOpenCity}>City Open</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        />
                </div>
                <Modal 
                    title='City'
                    visible={this.state.isShowOpenCity}
                    onCancel={() => {
                        this.setState({
                            isShowOpenCity: false
                        })
                    }}
                    onOk={this.handleSubmit}
                    >
                    <OpenCityForm wrappedComponentRef={(inst) => {
                        this.cityForm = inst
                    }}/>
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
                <FormItem label="Mode">
                    {
                        getFieldDecorator('mode') (
                            <Select placeholder="All" style={{width:80}}>
                                <Option value="">All</Option>
                                <Option value="1">Long</Option>
                                <Option value="2">Short</Option>
                            </Select>
                        )
                    }
                </FormItem>

                <FormItem label="Operation Mode">
                    {
                        getFieldDecorator('op_mode') (
                            <Select placeholder="All" style={{width:100}}>
                                <Option value="">All</Option>
                                <Option value="1">Private</Option>
                                <Option value="2">Corporate</Option>
                            </Select>
                        )
                    }
                </FormItem>

                <FormItem label="Status">
                    {
                        getFieldDecorator('status') (
                            <Select placeholder="All" style={{width:120}}>
                                <Option value="">All</Option>
                                <Option value="1">Authorized</Option>
                                <Option value="2">Unauthorized</Option>
                            </Select>
                        )
                    }
                </FormItem>

                <FormItem label="Status">
                    <Button type="primary" style={{margin:'0 20px'}}>Search</Button>
                    <Button>Reset</Button>
                </FormItem>
            </Form>
        );
    }
};
FilterForm = Form.create({})(FilterForm);

class OpenCityForm extends React.Component {
    render(){

        const formItemLayout = {
            labelCol: {
                span:7
            },
            wrapperCol: {
                span:10
            }
        }
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="horizontal">
                <FormItem label="Choose: " {...formItemLayout}>
                    {
                        getFieldDecorator('city_id', {
                            initialValue: '1'
                        })(
                        <Select style={{width:100}}>
                            <Option value="">All</Option>
                            <Option value="1">Washington DC</Option>
                        <Option value="2">Miami</Option>
                        </Select>
                        )
                    }
                    
                </FormItem>
                <FormItem label="Operation Mode:" {...formItemLayout}>
                    {
                        getFieldDecorator('op_mode', {
                            initialValue: '1'
                        })(
                            <Select style={{width:100}}>
                                <Option value="">All</Option>
                                <Option value="1">Private</Option>
                                <Option value="2">Franchise</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="Usage Mode: " {...formItemLayout}>
                    {
                        getFieldDecorator('usage_mode', {
                            initialValue: '1'
                        })(
                            <Select style={{width:100}}>
                                <Option value="">All</Option>
                                <Option value="1">Specific</Option>
                                <Option value="2">Location Ban</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
OpenCityForm = Form.create({})(OpenCityForm);
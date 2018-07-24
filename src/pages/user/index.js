import React from 'react';
import {Card, Modal, Form, Button, Input, Radio, DatePicker, Select} from 'antd';
import BaseForm from './../../components/BaseForm';

import axios from './../../axios';
import Utils from './../../utils/utils';
import moment from 'moment';

import Etable from './../../components/Etable';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

export default class User extends React.Component{

    params = {
        page: 1
    }

    state = {
        isVisible: false
    }

    formList = [
        {
            type:'INPUT',
            label: 'Username',
            field: 'user_name',
            placeholder: 'Input username',
            width: 80
        },
        {
            type:'INPUT',
            label: 'Mobile',
            field: 'user_mobile',
            placeholder: 'Input Mobile Number',
            width: 80,
        },
        {
            type:'DATEPICKER',
            label: 'Choose date on board',
            field: 'user_date',
        }
    ]

    handleFilter = (params) => {
        this.params = params
        this.requestList();
    }

    requestList = () => {
        axios.requestList(this, '/table/list1', this.params);
    }

    componentDidMount() {
        this.requestList();
    }

    handleOperate = (type) => {
        let item = this.state.selectedItem;
        if(type === 'create') {
            this.setState({
                type,
                isVisible: true,
                title: 'create user'
            })
        }else if(type==='edit') {
            if(!item) {
                Modal.info({
                    title: 'Info',
                    content: 'Choose a user record'
                })
                return;
            }
            this.setState({
                type,
                isVisible: true,
                title: 'Edit user',
                userInfo: item[0]
            })
        }else if (type === 'detail') {
            this.setState({
                type,
                isVisible: true,
                title: 'User Detail',
                userInfo: item[0]
            })
        }else {
            if(!item) {
                Modal.info({
                    title: 'Info',
                    content: 'Choose a user record'
                })
                return;
            }
            let _this = this;
            Modal.confirm({
                title: 'Confirm',
                onOk() {
                    axios.ajax({
                        url: '/user/delete',
                        data:{
                            params: {
                                id: item[0].id
                            }
                        }
                    }).then((res) => {
                        if(res.code === 0) {
                            _this.setState({
                                isVisible: false
                            });
                        }
                        _this.requestList();
                    })
                }
            })
        }
    }

    handleSubmit = () => {
        let data = this.userForm.props.form.getFieldsValue();
        axios.ajax({
            url: '/user/add',
            data: {
                params: data
            }
        }).then((res) => {
            if(res.code === 0) {
                this.userForm.props.form.resetFields();
                this.setState({
                    isVisible: false
                })
                this.requestList();
            }
        })
    }

    render() {

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id'
            },
            {
                title: 'Username',
                dataIndex: 'username'
            },
            {
                title: 'Gender',
                dataIndex: 'gender',
                render(gender) {
                    return gender === 1 ? 'Male' : 'Female';
                }
            },
            {
                title: 'State',
                dataIndex: 'state'
            },
            {
                title: 'Hobby',
                dataIndex: 'interest'
            },
            {
                title: 'Birth date',
                dataIndex: 'birthdate'
            },
            {
                title: 'Address',
                dataIndex: 'address'
            },
            {
                title: 'Time',
                dataIndex: 'time'
            },
        ]

        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit = {this.handleFilter} />
                </Card>
                <Card style={{marginTop:10}} className="operate-wrap">
                    <Button type="primary" icon="plus" onClick={() => this.handleOperate('create')}>Create User</Button>
                    <Button type="primary" icon="edit" onClick= {() => this.handleOperate('edit')}>Edit Order</Button>
                    <Button type="primary" onClick= {() => this.handleOperate('detail')}>User Detail</Button>
                    <Button type="primary" icon="delete" onClick= {() => this.handleOperate('delete')}>Delete User</Button>

                </Card>
                <div className="content-wrap">
                    <Etable
                        updateSelectedItem = {Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys = {this.state.selectedRowKeys}
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={() => {
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isVisible: false
                        })
                    }}
                    width={600}
                >
                    <UserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(inst) => this.userForm=inst}/>
                </Modal>
                
            </div>
        )
    }
}

class UserForm extends React.Component{


    render() {

        let type = this.props.type;
        let userInfo = this.props.userInfo || {};



        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {span:5},
            wrapperCol: {span: 19}
        }


        return (
        <Form layout="horizontal">
            <FormItem label="Username" {...formItemLayout}>                
                {
                    getFieldDecorator('user_name', {
                        initialValue: userInfo.username
                    })(
                        <Input type="text" placeholder="Input your username"/>
                    )
                }
            </FormItem>
            <FormItem label="Gender" {...formItemLayout}>
                {
                    getFieldDecorator('gender', {
                        initialValue: userInfo.gender
                    })(
                    <RadioGroup>
                        <Radio value={1}>Male</Radio>
                        <Radio value={2}>Female</Radio>
                    </RadioGroup>
                )}
            </FormItem>
            <FormItem label="State" {...formItemLayout}>
                {
                    getFieldDecorator('state', {
                        initialValue: userInfo.state
                    })(
                    <Select>
                        <Option value={1}>test1</Option>
                        <Option value={2}>test2</Option>
                        <Option value={3}>test3</Option>
                        <Option value={4}>test4</Option>
                        <Option value={5}>test5</Option>
                    </Select>
                )}
            </FormItem>
            <FormItem label="生日" {...formItemLayout}>
                {
                    getFieldDecorator('birthday', {
                        initialValue: moment(userInfo.birthday)
                    })(
                    <DatePicker />
                )}
            </FormItem>
            <FormItem label="联系地址" {...formItemLayout}>
                {
                    getFieldDecorator('address', {
                        initialValue: userInfo.address
                    })(
                    <Input.TextArea rows={3} placeholder="请输入联系地址"/>
                )}
            </FormItem>
        </Form>
        )
    }
}

UserForm = Form.create({})(UserForm);
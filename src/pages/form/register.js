import React from 'react';

import {Card, Form, Input, Icon, Button, Select, Switch, DatePicker, TimePicker, Upload, Radio, InputNumber, Checkbox} from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

class Register extends React.Component{

    state={}

    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        console.log(JSON.stringify(userInfo));
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl => this.setState({
            userImg: imageUrl,
            loading: false,
          }));
        }
      }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol:{
                xs: 24,
                sm: 12
            }
        }
        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {span:12, offset: 4}
            }
        }

        return (
            
            <div>
                <Card title="Registration Form">
                    <Form layout="horizontal">
                        <FormItem label="Username" {...formItemLayout}>
                            {
                                getFieldDecorator('userName',{
                                    initialValue: '',
                                    rules:[
                                        {
                                            required:true,
                                            message: 'Username cannot be empty'
                                        }
                                    ]
                                })(
                                    <Input placeholder="input username"/>
                                )
                            }
                        </FormItem>
                        <FormItem label="Password" {...formItemLayout}>
                            {
                                getFieldDecorator('userPwd',{
                                    initialValue: '',
                                    rules:[
                                        {
                                            required:true,
                                            message: 'Username cannot be empty'
                                        }
                                    ]
                                })(
                                    <Input type="password" placeholder="input password"/>
                                )
                            }
                        </FormItem>

                        <FormItem label="Gender" {...formItemLayout}>
                            {
                                getFieldDecorator('gender',{
                                    initialValue: '',
                                })(
                                    <RadioGroup>
                                        <Radio value="1">Male</Radio>
                                        <Radio value="2">Female</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>

                        <FormItem label="Age" {...formItemLayout}>
                            {
                                getFieldDecorator('age',{
                                    initialValue: 18,
                                })(
                                    <InputNumber />
                                )
                            }
                        </FormItem>

                        <FormItem label="current Status" {...formItemLayout}>
                            {
                                getFieldDecorator('state',{
                                    initialValue: '2'
                                })(
                                    <Select>
                                        <Option value="1">Test1</Option>
                                        <Option value="2">Test2</Option>
                                        <Option value="3">Test3</Option>
                                        <Option value="4">Test4</Option>
                                        <Option value="5">Test5</Option>
                                    </Select>
                                )
                            }
                        </FormItem>

                         <FormItem label="Multiple Selection" {...formItemLayout}>
                            {
                                getFieldDecorator('hobby interest',{
                                    initialValue: 20
                                })(
                                    <Select mode="multiple">
                                        <Option value="1">Test1</Option>
                                        <Option value="2">Test2</Option>
                                        <Option value="3">Test3</Option>
                                        <Option value="4">Test4</Option>
                                        <Option value="5">Test5</Option>
                                    </Select>
                                )
                            }
                        </FormItem>

                        <FormItem label="Marital Status" {...formItemLayout}>
                            {
                                getFieldDecorator('married',{
                                    valuePropName:'checked',
                                    initialValue: true
                                })(
                                    <Switch />
                                )
                            }
                        </FormItem>

                         <FormItem label="Birth Date" {...formItemLayout}>
                            {
                                getFieldDecorator('Birth Date',{
                                    initialValue: moment('2018-08-08')
                                })(
                                    <DatePicker/>
                                )
                            }
                        </FormItem>

                         <FormItem label="Address" {...formItemLayout}>
                            {
                                getFieldDecorator('Address', {
                                    initialValue: 'Atlanta Georgia Tech'
                                })(
                                    <TextArea
                                        autosize={
                                            {
                                                minRows: 4,
                                                maxRows: 6
                                            }
                                        }
                                    />
                                )
                            }
                        </FormItem>

                        <FormItem label="Time Picker" {...formItemLayout}>
                            {
                                getFieldDecorator('time')(
                                    <TimePicker/>
                                )
                            }
                        </FormItem>

                        <FormItem label="Upload User Image" {...formItemLayout}>
                            {
                                getFieldDecorator('userImage')(
                                    <Upload
                                        listType="picture-card"
                                        showUploadList={false}
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        onChange={this.handleChange}
                                    >
                                    {this.state.userImg ? <img src={this.state.userImg} alt=""/> : <Icon type="plus"/>}
                                    </Upload>
                                )
                            }
                        </FormItem>

                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('agreement')(
                                   <Checkbox>
                                       I have read this Agreement and agree to the terms and conditions. 
                                    </Checkbox>
                                )
                            }
                        </FormItem>

                        <FormItem {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>Sign Up</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create()(Register);
import React from 'react';

import {Card, Form, Input, Button, Icon, Checkbox, message} from 'antd';

const FormItem = Form.Item;

class FormLogin extends React.Component{

    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields(((error, values) => {
            if(!error) {
                message.success(`${userInfo.userName} congrats! you pass the form, password: ${userInfo.userPwd}`)
            }
        }));
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card title="Inline Form">
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder="username"/>
                        </FormItem>
                        <FormItem>
                            <Input placeholder="password"/>
                        </FormItem>
                        <FormItem>
                            <Button type="primary">Login</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="Horizontal Form" style={{marginTop:10}}>
                    <Form layout="horizontal" style={{width:300}}>
                        <FormItem>
                            {
                                getFieldDecorator('userName',{
                                    initialValue: '',
                                    rules:[
                                        {
                                            required:true,
                                            message: 'Username cannot be empty'
                                        },
                                        {
                                            min:5,
                                            max:10,
                                            message: 'Input should between 5 and 10'
                                        },
                                        {
                                            pattern: /^\w+$/g,
                                            message: 'should be characters or numbers'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="user"/>} placeholder="username"/>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('userPwd', {
                                    initialValue: '',
                                    rules:[]
                                })(
                                    <Input prefix={<Icon type="lock"/>} type="password" placeholder="password"/>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                   <Checkbox>Remember</Checkbox>
                                )
                            }
                            <a href="/#" style={{float: "right"}}>Forget Password</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(FormLogin);
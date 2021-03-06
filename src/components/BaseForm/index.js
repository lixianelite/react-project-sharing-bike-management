import React from 'react';
import {Input, Select, Form, Button, Checkbox, DatePicker} from 'antd';
import Utils from '../../utils/utils';

const FormItem = Form.Item;

class BaseForm extends React.Component{

    handleFiterSubmit = () => {
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }

    reset = () => {
        this.props.form.resetFields();
    }

    initFormList = () => {
        const {getFieldDecorator} = this.props.form;
        const formList = this.props.formList;
        const formItemList = [];
        if(formList && formList.length > 0) {
            formList.forEach((item, i) => {
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || '';
                let placeHolder = item.placeholder;
                let width = item.width;
                if(item.type === 'DATESELECT') {
                    const begin_time = 
                    <FormItem label="Order time" key="order_time1">
                    {
                        getFieldDecorator('begin_time')(
                            <DatePicker key="begin_time" showTime={true} format="YYYY-MM-DD HH:mm:ss"/>
                        )
                    }
                    </FormItem>
                    formItemList.push(begin_time);
                    const end_time = 
                    <FormItem label= "~" colon={false} key="order_time2">
                    {
                        getFieldDecorator('end_time')(
                            <DatePicker  key="end_time" showTime={true} format="YYYY-MM-DD HH:mm:ss"/>
                        )
                    }
                    </FormItem>
                    formItemList.push(end_time);
                } else if(item.type === 'INPUT') {
                    const INPUT = 
                    <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field])(
                                <Input placeholder={placeHolder} type="text"/>
                            )
                        }
                    </FormItem>;
                    formItemList.push(INPUT);
                } else if(item.type === 'CITY') {
                    const CITY = 
                    <FormItem label={label} key="city">
                        {
                            getFieldDecorator("city", {
                                initialValue: '1'
                            }) (
                                <Select 
                                    placeholder={placeHolder} 
                                    style={{width: 100}}
                                > 
                                {Utils.getOptionList([{id: "0", name: 'All'},{id: "1", name: 'Atlanta'},{id: "2", name: 'Seattle'},{id: "3", name: 'Los Angelas'},{id: "4", name: 'New York'}])}
                                </Select>
                            )
                        }
                    </FormItem>
                    formItemList.push(CITY);
                }
                 else if (item.type === 'SELECT') {
                    const SELECT = 
                    <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field], {
                                initialValue: initialValue
                            }) (
                                <Select 
                                    placeholder={placeHolder} 
                                    style={{width: width}}
                                > 
                                {Utils.getOptionList(item.list)}
                                   
                                </Select>
                            )
                        }
                    </FormItem>
                    formItemList.push(SELECT);
                } else if (item.type === 'CHECKBOX') {
                    const CHECKBOX = 
                    <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field], {
                                valuePropName:'checked',
                                initialValue: initialValue
                            }) (
                               <Checkbox>
                                   {label}
                               </Checkbox>
                            )
                        }
                    </FormItem>
                    formItemList.push(CHECKBOX);
                } else if (item.type === 'DATEPICKER') {
                    const date = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field]) (
                                <DatePicker key={field} showTime={true} format="YYYY-MM-DD HH:mm:ss"/>
                            )
                        }
                    </FormItem>
                    formItemList.push(date);
                }
            })
        }
        return formItemList;
    }

    render() {
        return (
            <Form layout="inline">
                {this.initFormList()}
                <FormItem>
                    <Button type="primary" style={{margin:'0 20px'}} onClick={this.handleFiterSubmit}>Search</Button>
                    <Button onClick={this.reset}>Reset</Button>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create({})(BaseForm);
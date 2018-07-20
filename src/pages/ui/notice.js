import React from 'react';
import {Card, Button, notification} from 'antd';
import './ui.less';

export default class Notice extends React.Component {

    openNotification = (type, direction)=>{
        if(direction) {
            notification.config({
                placement: direction
            });
        }
        notification[type]({
            message: 'Salary',
            description: 'You got new Salary, total: 2200k, tax: 2k'
        });
    }

    render() {
        return (
            <div>
                <Card title="notification" className="card-wrap">
                    <Button type="primary" onClick={() => {this.openNotification('success')}}>Success</Button>
                    <Button type="primary" onClick={() => {this.openNotification('info')}}>Success</Button>
                    <Button type="primary" onClick={() => {this.openNotification('warning')}}>Success</Button>
                    <Button type="primary" onClick={() => {this.openNotification('error')}}>Success</Button>
                </Card>

                <Card title="notification" className="card-wrap">
                    <Button type="primary" onClick={() => {this.openNotification('success', 'topLeft')}}>Success</Button>
                    <Button type="primary" onClick={() => {this.openNotification('info', 'topRight')}}>Success</Button>
                    <Button type="primary" onClick={() => {this.openNotification('warning', 'bottomLeft')}}>Success</Button>
                    <Button type="primary" onClick={() => {this.openNotification('error', 'bottomRight')}}>Success</Button>
                </Card>
            </div>
        )
    }

}
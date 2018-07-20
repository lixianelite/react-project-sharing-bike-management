import React from 'react';
import { Card, Button, Modal } from 'antd';
import './ui.less';

export default class Modals extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          showModal1: false,
          showModal2: false,
          showModal3: false,
          showModal4: false
        };
    }

    handleOpen = (type) => {
        this.setState({
            [type]: true
        });
    }

    handleConfirm = (type) => {
        Modal[type]({
            title:'Confirm',
            content: 'Are you sure?',
            onOk() {
                console.log('Ok');
            },
            onCancel() {
                console.log('Cancel');
            }
        })
    }

    render() {
        return (
            <div>
                <Card title="Basic Modals" className="card-wrap">
                    <Button type="primary" onClick={() =>this.handleOpen('showModal1')}>Open</Button>
                    <Button type="primary" onClick={() =>this.handleOpen('showModal2')}>Customed Footer</Button>
                    <Button type="primary" onClick={() =>this.handleOpen('showModal3')}>MarginTop 20px</Button>
                    <Button type="primary" onClick={() =>this.handleOpen('showModal4')}>Align Center</Button>
                </Card>

                <Card title="Conform Modals" className="card-wrap">
                    <Button type="primary" onClick={() =>this.handleConfirm('confirm')}>Conform</Button>
                    <Button type="primary" onClick={() =>this.handleConfirm('info')}>Information</Button>
                    <Button type="primary" onClick={() =>this.handleConfirm('success')}>Success</Button>
                    <Button type="primary" onClick={() =>this.handleConfirm('warning')}>Warning</Button>
                </Card>

                <Modal 
                    title="React"
                    visible={this.state.showModal1}
                    onCancel={() => {
                        this.setState({
                            showModal1:false
                        });
                    }}
                >
                    <p>Welcome to Modal Practice!</p>
                </Modal>

                 <Modal 
                    title="React"
                    visible={this.state.showModal2}
                    okText="OK Custom"
                    cancelText="Cancel Custom"
                    onCancel={() => {
                        this.setState({
                            showModal2: false
                        })
                    }}
                >
                    <p>This is the second Practice!</p>
                </Modal>

                <Modal 
                    style={{top:20}}
                    title="React"
                    visible={this.state.showModal3}
                    onCancel={() => {
                        this.setState({
                            showModal3: false
                        })
                    }}
                >
                    <p>This is the Third Practice!</p>
                </Modal>

                <Modal 
                    wrapClassName="vertical-center-modal"
                    title="React"
                    visible={this.state.showModal4}
                    onCancel={() => {
                        this.setState({
                            showModal4: false
                        })
                    }}
                >
                    <p>This is the Third Practice!</p>
                </Modal>
            </div>
        );
    }
}
import React from 'react';
import {Card, Tabs, message, Icon} from 'antd';
import './ui.less';

const TabPane = Tabs.TabPane;

export default class Tab extends React.Component {

    newTabIndex = 0;

    callback = (key) => {
        message.info('Hi you clicked tab: ' + key);
    }

    componentWillMount() {
        const panes = [
            {
                title:'Tab 1',
                content: 'Tab 1',
                key:'1'
            },
            {
                title: 'Tab 2',
                content: 'Tab 2',
                key: '2'
            },
            {
                title: 'Tab 3',
                content: 'Tab 3',
                key: '3'
            }
        ]
        this.setState({
            activeKey: panes[0].key,
            panes
        })
            
    }

    onChange = (activeKey)=>{
        this.setState({
            activeKey
        })
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
    }

    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }


    render(){
        return (
            <div>
                <Card title="Tab" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="Tab 1" key="1">Welcome react1</TabPane>
                        <TabPane tab="Tab 2" key="2" disabled>Welcome react2</TabPane>
                        <TabPane tab="Tab 3" key="3">React is a popular mv* framework</TabPane>
                    </Tabs>
                </Card>

                <Card title="Tab With Icon" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab={<span><Icon type="plus"/>Tab 1</span>} key="1">Welcome react1</TabPane>
                        <TabPane tab={<span><Icon type="edit"/>Tab 2</span>} key="2">Welcome react2</TabPane>
                        <TabPane tab={<span><Icon type="delete"/>Tab 3</span>} key="3">React is a popular mv* framework</TabPane>
                    </Tabs>
                </Card>

                <Card title="Dynamic Tab" className="card-wrap">
                    <Tabs 
                        // defaultActiveKey="1" 
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map((pane)=> {
                                return (
                                <TabPane 
                                    tab={pane.title}
                                    key={pane.key}
                                >
                                    {pane.content}
                                </TabPane>
                                )
                            })
                        }
                    </Tabs>
                </Card>


            </div>
        )
    }
}
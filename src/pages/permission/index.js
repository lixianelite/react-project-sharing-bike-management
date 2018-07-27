import React from 'react';
import {Card, Button, Modal, Form, Input, Select, Tree, Transfer} from 'antd';
import ETable from './../../components/Etable';
import Utils from './../../utils/utils';
import axios from './../../axios/index';
import menuConfig from './../../config/menuConfig';
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

export default class PermissionUser extends React.Component{

    state={
    }

    componentDidMount() {
        axios.requestList(this, '/role/list', {})
    }

    handleRole = () => {
        this.setState({
            isRoleVisible: true
        })
    }

    handleRoleSubmit = () => {
        let data = this.roleForm.props.form.getFieldsValue();
        axios.ajax({
            url: 'role/create',
            data: {
                params: data
            }
        }).then((res) => {
            if(res.code === 0) {
                this.setState({
                    isRoleVisible: false
                });
                this.roleForm.props.form.resetFields();
                axios.requestList(this, '/role/list', {})       
            }
        })
    }

    handlePermission = () => {
        let item = this.state.selectedItem;
        if(!item) {
            Modal.info({
                content: 'Please select a role'
            });
            return;
        }
        this.setState({
            isPermVisible: true,
            detailInfo: item[0],
            menuInfo: item[0].menues
        });
    }

    handlePermEditSubmit = () => {
        let data = this.permEditForm.props.form.getFieldsValue();
        data.role_id = this.state.selectedItem.id;
        data.menues = this.state.menuInfo;
        axios.requestList(this, '/permission/edit', data);
        this.setState({
            isPermVisible: false
        });
    }

    handleUserAuth = () => {
        let item = this.state.selectedItem;
        if(!item) {
            Modal.info({
                content: 'Please select a role'
            });
            return;
        }
        this.setState({
            detailInfo: item[0],
            isUserVisible: true
        });
        this.getRoleUserList(item[0]);

    }

    getRoleUserList = (item) => {
        axios.ajax({
            url: '/role/user_list',
            data: {
                params: {
                    id: item.id
                }
            }
        }).then((res) => {
            if(res.code === 0) {
                this.getAuthUserList(res.result);
            }
        })
    }

    getAuthUserList = (dataSource) => {
        const mockData = [];
        const targetKeys = [];

        if(dataSource && dataSource.length > 0) {
            for(var i = 0; i < dataSource.length;i++) {
                const data = {
                    key: dataSource[i].user_id,
                    title: dataSource[i].user_name,
                    status: dataSource[i].status
                }
                if(data.status === 1) {
                    targetKeys.push(data.key);
                }
                mockData.push(data);
            }
            this.setState({
                targetKeys,
                mockData
            });
        }
    }

    patchUserInfo = (targetKeys) => {
        this.setState({
            targetKeys: targetKeys
        });
    };

    handleUserSubmit = () => {
        let data = {};
        data.user_id = this.state.targetKeys;
        data.role_id = this.state.selectedItem.id;
        axios.requestList(this, '/role/user_role_edit', data);
        this.setState({
            isUserVisible: false
        })
    }


    render() {
        const columns = [
            {
                title: 'Role ID',
                dataIndex: 'id'
            },
            {
                title: 'Role Name',
                dataIndex: 'role_name'
            },
            {
                title: 'Create Time',
                dataIndex: 'create_time',
                render : Utils.formateDate
            },
            {
                title: 'Status',
                dataIndex: 'status',
                render(status){
                    return status === 1 ? 'Open' : 'Close'
                }
            },
            {
                title: 'Authorize Time',
                dataIndex: 'authorize_time',
                render : Utils.formateDate
            },
            {
                title: 'Authorize User',
                dataIndex: 'authorize_user'
            }
        ];

        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleRole} style={{marginRight:10}}>Create Role</Button>
                    <Button type="primary" style={{marginLeft:10, marginRight:10}} onClick={this.handlePermission}>Permission Setting</Button>
                    <Button type="primary" onClick={this.handleUserAuth}>User Authorize</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        columns={columns}
                        dataSource={this.state.list}
                    />
                </div>
                <Modal 
                    title="Create Role"
                    visible={this.state.isRoleVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={() => {
                        this.roleForm.props.form.resetFields();
                        this.setState({
                            isRoleVisible: false
                        })
                    }}
                >
                    <RoleForm wrappedComponentRef={(inst) => this.roleForm=inst}></RoleForm>
                </Modal>

                <Modal
                    title="Set Permission"
                    visible={this.state.isPermVisible}
                    width={600}
                    onOk={this.handlePermEditSubmit}
                    onCancel={() => {
                        this.setState({
                            isPermVisible: false
                        })
                    }}
                >
                    <PermEditForm 
                        detailInfo={this.state.detailInfo} 
                        patchMenuInfo={(checkedKeys) => {
                            this.setState({
                                menuInfo: checkedKeys
                            })
                        }}
                        menuInfo={this.state.menuInfo}
                        wrappedComponentRef={(inst) => this.permEditForm=inst}
                    />
                </Modal>

                <Modal
                    title="User Authorization"
                    visible={this.state.isUserVisible}
                    width={800}
                    onOk={this.handleUserSubmit}
                    onCancel={() => {
                        this.setState({
                            isUserVisible: false
                        })
                    }}
                >
                     <RoleAuthForm
                        wrappedComponentRef={(inst) => this.roleAuthForm=inst}
                        detailInfo={this.state.detailInfo}
                        targetKeys={this.state.targetKeys}
                        mockData={this.state.mockData}
                        patchUserInfo={this.patchUserInfo}
                    />
                
                </Modal>


            </div>
        )
    }
}

class RoleForm extends React.Component{


    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {span:5},
            wrapperCol: {span: 19}
        }


        return (
        <Form layout="horizontal">
            <FormItem label="Role name" {...formItemLayout}>                
                {
                    getFieldDecorator('role_name')(
                        <Input type="text" placeholder="Input your rolename"/>
                    )
                }
            </FormItem>
            <FormItem label="State" {...formItemLayout}>
                {
                    getFieldDecorator('state')(
                    <Select>
                        <Option value="1">Open</Option>
                        <Option value="0">Close</Option>
                    </Select>)
                }
            </FormItem>

        </Form>
        )
    }
}

RoleForm = Form.create({})(RoleForm);



class PermEditForm extends React.Component{

    renderTreeNodes = (data) => {
        return data.map((item) => {
            if(item.children) {
                return <TreeNode title={item.title} key={item.key}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            }else{
                return <TreeNode title={item.title} key={item.key}/>
            }
        })
    }

    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys);
    }


    render() {

        const formItemLayout = {
            labelCol: {span:5},
            wrapperCol: {span: 19}
        }

        const {getFieldDecorator} = this.props.form;

        const detail_info = this.props.detailInfo;
        const  menuInfo = this.props.menuInfo;


        return (
            <Form layout="horizontal">
                <FormItem label="Role name" {...formItemLayout}>
                    <Input disabled placeholder={detail_info.role_name}/>
                </FormItem>
                <FormItem label="status" {...formItemLayout}>
                   {
                       getFieldDecorator('status', {
                           initialValue: '1'
                       })(
                            <Select>
                                <Option value="1">Enable</Option>
                                <Option value="0">Disable</Option>
                            </Select>
                       )
                   }
                </FormItem>

                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys) => {
                        this.onCheck(checkedKeys)
                    }}
                    checkedKeys={menuInfo}
                 >
                    <TreeNode title="Authorition" key="platform_all">
                        {this.renderTreeNodes(menuConfig)}
                    </TreeNode>

                 </Tree>
            </Form>
            
        )
    }
}
PermEditForm = Form.create({})(PermEditForm);



class RoleAuthForm extends React.Component{

    filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1;
    }

    handleChange = (targetKeys) => {
        this.props.patchUserInfo(targetKeys);
    };
    
    render() {

        const formItemLayout = {
            labelCol: {span:5},
            wrapperCol: {span: 19}
        }

        const detail_info = this.props.detailInfo;


        return (
            <Form layout="horizontal">
                <FormItem label="Role name" {...formItemLayout}>
                    <Input disabled placeholder={detail_info.role_name}/>
                </FormItem>

                <FormItem label="Select Role" {...formItemLayout}>

                    <Transfer
                        listStyle ={{width:200, height: 400}}
                        dataSource={this.props.mockData}
                        titles={["Available", "Selected"]}
                        showSearch
                        searchPlaceholder="Input username"
                        filterOption={this.filterOption}
                        targetKeys={this.props.targetKeys}
                        onChange={this.handleChange}
                        render={item => item.title}
                    />
                </FormItem>
            </Form>
            
        )
    }
}
RoleAuthForm = Form.create({})(RoleAuthForm);


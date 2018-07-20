import React from 'react';
import {Card, Spin, Icon, Alert} from 'antd';
import './ui.less';

export default class Loadings extends React.Component{

    render() {
        const icon = <Icon type="loading" style={{fontSize:24}}/>
        const iconLoading = <Icon type="loading" style={{fontSize:24}}/>

        return (
            <div>
                <Card title="Spin Usage" className="card-wrap">
                    <Spin size="small"/>
                    <Spin style={{margin: "0 10px"}}/>
                    <Spin size="large"/>
                    <Spin indicator={icon}/>
                </Card>

                <Card title="Content Coverage" className="card-wrap">
                    <Alert
                        message="React"
                        description="Welcome to React World"
                        type="info"
                    />

                    <Spin>
                        <Alert
                            message="React"
                            description="Welcome to React World"
                            type="warning"
                        />
                    </Spin>

                     <Spin indicator={iconLoading}>
                        <Alert
                            message="React"
                            description="Welcome to React World"
                            type="warning"
                        />
                    </Spin>
                </Card>
            </div>
        );
    }
}
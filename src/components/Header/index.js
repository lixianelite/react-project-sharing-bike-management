import React from 'react';
import { Row, Col } from 'antd';
import './index.less'
import Util from '../../utils/utils';
import axios from '../../axios/index';
import { connect } from 'react-redux';

class Header extends React.Component {
    state={}
    componentWillMount() {
        this.setState({
            userName:'Xian Li'
        })
        setInterval(() => {
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState({
                sysTime: sysTime
            })
        }, 1000)
        this.getWeatherAPIData();
    }

    getWeatherAPIData() {
        let city = 'Atlanta'
        axios.jsonp({
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=afead70ff9c1d8566b4a2240bc962164"
        }).then((res) => {
            let data = res.weather[0].main;
            this.setState({
                weather: data
            })
        })
    }

    render() {

        const menuType = this.props.menuType;
        return(
            <div className="header">
                <Row className="header-top">
                {
                    menuType ? 
                        <Col span="6" className="logo">
                            <img src="/assets/logo-ant.svg" alt="" />
                            <span>Bike MS</span>
                        </Col>: ''
                }
                    <Col span={menuType ? 18 : 24}>
                        <span>Hello, {this.state.userName}</span>
                        <a href="/">Log Out</a>
                    </Col>
                </Row>

                {
                    menuType ? '' : <Row className="breadcrumb">
                        <Col span="4" className="breadcrumb-title">
                            {this.props.menuName}
                        </Col>
                        <Col span="20" className="weather">
                            <span className="date">{this.state.sysTime}</span>
                            <span className="weather-detail">{this.state.weather}</span>
                        </Col>
                    </Row>
                }
                
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        menuName: state.menuName
    }
};
export default connect(mapStateToProps)(Header)
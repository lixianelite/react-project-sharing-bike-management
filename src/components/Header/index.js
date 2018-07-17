import React from 'react';
import { Row, Col } from 'antd';
import './index.less'
import Util from '../../utils/utils';
import axios from '../../axios/index';

export default class Header extends React.Component {
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
        return(
            <div className="header">
                <Row className="header-top">
                    <Col span="24">
                        <span>Hello, {this.state.userName}</span>
                        <a href="/">Log Out</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span="4" className="breadcrumb-title">
                        HomePage
                    </Col>
                    <Col span="20" className="weather">
                        <span className="date">{this.state.sysTime}</span>
                        <span className="weather-detail">{this.state.weather}</span>
                    </Col>
                </Row>
            </div>
            
        )
    }
}
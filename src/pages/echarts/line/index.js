import React from 'react';
import {Card} from 'antd';
import echartTheme from './../echartTheme';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip/';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';

export default class Line extends React.Component{

    componentWillMount(){
        echarts.registerTheme('Practice', echartTheme);
    }

    getOption = () => {
        let option = {
            title: {
                text: 'User Ride Order'
            },
            tooltip: {
                trigger:'item'
            },
            xAxis: {
                data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Order',
                    type: 'line',
                    data: [1000, 2000, 1500, 3000, 2000, 1200, 800]
                }
            ]
        }
        return option;
    }

    getOption2 = () => {
        let option = {
            title: {
                text: 'User Ride Order'
            },
            tooltip: {
                trigger:'item'
            },
            xAxis: {
                data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            },
            yAxis: {
                type: 'value'
            },
            legend: {
                data: ['Ofo Order', 'Mobile Order']
            },
            series: [
                {
                    name: 'Ofo Order',
                    type: 'line',
                    data: [1200, 3000, 4500, 6000, 8000, 12000, 20000]
                },
                {
                    name: 'Mobile Order',
                    type: 'line',
                    data: [1000, 2000, 5500, 6000, 8000, 10000, 12000]
                }
            ]
        }
        return option;
    }

    getOption3 = () => {
        let option = {
            title: {
                text: 'User Ride Order'
            },
            tooltip: {
                trigger:'item'
            },
            xAxis: {
                data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Order',
                    type: 'line',
                    data: [1000, 2000, 1500, 3000, 2000, 1200, 800],
                    areaStyle: {}
                }
            ]
        }
        return option;
    }

    render() {
        return (
            <div>
                <Card title="Line 1">
                    <ReactEcharts option={this.getOption()} theme="Practice" style={{height: 500}}/>
                </Card>

                <Card title="Line 2" style={{marginTop: 10}}>
                    <ReactEcharts option={this.getOption2()} theme="Practice" style={{height: 500}}/>
                </Card>
                <Card title="Line 3" style={{marginTop: 10}}>
                    <ReactEcharts option={this.getOption3()} theme="Practice" style={{height: 500}}/>
                </Card>
            </div>
        )
    }
}
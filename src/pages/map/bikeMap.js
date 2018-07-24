import React from 'react';

import {Card, Form} from 'antd';
import axios from './../../axios';
import BaseForm from '../../components/BaseForm';

export default class BikeMap extends React.Component{

    state = {}

    map;

    formList = [
        {
            type: 'CITY'
        },
        {
            type: 'DATESELECT'
        },
        {
            type: 'SELECT',
            label: 'Order Status',
            field: 'order_status',
            placeholder: 'All',
            initialValue: '0',
            list: [{id: 0, name: 'All'},{id: 1, name: 'In Use'},{id: 2, name: 'Complete'}]
        }
    ]

    handleFilterSubmit = (filterParams) => {
        this.params = filterParams;
        this.renderMap();
    }

    requestList = () => {
        axios.ajax({
            url: "/map/bike_list",
            data: {
                params: this.params
            }
        }).then((res) => {
            if (res.code === 0) {
                this.setState({
                    total_count: res.result.total_count
                })
                this.renderMap(res.result);
            }
        })
    }

    drawBikeRoute = (positionList) => {
        var RidingPath = new window.google.maps.Polyline({
            path: positionList,
            geodesic: true,
            strokeColor: '#1869AD',
            strokeOpacity: 1.0,
            strokeWeight: 3
          });
        RidingPath.setMap(this.map);

        new window.google.maps.Marker({
            position: positionList[0],
            label: "S",
            map: this.map
        });

        new window.google.maps.Marker({
            position: positionList[positionList.length - 1],
            label: "E",
            map: this.map
        });
    }

    drawServiceArea = (area) => {
          var serviceArea = new window.google.maps.Polygon({
            paths: area,
            strokeColor: '#CE0000',
            strokeOpacity: 1,
            strokeWeight: 4,
            fillColor: '#ff8605',
            fillOpacity: 0.35
          });
          serviceArea.setMap(this.map);
    }

    drawBikeMarker = (bike_distribution) => {
        
        bike_distribution.map((dot) => {
            return new window.google.maps.Marker({
                position:dot,
                map: this.map,
                label: "Bike",
            })
        })

    }

    renderMap = (result) => {
        this.map = new window.google.maps.Map(document.getElementById('DetailMap'), {
            zoom: 11
        });
        var atlanta = {lat: 33.753746, lng: -84.386330};
        this.map.setCenter(atlanta);
        this.drawBikeRoute(result.position_list);
        this.drawServiceArea(result.area);
        this.drawBikeMarker(result.bike_distribution);
    }

    componentDidMount() {
        this.requestList();
    }

    render() {
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilterSubmit}/>
                </Card>
                <Card style={{marginTop: 10}}>
                    <div>{this.state.total_count} bikes in total</div>
                    <div id="DetailMap" style={{height: 500}}></div>
                </Card>
            </div>
        )
    }
}
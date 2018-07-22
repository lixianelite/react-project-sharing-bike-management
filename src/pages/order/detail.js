import React from 'react';
import {Card} from 'antd';
import axios from './../../axios/index';
import '../../style/common.less';
import './detail.less';

export default class Detail extends React.Component {

    state = {}

    map;

    componentDidMount() {
        let orderId = this.props.match.params.orderId;
        if(orderId) {
            this.getDetailInfo(orderId);
        }
    }

    getDetailInfo = (orderId) => {
        axios.ajax({
            url: '/order/detail',
            data: {
                params: {
                    orderId: orderId
                }
            }
        }).then((res) => {
            if(res.code === 0) {
                this.setState({
                    orderInfo: res.result
                })
                this.renderMap(res.result);
            }
        })
    }

    renderMap = (result) => {
       this.map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 10
          });
        var atlanta = {lat: 33.753746, lng: -84.386330};
        this.map.setCenter(atlanta);

        this.drawBikeRoute(result.position_list);
        this.drawServiceArea(result.area);

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
            label: "Start",
            map: this.map
        });

        new window.google.maps.Marker({
            position: positionList[positionList.length - 1],
            label: "End",
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

    render() {

        const info = this.state.orderInfo || {};

        return(
            <div>
                <Card>
                    <div id="map" className="order-map"></div>


                    <div className="detail-items">
                        <div className="item-title">Basic Info</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">Usage Mode</div>
                                <div className="detail-form-content">{info.mode === 1 ? "Service Area" : "Parking Area" }</div>
                            </li>
                            <li>
                                <div className="detail-form-left">Order Number</div>
                                <div className="detail-form-content">{info.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">Plate Number</div>
                                <div className="detail-form-content">{info.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">User Name</div>
                                <div className="detail-form-content">{info.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">Phone Number</div>
                                <div className="detail-form-content">{info.mobile}</div>
                            </li>
                        </ul>
                    </div>

                    <div className="detail-items">
                        <div className="item-title">Riding Trace</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">Start Point</div>
                                <div className="detail-form-content">{info.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">End Point</div>
                                <div className="detail-form-content">{info.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">Distance</div>
                                <div className="detail-form-content">{info.distance/1000} Miles</div>
                            </li>
                        </ul>
                    </div>
                    
                </Card>
            </div>
        )
    }
}
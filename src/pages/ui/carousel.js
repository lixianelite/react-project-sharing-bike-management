import React from 'react';
import {Card, Carousel} from 'antd';
import './ui.less';

export default class Carousels extends React.Component {
    
    onChange = (a, b, c) => {
        console.log(a, b, c);
    }

    render() {
        return(

            <div>
                <Card title="Text Carousel" className="card-wrap">
                    <Carousel autoplay={true} effect="fade">
                        <div><h3>Ant Motion Banner - React</h3></div>
                        <div><h3>Ant Motion Banner - Vue</h3></div>
                        <div><h3>Ant Motion Banner - Angular</h3></div>
                    </Carousel>
                </Card>

                <Card title="Image Carousel" className="slider-wrap">
                    <Carousel autoplay={true} effect="fade">
                        <div>
                            <img src="/carousel-img/carousel-1.jpg" alt=""/>
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-2.jpg" alt=""/>
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-3.jpg" alt=""/>
                        </div>
                    </Carousel>
                </Card>
            </div>
        )
    }
}
import { Carousel } from 'antd';
import React from 'react';
import img1 from '../../../common/assets/image/carousell/1.jpeg';
import img2 from '../../../common/assets/image/carousell/2.png';
import 'antd/dist/antd.css';

const contentStyle = {
  height: '500px',
  width: '100%',
  backgroundImage: `url(${img1})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const MatchingCarousel = () => {
  return (
    <Carousel autoplay effect="fade" style={{ width: '100%', height: '500px' }}>
      <div>
        <div style={contentStyle} />
      </div>
      <div>
        <img style={contentStyle} src={img2} alt="" />
      </div>
    </Carousel>
  );
};

export default MatchingCarousel;

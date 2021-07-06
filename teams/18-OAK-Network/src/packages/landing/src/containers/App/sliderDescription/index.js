import React from 'react';
const sliderDes = (props) => {
  return (
    <>
      <p className="testimonialDes">{props.data.description}</p>
      <div className="testimonialDetails">
        <p className="testimonialName">{props.data.name}</p>
        <span className="testimonialDesignation">{props.data.designation}</span>
      </div>
    </>
  );
};

export default sliderDes;

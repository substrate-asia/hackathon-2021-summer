import React from 'react';
import ShapeWrapper from './tiltShape.style';

const TiltShape = ({ className, color }) => {
  // Add all classs to an array
  const addAllClasses = ['tilt_shape'];
  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }

  return (
    <ShapeWrapper className={addAllClasses.join(' ')}>
      <svg data-name="Layer 1" viewBox="0 0 1920 184.16" fill={color || '#fff'}>
        <path d="M0,2.16s260.5-32,880,150c.16.05,54,14.62,80,15.08,31.06.55,80.88-15,81.06-15.08,603.5-176.84,879-150,879-150v182H0Z" />
      </svg>
    </ShapeWrapper>
  );
};

export default TiltShape;

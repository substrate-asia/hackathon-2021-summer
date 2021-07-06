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
      <svg width="1920" height="500" viewBox="0 0 1920 500">
        <defs>
          <clipPath>
            <rect width="1920" height="500" />
          </clipPath>
        </defs>
        <g>
          <rect
            width="2356"
            height="781"
            transform="translate(-136.868 401.948) rotate(-11)"
            fill={color || '#fff'}
          />
        </g>
      </svg>
    </ShapeWrapper>
  );
};

export default TiltShape;

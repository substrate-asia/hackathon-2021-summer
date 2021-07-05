import React from 'react';
import Heading from 'common/components/Heading';
import HGroup from './heading.style';

const SectionHeading = ({ title, slogan, ...props }) => {
  return (
    <HGroup {...props}>
      <Heading as="h4" content={slogan} />
      <Heading as="h2" content={title} />
    </HGroup>
  );
};

export default SectionHeading;

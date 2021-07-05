import React from 'react';
import Link from 'next/link';
import Container from 'common/components/UI/Container';
import Image from 'common/components/Image';
import Box from 'common/components/Box';
import Heading from 'common/components/Heading';
import Text from 'common/components/Text';
import Fade from 'react-reveal/Fade';
import { Icon } from 'react-icons-kit';

import { CustomerTrackingWrapper } from './customerTracking.style';
import { angleRight } from 'react-icons-kit/fa/angleRight';

import { CUSTOMER_TRACKING } from 'common/data/SassMinimal';

const CustomerTracking = () => {
  return (
    <CustomerTrackingWrapper>
      <Container>
        <Box className="row">
          <Box className="column">
            {CUSTOMER_TRACKING.map((customerTrack, index) => (
              <Fade key={`customerTrack-image-${index}`} left>
                <Image src={customerTrack.image} alt="Track Chart" />
              </Fade>
            ))}
          </Box>
          <Box className="column d-flex">
            <Box className="my-auto">
              {CUSTOMER_TRACKING.map((customerTrack, index) => (
                <Box className="content" key={`customerTrack-${index}`}>
                  <Heading as="h4" content={customerTrack.tagline} />
                  <Heading as="h3" content={customerTrack.heading} />
                  <Text as="p" content={customerTrack.content} />
                  <Link href={customerTrack.btnLink}>
                    <a className="exploreLink">
                      {customerTrack.btnLabel} <Icon icon={angleRight} />
                    </a>
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </CustomerTrackingWrapper>
  );
};

export default CustomerTracking;

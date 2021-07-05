import React from 'react';
import Link from 'next/link';
import Box from 'common/components/Box';
import Heading from 'common/components/Heading';
import Text from 'common/components/Text';
import Button from 'common/components/Button';
import Image from 'common/components/Image';
import Container from 'common/components/UI/Container';
import Fade from 'react-reveal/Fade';

import { BannerWrapper } from './bannerSection.style';

import { BANNER_DATA } from 'common/data/SassMinimal';

const BannerSection = () => {
  return (
    <BannerWrapper id="banner_section">
      {BANNER_DATA.map((banner, index) => (
        <Container key={`banner-${index}`}>
          <Heading content={banner.title} as="h3" />
          <Text content={banner.text} />
          <Link href={banner.btnLink}>
            <a>
              <Button title={banner.btnLabel} />
            </a>
          </Link>
          <Text as="span" content={banner.offerText} />
          <Fade bottom>
            <Box className="imageWrapper">
              <Image src={banner.image} alt="Banner Image" />
            </Box>
          </Fade>
        </Container>
      ))}
      ;
    </BannerWrapper>
  );
};

export default BannerSection;

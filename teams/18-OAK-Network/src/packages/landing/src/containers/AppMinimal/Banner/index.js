import React from 'react';
import Link from 'next/link';
import { Icon } from 'react-icons-kit';
import { androidArrowForward } from 'react-icons-kit/ionicons/androidArrowForward';
import Box from 'common/components/Box';
import Heading from 'common/components/Heading';
import Text from 'common/components/Text';
import Image from 'common/components/Image';
import Container from 'common/components/UI/Container';
import BannerArea, { Col } from './banner.style';
import { BannerData } from 'common/data/AppMinimal';

const Banner = () => {
  const { title, text, button, image, tagline } = BannerData;
  return (
    <BannerArea id="banner_section">
      <Image src={image} className="bannerMoc" alt="banner image" />
      <Container className="Container">
        <Col>
          <Heading as="h2" content={title} />
          <Text as="p" content={text} />
          <Box className="ButtonWrap">
            <Link href={button.link}>
              <a className="Button">
                {button.label}
                <Icon size={18} icon={androidArrowForward} />
              </a>
            </Link>
            <Text as="span" content={tagline} />
          </Box>
        </Col>
      </Container>
    </BannerArea>
  );
};

export default Banner;

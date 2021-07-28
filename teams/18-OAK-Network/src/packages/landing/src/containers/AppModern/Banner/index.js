import React, { useContext } from 'react';
import Fade from 'react-reveal/Fade';
import { Icon } from 'react-icons-kit';
import { arrowCircleRight } from 'react-icons-kit/fa/arrowCircleRight';
import Text from 'common/components/Text';
import Image from 'common/components/Image';
import Button from 'common/components/Button';
import Heading from 'common/components/Heading';
import Rating from 'common/components/Rating';
import Container from 'common/components/UI/Container';
import { PolkadotContext } from 'common/contexts/PolkadotContext';
import BannerWrapper, {
  BannerContent,
  RatingInfo,
  BannerImage,
  ButtonGroup,
} from './banner.style';

import microsoft from 'common/assets/image/appModern/envato-icon.png';
import bannerImg from 'common/assets/image/appModern/banner2.png';
import circleBorder from 'common/assets/image/appModern/shape.svg';
import { formatNumberThousands } from 'common/utils';

const Banner = () => {
  const polkadotContext = useContext(PolkadotContext);
  const { blockNumber } = polkadotContext;

  const onCreateGrantClicked = () => {
    window.open('https://8mu1f1dexqf.typeform.com/to/FF8ARJhs');
  };

  const onParticipateClicked = () => {
    // Because of screen offset, we jump to the id, and it will be better.
    window.location.href = '#newsletterSection';
  };

  return (
    <BannerWrapper id="home">
      <Container>
        <BannerContent>
          <Fade up delay={100}>
            <Heading as="h1" content="Polkadot Quadratic Funding Campaign" />
          </Fade>
          <Fade up delay={200}>
            <Text
              content={`Current Block Number #${formatNumberThousands(
                blockNumber
              )}`}
            />
          </Fade>
          <Fade up delay={300}>
            <ButtonGroup>
              <Button
                className="primary"
                title="Participate"
                onClick={onParticipateClicked}
              />
              <Button
                className="text"
                variant="textButton"
                icon={<Icon icon={arrowCircleRight} />}
                iconPosition="right"
                title="Create a Grant"
                onClick={onCreateGrantClicked}
              />
            </ButtonGroup>
          </Fade>
        </BannerContent>
        <BannerImage>
          <Fade up delay={100}>
            <Image src={bannerImg} alt="Banner" />
          </Fade>
        </BannerImage>
      </Container>
      <img
        className="bannerBottomShape"
        src={circleBorder}
        alt="Bottom Circle"
      />
    </BannerWrapper>
  );
};

export default Banner;

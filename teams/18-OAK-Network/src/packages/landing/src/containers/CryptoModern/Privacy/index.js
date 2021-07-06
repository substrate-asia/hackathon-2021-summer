import React from 'react';
import Fade from 'react-reveal/Fade';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Image from 'common/components/Image';
import Container from 'common/components/UI/Container';
import SectionWrapper, { ContentWrapper } from './privacy.style';
import Illustration from 'common/assets/image/cryptoModern/illustration1.png';

const PrivacyPortal = () => {
  return (
    <SectionWrapper>
      <Container>
        <ContentWrapper>
          <div className="content">
            <Heading content="Privacy Preserving  Anonymous Funds  Protocol" />
            <Text content="Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiu Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiu" />
          </div>
          <div className="image">
            <Fade up>
              <Image src={Illustration} alt="Illustration Image" />
            </Fade>
          </div>
        </ContentWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default PrivacyPortal;

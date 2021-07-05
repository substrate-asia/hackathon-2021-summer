import React from 'react';

import Container from 'common/components/UI/Container';
import Heading from 'common/components/Heading';
import Button from 'common/components/Button';

import illustration from 'common/assets/image/appCreative/shapeLeft1.png';
import illustration2 from 'common/assets/image/appCreative/shapeRight1.png';
import SectionWrapper, {
  Content,
  ButtonWrap,
  ContentWrap,
} from './callToAction.style';

const CallToAction = () => {
  return (
    <SectionWrapper>
      <Container>
        <Content>
          <img src={illustration} alt="shape" />
          <img src={illustration2} alt="shape" />
          <ContentWrap>
            <Heading
              as="h3"
              content="Do you have idea to make better? Contact our support team"
            />
            <ButtonWrap>
              <Button title="Contact Us" />
            </ButtonWrap>
          </ContentWrap>
        </Content>
      </Container>
    </SectionWrapper>
  );
};

export default CallToAction;

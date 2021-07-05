import React from 'react';
import Link from 'next/link';
import { Icon } from 'react-icons-kit';
import { androidArrowForward } from 'react-icons-kit/ionicons/androidArrowForward';
import Container from 'common/components/UI/Container';
import Heading from 'common/components/Heading';
import Text from 'common/components/Text';
import CallToActionArea, { Left, Right } from './callToAction.style';
import { CallToActionData } from 'common/data/AppMinimal';
const CallToAction = () => {
  const { title, text, link } = CallToActionData;
  const { path, label } = link;
  return (
    <CallToActionArea>
      <Container className="Container">
        <Left>
          <Heading as="h3" content={title} />
          <Text as="p" content={text} />
        </Left>
        <Right>
          <Link href={path}>
            <a>
              {label}
              <Icon icon={androidArrowForward} />
            </a>
          </Link>
        </Right>
      </Container>
    </CallToActionArea>
  );
};

export default CallToAction;

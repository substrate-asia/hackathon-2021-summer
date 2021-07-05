import React from 'react';
import Link from 'next/link';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import { Icon } from 'react-icons-kit';
import { androidArrowForward } from 'react-icons-kit/ionicons/androidArrowForward';
import Image from 'common/components/Image';
import Container from 'common/components/UI/Container';
import SectionWrapper, { ContentWrapper } from './secure-transaction.style';

import { secureTransaction } from 'common/data/AppMinimal';

const SecureTransaction = () => {
  const { image, title, description } = secureTransaction;

  return (
    <SectionWrapper>
      <Container>
        <ContentWrapper>
          <div className="image">
            <Image src={image.thumb} alt="Transaction" />
            <Image
              src={image.bubble}
              alt="bubble image"
              className="bubble-image"
            />
          </div>
          <div className="content">
            <Heading content={title} />
            <Text content={description} />
            <Link href="#">
              <a className="button">
                Learn More <Icon icon={androidArrowForward} />
              </a>
            </Link>
          </div>
        </ContentWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default SecureTransaction;

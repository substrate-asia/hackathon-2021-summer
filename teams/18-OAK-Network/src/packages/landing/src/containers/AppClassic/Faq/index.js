import React, { Fragment } from 'react';
import { Icon } from 'react-icons-kit';
import { plusCircled } from 'react-icons-kit/ionicons/plusCircled';
import { minusCircled } from 'react-icons-kit/ionicons/minusCircled';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Container from 'common/components/UI/Container';
import {
  Accordion,
  AccordionItem,
  AccordionTitle,
  AccordionBody,
  IconWrapper,
  OpenIcon,
  CloseIcon,
} from 'common/components/Accordion';
import { SectionHeader } from '../appClassic.style';
import FaqSection from './faq.style';

import { faq } from 'common/data/AppClassic';

const Faq = () => {
  const { slogan, title, faqs } = faq;
  return (
    <FaqSection id="faq">
      <Container>
        <SectionHeader>
          <Heading as="h5" content={slogan} />
          <Heading content={title} />
        </SectionHeader>
        <Accordion>
          <Fragment>
            {faqs.map((item) => (
              <AccordionItem key={`accordion-key--${item.id}`}>
                <Fragment>
                  <AccordionTitle>
                    <Fragment>
                      <Heading as="h3" content={item.question} />
                      <IconWrapper className="icon-wrapper">
                        <OpenIcon>
                          <Icon icon={minusCircled} size={18} />
                        </OpenIcon>
                        <CloseIcon>
                          <Icon icon={plusCircled} size={18} />
                        </CloseIcon>
                      </IconWrapper>
                    </Fragment>
                  </AccordionTitle>
                  <AccordionBody>
                    <Text content={item.answer} />
                  </AccordionBody>
                </Fragment>
              </AccordionItem>
            ))}
          </Fragment>
        </Accordion>
      </Container>
    </FaqSection>
  );
};

export default Faq;

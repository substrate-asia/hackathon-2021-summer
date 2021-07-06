import React from 'react';
import Link from 'next/link';
import Box from 'common/components/Box';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Button from 'common/components/Button';
import {
  Accordion,
  AccordionItem,
  AccordionTitle,
  AccordionBody,
  IconWrapper,
  OpenIcon,
  CloseIcon,
} from 'common/components/Accordion';
import Container from 'common/components/UI/Container';
import { Icon } from 'react-icons-kit';
import { plus } from 'react-icons-kit/entypo/plus';
import { minus } from 'react-icons-kit/entypo/minus';

import { FAQ_DATA } from 'common/data/SassMinimal';

import { FaqWrapper } from './faq.style';

const FaqSection = ({ title, description }) => {
  return (
    <FaqWrapper id="faq_section">
      <Container>
        <Box className="blockTitle">
          <Heading as="h2" content="Frequently Ask Questions" />
          <Text
            as="p"
            content="What question on your mind, lets find the answers"
          />
        </Box>
        <Box className="row">
          <Box className="col">
            <Accordion>
              <>
                {FAQ_DATA.map((accordionItem, index) => (
                  <AccordionItem
                    className="accordion_item"
                    key={`accordion-${index}`}
                    expanded={accordionItem.expend}
                  >
                    <>
                      <AccordionTitle className="accordion_title">
                        <>
                          <Heading {...title} content={accordionItem.title} />
                          <IconWrapper>
                            <OpenIcon className="openIcon">
                              <Icon icon={minus} size={18} />
                            </OpenIcon>
                            <CloseIcon className="closeIcon">
                              <Icon icon={plus} size={18} />
                            </CloseIcon>
                          </IconWrapper>
                        </>
                      </AccordionTitle>
                      <AccordionBody className="accordion_body">
                        <Text
                          {...description}
                          content={accordionItem.description}
                        />
                      </AccordionBody>
                    </>
                  </AccordionItem>
                ))}
              </>
            </Accordion>
            <Box className="btnWrapper">
              <Link href="#">
                <a>
                  <Button title="Explore all FAQ" />
                </a>
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </FaqWrapper>
  );
};

export default FaqSection;

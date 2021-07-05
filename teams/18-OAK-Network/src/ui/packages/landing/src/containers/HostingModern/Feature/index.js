import React from 'react';
import { Icon } from 'react-icons-kit';
import { thinRight } from 'react-icons-kit/entypo/thinRight';
import Container from 'common/components/UI/ContainerTwo';
import Heading from 'common/components/Heading';
import Image from 'common/components/Image';
import Text from 'common/components/Text';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@reach/accordion';
import '@reach/accordion/styles.css';
import SectionHeading from '../SectionHeading';
import FeatureWrapper, { FeatureContent, Content, Ipad } from './feature.style';
import { accordions } from 'common/data/HostingModern';
import iPad from 'common/assets/image/hostingModern/ipad.png';

const Feature = () => {
  return (
    <FeatureWrapper id="features">
      <Ipad>
        <Image src={iPad} alt="" />
      </Ipad>
      <Container>
        <FeatureContent>
          <SectionHeading
            mb="20px"
            slogan="Website content builder"
            title="Meet our premium features that will make you wow"
            textAlign="left"
          />
          <Content>
            <Text
              className="caption"
              content="Build an incredible workplace and grow your business with Gusto’s all-in-one platform with amazing contents."
            />
            <Accordion>
              {accordions.map((item) => {
                return (
                  <AccordionItem key={item.id}>
                    <AccordionButton>
                      {item.title} <Icon icon={thinRight} />
                    </AccordionButton>
                    <AccordionPanel>{item.desc}</AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </Content>
        </FeatureContent>
      </Container>
    </FeatureWrapper>
  );
};

export default Feature;

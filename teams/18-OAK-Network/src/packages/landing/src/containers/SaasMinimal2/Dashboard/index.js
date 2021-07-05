import React from 'react';

import Container from 'common/components/UI/Container';
import Heading from 'common/components/Heading';
import Image from 'common/components/Image';
import Text from 'common/components/Text';
import {
  Section,
  SectionHeading,
  TabPanel,
  TabPane,
  ProcessLine,
  LoadingLine,
  Illustration,
} from './dashboard.style';

import { data } from 'common/data/SaasMinimal2';

import illustration from 'common/assets/image/saasMinimal2/dashboard.png';

const Dashboard = () => {
  return (
    <Section id="dashboard">
      <Container>
        <SectionHeading>
          <Heading content="Analyze, measure, and improve your customer experience. Over and over again." />
        </SectionHeading>
        <TabPanel>
          <ProcessLine />
          <LoadingLine />
          {data?.dashboardProcess?.map((item) => (
            <TabPane key={item.id}>
              <figure>
                <Image src={item.icon} alt={item.title} />
              </figure>
              <Text content={item.title} />
            </TabPane>
          ))}
        </TabPanel>
        <Illustration>
          <Image src={illustration} alt="illustration" />
        </Illustration>
      </Container>
    </Section>
  );
};

export default Dashboard;

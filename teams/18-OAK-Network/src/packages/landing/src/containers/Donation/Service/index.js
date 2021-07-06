import React from 'react';
import Zoom from 'react-reveal/Zoom';
import { Icon } from 'react-icons-kit';
import { chevronRight } from 'react-icons-kit/feather/chevronRight';

import Container from 'common/components/UI/Container';
import Link from 'common/components/Link';
import BlogPost from 'common/components/BlogPost';
import SectionHeading from '../SectionHeading';
import Section, { ServiceWrapper } from './service.style';

import { data } from 'common/data/Donation';

const Service = () => {
  return (
    <Section id="our-mission">
      <Container>
        <Zoom>
          <SectionHeading
            title="What our mission beyond COVID-19"
            desc="Build an incredible workplace and grow your business with Gusto’s all-in-one platform with amazing contents."
          />
        </Zoom>
        <ServiceWrapper>
          {data.services.map((service) => (
            <BlogPost
              key={service.id}
              className="serviceItem"
              thumbUrl={service.icon}
              title={service.title}
              excerpt={service.desc}
              link={
                <Link href={service.link}>
                  Learn More <Icon icon={chevronRight} />
                </Link>
              }
            />
          ))}
        </ServiceWrapper>
      </Container>
    </Section>
  );
};

export default Service;

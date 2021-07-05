import React from 'react';
import styled from 'styled-components';
import { Icon } from 'react-icons-kit';
import { arrowRight } from 'react-icons-kit/feather/arrowRight';
import Container from 'common/components/UI/Container';
import Text from 'common/components/Text';
import Link from 'common/components/Link';

import { data } from 'common/data/SaasMinimal2';
import { themeGet } from '@styled-system/theme-get';

const Statistics = () => {
  return (
    <Section>
      <Container>
        <StatsWrapper>
          {data?.statistics?.map((stat) => (
            <StatItem key={stat.id}>
              <span>
                <span>+</span>
                {stat.value}%
              </span>
              <Text content={stat.title} />
              <Link href={stat.url}>
                Read story <Icon size={18} icon={arrowRight} />
              </Link>
            </StatItem>
          ))}
        </StatsWrapper>
      </Container>
    </Section>
  );
};

export default Statistics;

const Section = styled.section`
  padding: 70px 0;
  @media only screen and (max-width: 768px) {
    padding: 50px 0;
  }
`;

const StatsWrapper = styled.div`
  gap: 100px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  @media only screen and (max-width: 768px) {
    gap: 10px;
  }
  @media only screen and (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 40px;
  }
`;

const StatItem = styled.div`
  text-align: center;
  @media only screen and (max-width: 768px) {
    padding: 0 20px;
  }
  span {
    color: ${themeGet('colors.primary')};
    display: flex;
    justify-content: center;
    font-size: 60px;
    line-height: 1.17;
    letter-spacing: -0.02em;
    margin-bottom: 15px;
    span {
      font-size: 40px;
    }
    @media only screen and (max-width: 768px) {
      font-size: 50px;
    }
  }
  p {
    font-size: 17px;
    line-height: 1.3;
    color: #09131f;
    @media only screen and (max-width: 768px) {
      font-size: 16px;
      line-height: 1.5;
    }
  }
  a {
    color: ${themeGet('colors.primary')};
    font-size: 14px;
    font-weight: 700;
  }
`;

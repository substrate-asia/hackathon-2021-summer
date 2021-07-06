import React from 'react';
import Link from 'next/link';
import { Icon } from 'react-icons-kit';
import { androidArrowForward } from 'react-icons-kit/ionicons/androidArrowForward';
import Box from 'common/components/Box';
import Heading from 'common/components/Heading';
import Text from 'common/components/Text';
import Container from 'common/components/UI/Container';
import CounterArea, { Row, Col } from './counter.style';
import { CounterData } from 'common/data/AppMinimal';

const Counter = () => {
  const { blockTitle, countBox } = CounterData;
  const { title, tagline } = blockTitle;
  return (
    <CounterArea>
      <Container className="Container">
        <Box className="topTitle">
          <Heading as="h2" content={title} />
          <Text as="p" content={tagline} />
        </Box>
        <Row>
          {countBox.map(({ number, text, button }, index) => (
            <Col key={`counter-key-${index}`}>
              <Box className="CounterBox">
                <Heading as="h3" content={`${number}%`} />
                <Text as="p" content={text} />
                <Link href={button.link}>
                  <a className="counterLink">
                    {button.label} <Icon size={18} icon={androidArrowForward} />
                  </a>
                </Link>
              </Box>
            </Col>
          ))}
        </Row>
      </Container>
    </CounterArea>
  );
};

export default Counter;

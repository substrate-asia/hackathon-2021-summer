import React, { useState } from 'react';
import Link from 'next/link';
import { Icon } from 'react-icons-kit';
import { androidArrowForward } from 'react-icons-kit/ionicons/androidArrowForward';
import { androidDone } from 'react-icons-kit/ionicons/androidDone';
import Container from 'common/components/UI/Container';
import Box from 'common/components/Box';
import Switch from 'common/components/Switch';
import Heading from 'common/components/Heading';
import Text from 'common/components/Text';
import PricingArea, {
  TopHeading,
  Row,
  Col,
  PriceCard,
  CardTop,
  CardBody,
  CardFooter,
  PricingAmount,
} from './pricing.style';

import {
  MONTHLY_PRICING_DATA,
  YEARLY_PRICING_DATA,
} from 'common/data/AppMinimal';

const Pricing = () => {
  const [state, setState] = useState({
    toggle: true,
  });

  const dataHandle = () => {
    setState({
      ...state,
      toggle: !state.toggle,
    });
  };

  return (
    <PricingArea id="pricing_section">
      <Container className="Container">
        <TopHeading>
          <Heading as="h2" content="Meet our exiciting Pricing Plan" />
        </TopHeading>
        <Box className="priceFilter">
          <span>Monthly</span>
          <Switch
            switchColor="#fff"
            labelText=""
            labelPosition="left"
            onChange={dataHandle}
          />
          <span>Yearly</span>
        </Box>
        {state.toggle === false && (
          <Row>
            {MONTHLY_PRICING_DATA.map(
              (
                {
                  recommended,
                  title,
                  price,
                  tagline,
                  planLabel,
                  options,
                  button,
                },
                index
              ) => (
                <Col key={`pricing-card-key-${index}`}>
                  <PriceCard
                    className={recommended === true ? 'recommended' : ' '}
                  >
                    <CardTop className="cardTop">
                      <Heading as="h3" content={title} />
                      <PricingAmount>
                        <Heading as="h4" content={price} />
                        <Text as="p" content={tagline} />
                      </PricingAmount>
                    </CardTop>
                    <CardBody>
                      <Text
                        as="span"
                        className="pricingLabel"
                        content={planLabel}
                      />
                      <ul className="priceList">
                        {options.map(({ text }, index) => (
                          <li key={`priceList-key-${index}`}>
                            <Icon size={18} icon={androidDone} />
                            {text}
                          </li>
                        ))}
                      </ul>
                    </CardBody>
                    <CardFooter className="cardFooter">
                      <Link href={button.link}>
                        <a className="priceBtn">
                          {button.label}{' '}
                          <Icon size={18} icon={androidArrowForward} />
                        </a>
                      </Link>
                    </CardFooter>
                  </PriceCard>
                </Col>
              )
            )}
          </Row>
        )}
        {state.toggle === true && (
          <Row>
            {YEARLY_PRICING_DATA.map(
              (
                {
                  recommended,
                  title,
                  price,
                  tagline,
                  planLabel,
                  options,
                  button,
                },
                index
              ) => (
                <Col key={`pricing-card-key-${index}`}>
                  <PriceCard
                    className={recommended === true ? 'recommended' : ' '}
                  >
                    <CardTop>
                      <Heading as="h3" content={title} />
                      <PricingAmount>
                        <Heading as="h4" content={price} />
                        <Text as="p" content={tagline} />
                      </PricingAmount>
                    </CardTop>
                    <CardBody>
                      <Text
                        as="span"
                        className="pricingLabel"
                        content={planLabel}
                      />
                      <ul className="priceList">
                        {options.map(({ text }, index) => (
                          <li key={`priceList-key-${index}`}>
                            <Icon size={18} icon={androidDone} />
                            {text}
                          </li>
                        ))}
                      </ul>
                    </CardBody>
                    <CardFooter>
                      <Link href={button.link}>
                        <a className="priceBtn">
                          {button.label}{' '}
                          <Icon size={18} icon={androidArrowForward} />
                        </a>
                      </Link>
                    </CardFooter>
                  </PriceCard>
                </Col>
              )
            )}
          </Row>
        )}
      </Container>
    </PricingArea>
  );
};

export default Pricing;

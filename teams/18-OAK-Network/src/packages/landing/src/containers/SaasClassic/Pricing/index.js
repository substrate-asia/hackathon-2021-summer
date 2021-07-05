import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Box from 'common/components/Box';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Button from 'common/components/Button';
import Container from 'common/components/UI/Container';
import GlideCarousel from 'common/components/GlideCarousel';
import GlideSlide from 'common/components/GlideCarousel/glideSlide';

import {
  MONTHLY_PRICING_TABLE,
  YEARLY_PRICING_TABLE,
} from 'common/data/SaasClassic';

import PricingTable, {
  PricingHead,
  PricingPrice,
  PricingButton,
  PricingList,
  ListItem,
  PricingButtonWrapper,
  PricingTableWrapper,
} from './pricing.style';

const PricingSection = ({
  sectionWrapper,
  secTitleWrapper,
  secHeading,
  secText,
  nameStyle,
  descriptionStyle,
  priceStyle,
  priceLabelStyle,
  buttonFillStyle,
  listContentStyle,
}) => {
  const [state, setState] = useState({
    data: MONTHLY_PRICING_TABLE,
    active: true,
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(function () {
      setLoading(true);
    }, 500);
  });

  const data = state.data;
  const activeStatus = state.active;

  const pricingCarouselOptions = {
    type: 'slider',
    perView: 3,
    gap: 30,
    bound: true,
    breakpoints: {
      1199: {
        perView: 2,
        type: 'carousel',
        peek: {
          before: 100,
          after: 100,
        },
      },
      990: {
        type: 'carousel',
        perView: 1,
        peek: {
          before: 100,
          after: 100,
        },
      },
      767: {
        type: 'carousel',
        perView: 1,
        peek: {
          before: 80,
          after: 80,
        },
      },
      575: {
        type: 'carousel',
        perView: 1,
        gap: 15,
        peek: {
          before: 20,
          after: 20,
        },
      },
    },
  };

  return (
    <Box {...sectionWrapper} id="pricing_section">
      <Container>
        <Box {...secTitleWrapper}>
          <Text {...secText} content="PRICING PLAN" />
          <Heading
            {...secHeading}
            content="Choose your pricing policy which affordable"
          />
          <PricingButtonWrapper>
            <Button
              title="Monthly Pricing"
              className={activeStatus ? 'active-item' : ''}
              onClick={() =>
                setState({ data: MONTHLY_PRICING_TABLE, active: true })
              }
            />
            <Button
              title="Annual Pricing"
              className={activeStatus === false ? 'active-item' : ''}
              onClick={() =>
                setState({ data: YEARLY_PRICING_TABLE, active: false })
              }
            />
            <Link href="#">
              <a>+ Custom Plan</a>
            </Link>
          </PricingButtonWrapper>
        </Box>
        <PricingTableWrapper>
          <GlideCarousel
            carouselSelector="pricing-carousel"
            options={pricingCarouselOptions}
            controls={false}
          >
            <>
              {data.map((pricingTable, index) => (
                <GlideSlide key={`pricing-table-${index}`}>
                  <PricingTable
                    freePlan={pricingTable.freePlan}
                    className="pricing_table"
                  >
                    <PricingHead>
                      <Heading content={pricingTable.name} {...nameStyle} />
                      <Text
                        content={pricingTable.description}
                        {...descriptionStyle}
                      />
                    </PricingHead>
                    <PricingPrice>
                      <Text content={pricingTable.price} {...priceStyle} />
                      <Text
                        content={pricingTable.priceLabel}
                        {...priceLabelStyle}
                      />
                    </PricingPrice>
                    <PricingList>
                      {pricingTable.listItems.map((item, index) => (
                        <ListItem key={`pricing-table-list-${index}`}>
                          <Text content={item.content} {...listContentStyle} />
                        </ListItem>
                      ))}
                    </PricingList>
                    <PricingButton>
                      <Link href={pricingTable.url}>
                        <a>
                          <Button
                            title={pricingTable.buttonLabel}
                            {...buttonFillStyle}
                          />
                        </a>
                      </Link>
                      {pricingTable.trialButtonLabel ? (
                        <Link href={pricingTable.trialURL || '#'}>
                          <a className="trial_button">
                            {pricingTable.trialButtonLabel}
                          </a>
                        </Link>
                      ) : (
                        ''
                      )}
                    </PricingButton>
                  </PricingTable>
                </GlideSlide>
              ))}
            </>
          </GlideCarousel>
        </PricingTableWrapper>
      </Container>
    </Box>
  );
};

PricingSection.propTypes = {
  sectionWrapper: PropTypes.object,
  row: PropTypes.object,
  secTitleWrapper: PropTypes.object,
  secHeading: PropTypes.object,
  secText: PropTypes.object,
  nameStyle: PropTypes.object,
  descriptionStyle: PropTypes.object,
  priceStyle: PropTypes.object,
  priceLabelStyle: PropTypes.object,
  listContentStyle: PropTypes.object,
};

PricingSection.defaultProps = {
  sectionWrapper: {
    as: 'section',
    pt: ['60px', '80px', '80px', '80px', '100px'],
    pb: '20px',
  },
  secTitleWrapper: {
    mb: ['30px', '40px'],
  },
  secText: {
    as: 'span',
    display: 'block',
    textAlign: 'center',
    fontSize: '14px',
    letterSpacing: '0.15em',
    fontWeight: '700',
    color: '#ff4362',
    mb: '12px',
  },
  secHeading: {
    textAlign: 'center',
    fontSize: ['20px', '24px', '36px', '36px'],
    fontWeight: '700',
    color: '#0f2137',
    letterSpacing: '-0.025em',
    mb: '0',
    ml: 'auto',
    mr: 'auto',
    lineHeight: '1.12',
    width: '500px',
    maxWidth: '100%',
  },
  col: {
    width: [1, 1 / 2, 1 / 2, 1 / 3],
    pr: '15px',
    pl: '15px',
  },
  nameStyle: {
    fontSize: ['20px', '20px', '22px', '22px', '22px'],
    fontWeight: '700',
    color: '#0f2137',
    letterSpacing: '-0.025em',
    textAlign: 'center',
    mb: '12px',
  },
  descriptionStyle: {
    fontSize: ['15px', '16px', '16px', '16px', '16px'],
    color: '#6e7379',
    lineHeight: '1.75',
    textAlign: 'center',
    mb: '0',
  },
  priceStyle: {
    as: 'span',
    display: 'block',
    fontSize: ['36px', '36px', '40px', '40px', '40px'],
    color: '#0f2137',
    textAlign: 'center',
    mb: '5px',
    letterSpacing: '-0.025em',
    fontWeight: '500',
  },
  priceLabelStyle: {
    fontSize: ['13px', '14px', '14px', '14px', '14px'],
    color: '#6e7379',
    lineHeight: '1.75',
    textAlign: 'center',
    mb: '0',
  },
  buttonStyle: {
    type: 'button',
    fontSize: '14px',
    fontWeight: '600',
    borderRadius: '4px',
    pl: '10px',
    pr: '10px',
    bg: '#fff',
    color: '#2aa275',
    colors: 'primaryWithBg',
    width: '222px',
    maxWidth: '100%',
  },
  buttonFillStyle: {
    type: 'button',
    fontSize: '15px',
    fontWeight: '700',
    color: 'white',
    borderRadius: '4px',
    pl: '10px',
    pr: '10px',
    colors: 'primaryWithBg',
    minWidth: ['160px', '190px'],
    maxWidth: '100%',
    height: '48px',
  },
  listContentStyle: {
    fontSize: ['15px', '16px', '16px', '16px', '16px'],
    color: '#6e7379',
    mb: '0',
  },
};

export default PricingSection;

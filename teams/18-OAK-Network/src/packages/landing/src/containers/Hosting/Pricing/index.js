import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Icon from 'react-icons-kit';
import Fade from 'react-reveal/Fade';
import Box from 'common/components/Box';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Button from 'common/components/Button';
import Switch from 'common/components/Switch';
import Container from 'common/components/UI/Container';
import GlideCarousel from 'common/components/GlideCarousel';
import GlideSlide from 'common/components/GlideCarousel/glideSlide';

import {
  MONTHLY_PRICING_TABLE,
  YEARLY_PRICING_TABLE,
} from 'common/data/Hosting/data';

import PricingTable, {
  PricingHead,
  PricingPrice,
  PricingButton,
  PricingList,
  ListItem,
  SwitchWrapper,
} from './pricing.style';

import { checkmark } from 'react-icons-kit/icomoon/checkmark';

const PricingSection = ({
  sectionWrapper,
  row,
  secTitleWrapper,
  secHeading,
  secText,
  nameStyle,
  descriptionStyle,
  priceStyle,
  priceLabelStyle,
  buttonStyle,
  buttonFillStyle,
  listContentStyle,
}) => {
  const [state, setState] = useState({
    toggle: true,
    data: MONTHLY_PRICING_TABLE,
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(function () {
      setLoading(true);
    }, 500);
  });

  const dataHandle = () => {
    setState({
      ...state,
      toggle: !state.toggle,
    });
  };

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
          before: 150,
          after: 150,
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
    <Box {...sectionWrapper}>
      <Container>
        <Box {...secTitleWrapper}>
          <Fade bottom cascade>
            <Text {...secText} content="PRICING PLAN" />
            <Heading
              {...secHeading}
              content="What’s our monthly pricing subscription"
            />
            <SwitchWrapper>
              <Switch
                labelPosition="bottom"
                switchColor="#f0f0f0"
                barColor="#f0f0f0"
                labelText="Show Pricing plan annually"
                labelPosition="left"
                onChange={dataHandle}
              />
            </SwitchWrapper>
          </Fade>
        </Box>
        <Box {...row}>
          <GlideCarousel
            carouselSelector="pricing-carousel"
            options={pricingCarouselOptions}
            controls={false}
          >
            {state.toggle === true ? (
              <>
                {MONTHLY_PRICING_TABLE.map((pricingTable, index) => (
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
                      <PricingButton>
                        <Link href={pricingTable.url}>
                          <a>
                            {pricingTable.freePlan ? (
                              <Button
                                title={pricingTable.buttonLabel}
                                {...buttonStyle}
                              />
                            ) : (
                              <Button
                                title={pricingTable.buttonLabel}
                                {...buttonFillStyle}
                              />
                            )}
                          </a>
                        </Link>
                      </PricingButton>
                      <PricingList>
                        {pricingTable.listItems.map((item, index) => (
                          <ListItem key={`pricing-table-list-${index}`}>
                            <Icon
                              icon={checkmark}
                              className="price_list_icon"
                              size={13}
                            />
                            <Text
                              content={item.content}
                              {...listContentStyle}
                            />
                          </ListItem>
                        ))}
                      </PricingList>
                    </PricingTable>
                  </GlideSlide>
                ))}
              </>
            ) : (
              <>
                {YEARLY_PRICING_TABLE.map((pricingTable, index) => (
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
                      <PricingButton>
                        <Link href={pricingTable.url}>
                          <a>
                            {pricingTable.freePlan ? (
                              <Button
                                title={pricingTable.buttonLabel}
                                {...buttonStyle}
                              />
                            ) : (
                              <Button
                                title={pricingTable.buttonLabel}
                                {...buttonFillStyle}
                              />
                            )}
                          </a>
                        </Link>
                      </PricingButton>
                      <PricingList>
                        {pricingTable.listItems.map((item, index) => (
                          <ListItem key={`pricing-table-list-${index}`}>
                            <Icon
                              icon={checkmark}
                              className="price_list_icon"
                              size={13}
                            />
                            <Text
                              content={item.content}
                              {...listContentStyle}
                            />
                          </ListItem>
                        ))}
                      </PricingList>
                    </PricingTable>
                  </GlideSlide>
                ))}
              </>
            )}
          </GlideCarousel>
        </Box>
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
    pt: ['60px', '80px', '80px', '80px', '150px'],
    pb: ['40px', '40px', '40px', '40px'],
  },
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  secTitleWrapper: {
    mb: ['50px', '50px', '60px', '75px'],
  },
  secText: {
    as: 'span',
    display: 'block',
    textAlign: 'center',
    fontSize: '14px',
    letterSpacing: '0.15em',
    fontWeight: '700',
    color: '#eb4d4b',
    mb: '10px',
  },
  secHeading: {
    textAlign: 'center',
    fontSize: ['20px', '24px'],
    fontWeight: '400',
    color: 'headingColor',
    letterSpacing: '-0.025em',
    mb: '0',
  },
  col: {
    width: [1, 1 / 2, 1 / 2, 1 / 3],
    pr: '15px',
    pl: '15px',
  },
  nameStyle: {
    fontSize: ['18px', '20px', '22px', '22px', '22px'],
    fontWeight: '500',
    color: 'headingColor',
    letterSpacing: '-0.025em',
    textAlign: 'center',
    mb: '12px',
  },
  descriptionStyle: {
    fontSize: ['14px', '16px', '16px', '16px', '16px'],
    color: 'textColor',
    lineHeight: '1.75',
    textAlign: 'center',
    mb: '0',
  },
  priceStyle: {
    as: 'span',
    display: 'block',
    fontSize: ['32px', '36px', '40px', '40px', '40px'],
    color: 'headingColor',
    textAlign: 'center',
    mb: '5px',
    letterSpacing: '-0.025em',
  },
  priceLabelStyle: {
    fontSize: ['13px', '14px', '14px', '14px', '14px'],
    color: 'textColor',
    lineHeight: '1.75',
    textAlign: 'center',
    mb: '0',
  },
  buttonStyle: {
    type: 'button',
    fontSize: ['13px', '14px', '14px', '14px', '14px'],
    fontWeight: '600',
    borderRadius: '4px',
    pl: '10px',
    pr: '10px',
    colors: 'primary',
    width: '222px',
    maxWidth: '100%',
  },
  buttonFillStyle: {
    type: 'button',
    fontSize: '14px',
    fontWeight: '600',
    color: '#fff!important',
    borderRadius: '4px',
    pl: '10px',
    pr: '10px',
    colors: 'primaryWithBg',
    width: '200px',
    maxWidth: '100%',
  },
  listContentStyle: {
    fontSize: ['14px', '16px', '16px', '16px', '16px'],
    color: 'textColor',
    mb: '0',
  },
};

export default PricingSection;

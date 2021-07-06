import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Box from 'common/components/Box';
import Text from 'common/components/Text';
import Image from 'common/components/Image';
import Container from 'common/components/UI/Container';
import InputGroup from 'common/components/InputGroup';
import RadioGroup from 'common/components/RadioGroup';
import SectionWrapper, {
  ContentArea,
  Heading,
  ButtonGroup,
  DonationForm,
  DonateButton,
} from './donateSection.style';

import { paymentPolicy, currencyOptions } from 'common/data/Charity';
import heartImage from 'common/assets/image/charity/heart-alt.svg';

const DonateSection = ({ row, col }) => {
  const [state, setState] = useState({
    price: '',
    currency: 'usd',
    policy: 'oneTime',
  });

  const handleFormData = (value, name) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleDonation = (e) => {
    e.preventDefault();
    console.log('Donation form data: ', state);

    setState({
      ...state,
      price: '',
    });
  };

  return (
    <SectionWrapper id="donate">
      <Container width="1260px">
        <Box className="row" {...row}>
          <Box className="col" {...col}>
            <ContentArea>
              <Heading>
                Would You like to <span>Help people</span> Across the Globe?
              </Heading>
              <Text content="Data from January 1 through November 30, 2018" />
              <ButtonGroup>
                <Link href="#">
                  <a className="learn__more-btn alt">
                    <span className="hyphen" />
                    <span className="btn_text">Funding Progress</span>
                  </a>
                </Link>
                <Text content="or" />
                <Link href="#">
                  <a className="learn__more-btn">
                    <span className="hyphen" />
                    <span className="btn_text">Join our Organizations</span>
                  </a>
                </Link>
              </ButtonGroup>
            </ContentArea>
          </Box>
          <Box className="col" {...col}>
            <DonationForm onSubmit={(e) => handleDonation(e)}>
              <InputGroup
                inputType="number"
                placeholder="100.00"
                inputValue={state.price}
                inputOnChange={(e) => handleFormData(e.target.value, 'price')}
                currency="$ USD"
                selectedValue={state.currency}
                selectOptions={currencyOptions}
                selectOnUpdate={(value) => handleFormData(value, 'currency')}
              />
              <RadioGroup
                name="radioGroup"
                value={state.policy}
                items={paymentPolicy}
                onUpdate={(value) => handleFormData(value, 'policy')}
              />
              <DonateButton type="submit">
                Donate Now <Image src={heartImage} alt="Charity Landing" />
              </DonateButton>
            </DonationForm>
          </Box>
        </Box>
      </Container>
    </SectionWrapper>
  );
};

// DonateSection style props
DonateSection.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
  textStyle: PropTypes.object,
};

// DonateSection default style
DonateSection.defaultProps = {
  // DonateSection row default style
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: '-15px',
    mr: '-15px',
  },
  // DonateSection col default style
  col: {
    width: ['100%', '50%', '50%'],
    pl: '15px',
    pr: '15px',
    mb: '30px',
  },
};

export default DonateSection;

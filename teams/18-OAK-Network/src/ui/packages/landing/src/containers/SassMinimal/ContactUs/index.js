import React from 'react';
import Link from 'next/link';
import Container from 'common/components/UI/Container';
import Box from 'common/components/Box';
import Heading from 'common/components/Heading';

import { ContactUsWrapper } from './contactUs.style';

const ContactUs = () => {
  return (
    <ContactUsWrapper id="contact_section">
      <Container>
        <Box className="contactInner">
          <Box className="leftContent">
            <Heading as="h3" content="For project inquiry" />
            <Heading
              as="h3"
              className="color2"
              content="Contact us our supporter team"
            />
          </Box>
          <Box className="buttonBox">
            <Link href="#">
              <a className="contactBtn">Contact Us</a>
            </Link>
          </Box>
        </Box>
      </Container>
    </ContactUsWrapper>
  );
};

export default ContactUs;

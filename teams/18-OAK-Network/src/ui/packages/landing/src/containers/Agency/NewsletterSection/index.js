import React from 'react';
import PropTypes from 'prop-types';
import Box from 'common/components/Box';
import Heading from 'common/components/Heading';
import Input from 'common/components/Input';
import Button from 'common/components/Button';
import Container from 'common/components/UI/Container';
import NewsletterSectionWrapper, {
  NewsletterForm,
} from './newsletterSection.style';

const NewsletterSection = ({ sectionHeader, sectionTitle, btnStyle }) => {
  return (
    <NewsletterSectionWrapper id="newsletterSection">
      <Container>
        <Box>
          <NewsletterForm>
            <Input
              inputType="email"
              isMaterial={false}
              placeholder="Email Address"
              aria-label="email"
            />
            <Button type="button" title="Join Newsletter " {...btnStyle} />
          </NewsletterForm>
        </Box>
      </Container>
    </NewsletterSectionWrapper>
  );
};

// NewsletterSection style props
NewsletterSection.propTypes = {
  sectionHeader: PropTypes.object,
  sectionTitle: PropTypes.object,
  sectionSubTitle: PropTypes.object,
};

// NewsletterSection default style
NewsletterSection.defaultProps = {
  // section header default style
  sectionHeader: {
    mb: '56px',
  },
  // section title default style
  sectionTitle: {
    textAlign: 'center',
    fontSize: ['20px', '24px'],
    fontWeight: '400',
    color: '#0f2137',
    letterSpacing: '-0.025em',
    mb: '0',
  },
  // button default style
  btnStyle: {
    minWidth: '152px',
    minHeight: '45px',
    fontSize: '14px',
    fontWeight: '500',
  },
};

export default NewsletterSection;

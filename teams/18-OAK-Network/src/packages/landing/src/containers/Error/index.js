import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Icon from 'react-icons-kit';
import Box from 'common/components/Box';
import Text from 'common/components/Text';
import Heading from 'common/components/Heading';
import Image from 'common/components/Image';
import Button from 'common/components/Button';
import ErrorImage from 'common/assets/image/404.svg';
import { home } from 'react-icons-kit/entypo/home';
import { ccw } from 'react-icons-kit/entypo/ccw';
import { ErrorWrapper, ErrorConatent, ButtonWrapper } from './error.style';

const ErrorSec = ({ imageWrapper, title, text, reloadButton, homeButton }) => {
  const pageReload = () => {
    window.location.reload();
  };
  return (
    <ErrorWrapper>
      <ErrorConatent>
        <Box {...imageWrapper} className="image-wrapper">
          <Image src={ErrorImage} alt="404" />
        </Box>
        <Heading {...title} content="Page not found!" />
        <Text
          {...text}
          content="Looks like the page you're trying to visit dosen't exist. Please check the URL and try your luck again."
        />
        <ButtonWrapper>
          <Button
            {...reloadButton}
            title="Reload Page"
            icon={<Icon icon={ccw} size={24} />}
            className="domain_search_button"
            onClick={pageReload}
          />
          <Link href="/">
            <a>
              <Button
                {...homeButton}
                title="Go Home"
                icon={<Icon icon={home} size={24} />}
                className="domain_search_button"
              />
            </a>
          </Link>
        </ButtonWrapper>
      </ErrorConatent>
    </ErrorWrapper>
  );
};

ErrorSec.propTypes = {
  imageWrapper: PropTypes.object,
};

ErrorSec.defaultProps = {
  imageWrapper: {
    mb: ['40px', '55px'],
  },
  title: {
    fontSize: ['26px', '32px', '38px', '48px'],
    fontWeight: '400',
    color: '#0f2137',
    letterSpacing: '-0.025em',
    mb: ['20px', '25px', '25px', '25px', '35px'],
    lineHeight: '1.31',
    textAlign: 'center',
    fontFamily: 'poppins',
    fontWeight: '600',
  },
  text: {
    fontSize: ['15px', '16px', '16px', '16px', '16px'],
    color: '#343d48',
    lineHeight: '2',
    mb: ['30px', '40px', '50px', '60px'],
    textAlign: 'center',
    fontFamily: 'lato',
  },
  reloadButton: {
    type: 'button',
    fontSize: '16px',
    fontWeight: '500',
    color: '#fff',
    pl: ['15px', '22px'],
    pr: ['15px', '22px'],
    iconPosition: 'left',
    bg: '#eaa03b',
    fontFamily: 'lato',
  },
  homeButton: {
    type: 'button',
    fontSize: '16px',
    fontWeight: '500',
    color: '#0f2137',
    pl: ['15px', '22px'],
    pr: ['15px', '22px'],
    iconPosition: 'left',
    bg: '#e2e7f0',
    fontFamily: 'lato',
  },
};

export default ErrorSec;

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import NavButtonStyle from './navButton.style';
import Loader from '../Loader';

const NavButton = ({
  title,
  ...props
}) => {
  return (
    <NavButtonStyle
      {...props}
    >
      {title && <span className="btn-text">{title}</span>}
    </NavButtonStyle>
  );
};

export default NavButton;

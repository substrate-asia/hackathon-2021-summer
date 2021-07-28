import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ButtonLikeStyle from './buttonLike.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as faThumbsUpSolid } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { Row, Col } from 'antd';

const Button = ({ className, onClick, isLiked, likeCount, ...props }) => {
  // Add all classs to an array
  const addAllClasses = ['reusecore__button'];

  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }

  const likeCountText =
    _.isUndefined(likeCount) || likeCount <= 0 ? '0' : likeCount;
  const likeText = likeCount && likeCount <= 1 ? 'Like' : 'Likes';

  return (
    <ButtonLikeStyle onClick={onClick} {...props}>
      <Row justify="space-around" align="middle">
        <Col>
          <span>{`${likeCountText} ${likeText}`}</span>
        </Col>
        <Col>
          <FontAwesomeIcon
            icon={isLiked ? faThumbsUpSolid : faThumbsUp}
          ></FontAwesomeIcon>
        </Col>
      </Row>
    </ButtonLikeStyle>
  );
};

Button.propTypes = {
  /** ClassName of the button */
  className: PropTypes.string,

  /**
   * Gets called when the user clicks on the button
   */
  onClick: PropTypes.func,

  isLiked: PropTypes.bool,
  likeCount: PropTypes.number,
};

Button.defaultProps = {
  disabled: false,
  isMaterial: false,
  isLoading: false,
  type: 'button',
};

export default Button;

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import CommentStyle from './comment.style';
import Identicon from '@polkadot/react-identicon';

const truncateMiddle = require('truncate-middle');

const Comment = ({ ...props }) => {
  const { comment: commentObject, voteAmount } = props;
  const { comment, timestamp, user } = commentObject;

  const datetime = moment(timestamp);
  const daysElapsed = moment().diff(datetime, 'days');
  let datetimeText = null;
  if (daysElapsed < 1) {
    datetimeText = datetime.fromNow();
  } else {
    datetimeText = datetime.format('LL');
  }

  return (
    <CommentStyle {...props}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginRight: 20,
        }}
      >
        <Identicon value={user} size={70} theme="polkadot" />
        <span style={{ marginTop: 10 }}>
          {truncateMiddle(user, 4, 4, '...')}
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <span>{comment}</span>
          <span style={{ marginLeft: 10 }}>{datetimeText}</span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {voteAmount > 0 && (
              <span style={{ marginLeft: 50 }}>
                Also contributed {voteAmount} OAK
              </span>
            )}
          </div>
        </div>
      </div>
    </CommentStyle>
  );
};

export default Comment;

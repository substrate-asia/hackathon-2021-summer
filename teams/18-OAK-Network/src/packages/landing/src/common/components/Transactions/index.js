import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import TransactionsStyle from './transactions.style';

const Transactions = ({ ...props }) => {
  const { voteRecords } = props;

  const getVoteList = (votes) => {
    return _.map(_.orderBy(votes, ['timestamp'], ['desc']), (vote) => {
      const { address, amount, timestamp } = vote;

      const datetime = moment(timestamp);
      const daysElapsed = moment().diff(datetime, 'days');
      let datetimeText = null;
      if (daysElapsed < 1) {
        datetimeText = datetime.fromNow();
      } else {
        datetimeText = datetime.format('LL');
      }

      return (
        <div key={timestamp} className="vote-row">
          <div>user: {address}</div>
          <div>amnout: {amount} OAK</div>
          <div>datetime: {datetimeText}</div>
        </div>
      );
    });
  };

  return (
    <TransactionsStyle {...props}>
      <div>{getVoteList(voteRecords)}</div>
    </TransactionsStyle>
  );
};

export default Transactions;

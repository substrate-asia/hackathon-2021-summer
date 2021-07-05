import React, { useState, useEffect }  from 'react';
import _ from 'lodash';
import cloudbase from '@cloudbase/js-sdk';
import TransactionsStyle from './transactions.style';
import { margin, marginTop } from 'styled-system';

const Transactions = ({ ...props }) => {

  const { projectIndex, roundIndex} = props;
  const [votes, setVotes] = useState([]);

  useEffect(async () => {
    const app = cloudbase.init({
      env: 'quadratic-funding-1edc914e16f235',
      region: 'ap-guangzhou'
    });

    console.log('projectIndex: ', projectIndex);
    console.log('roundIndex: ', roundIndex);

    const db = app.database();
    const result = await db.collection('votes')
      .get();
    console.log('result: ', result);

    setVotes(result.data);
  }, []);

  const getVoteList = (votes) => {
    return _.map(votes, (vote) => {
      const { address, amount, timestamp } = vote;
      return (
        <div style={{ border: '1px solid #ccc', marginTop: 10, padding: 10 }}>
          <div>user: {address}</div>
          <div>amnout: {amount}</div>
          <div>timestamp: {timestamp}</div>
        </div>
      );
    });
  }

  return (
    <TransactionsStyle {...props}>
      <div>
        {getVoteList(votes)}
      </div>
    </TransactionsStyle>
  );
};

export default Transactions;

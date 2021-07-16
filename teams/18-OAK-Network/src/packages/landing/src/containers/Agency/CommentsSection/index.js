import React, { useState, useEffect, useContext } from 'react';

import Container from 'common/components/UI/Container';
import Button from 'common/components/Button';
import CommentsSectionWrapper from './commentsSection.style';

import Comments from 'common/components/Comments';
import Contributors from 'common/components/Contributors';
import Transactions from 'common/components/Transactions';
import { PolkadotContext } from 'common/contexts/PolkadotContext';

const CommentsSection = ({
  voteRecords,
  projectIndex,
  roundIndex,
  ...props
}) => {
  const [tab, setTab] = useState(0);
  const polkadotContext = useContext(PolkadotContext);
  const [projectDetail, setProjectDetail] = useState({});
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    if (!_.isEmpty(polkadotContext)) {
      setProjectDetail(polkadotContext.projectDetail);

      const newContributions = [];
      _.forEach(polkadotContext.projectDetail.contributions, (item, index) => {
        newContributions.push({ ...item, index });
      });
      setContributions(newContributions);
    }
  }, [polkadotContext.projectDetail]);

  return (
    <CommentsSectionWrapper {...props}>
      <Container>
        <div>
          <div className="buttons">
            <Button
              title="Comments"
              className={tab === 0 ? 'selected' : 'notSelected'}
              onClick={() => setTab(0)}
            ></Button>
            <Button
              title="Contributors"
              className={tab === 1 ? 'selected' : 'notSelected'}
              onClick={() => setTab(1)}
            ></Button>
            <Button
              title="Transactions"
              className={tab === 2 ? 'selected' : 'notSelected'}
              onClick={() => setTab(2)}
            ></Button>
          </div>
          {tab === 0 && (
            <Comments
              projectIndex={projectIndex}
              voteRecords={voteRecords}
            ></Comments>
          )}
          {tab === 1 && (
            <Contributors contributions={contributions}></Contributors>
          )}
          {tab === 2 && (
            <Transactions
              roundIndex={roundIndex}
              projectIndex={projectIndex}
              voteRecords={voteRecords}
            ></Transactions>
          )}
        </div>
      </Container>
    </CommentsSectionWrapper>
  );
};

export default CommentsSection;

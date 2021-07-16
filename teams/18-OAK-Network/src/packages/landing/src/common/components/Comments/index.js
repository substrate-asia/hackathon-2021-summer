import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Button from 'common/components/Button';
import CommentsStyle from './comments.style';
import Comment from '../Comment';
import backend from '../../backend';
import notificationHelper from '../../../common/utils/notification.helper';
import reduxHelper from '../../../redux/helper';

const Comments = ({
  projectIndex: projectIndexStr,
  voteRecords,
  projectRecords,
  account,
  ...props
}) => {
  const projectIndex = parseInt(projectIndexStr);

  const [comments, setComments] = useState([]);
  const [textareaValue, setTextareaValue] = useState('');

  const getComments = async () => {
    const projects = _.filter(projectRecords, (projectRecord) => {
      return projectRecord.index === projectIndex;
    });

    if (projects.length === 1) {
      const project = projects[0];
      setComments(project.comments);
    }
  };

  useEffect(getComments, [projectRecords]);

  const onCommentClicked = async () => {
    if (_.isEmpty(account)) {
      notificationHelper.showNoWalletNotification();
      return;
    }

    const app = backend.getApp();
    await app.callFunction({
      name: 'comment',
      data: {
        address: account,
        comment: textareaValue,
        projectIndex,
      },
    });

    setTextareaValue('');

    reduxHelper.getProjects();
  };

  const getCommentList = (comments) => {
    const comnentList = _.map(_.clone(comments).reverse(), (comment) => {
      const voteAmount = _.reduce(
        voteRecords,
        (prev, vote) => {
          if (
            vote.address === comment.user &&
            vote.projectIndex === projectIndex
          ) {
            return prev + vote.amount;
          }
        },
        0
      );
      return (
        <Comment
          key={comment.timestamp}
          comment={comment}
          voteAmount={voteAmount}
        ></Comment>
      );
    });
    return comnentList;
  };

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };

  return (
    <CommentsStyle {...props}>
      <div className="content-div">
        <textarea
          className="comment-input"
          value={textareaValue}
          onChange={handleTextareaChange}
        ></textarea>
        <Button
          title="Leave a comment"
          className="leave-comment"
          onClick={onCommentClicked}
        ></Button>
      </div>

      <div className="content-div">{getCommentList(comments)}</div>
    </CommentsStyle>
  );
};

const mapStateToProps = (state) => ({
  account: state.account,
  projectRecords: state.projects,
});

export default connect(mapStateToProps)(Comments);

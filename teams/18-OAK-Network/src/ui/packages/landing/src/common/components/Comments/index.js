import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Button from 'common/components/Button';
import CommentsStyle from './comments.style';
import Comment from '../Comment';

const Comments = ({
  ...props
}) => {
  const { projectIndex: projectIndexStr } = props;
  const projectIndex = parseInt(projectIndexStr);

  const [comments, setComments] = useState([]);
  const [textareaValue, setTextareaValue] = useState('');

  const getComments = async () => {
    const cloudbase = (await import('@cloudbase/js-sdk')).default;
    const app = cloudbase.init({
      env: 'quadratic-funding-1edc914e16f235',
      region: 'ap-guangzhou'
    });

    const db = app.database();
    const result = await db.collection("projects")
      .where({ index: projectIndex })
      .get();

    console.log('getComments, result: ', result);
    
    const projects = result.data;
    if (projects.length === 1) {
      const project = projects[0];
      setComments(project.comments);
    }
  }

  useEffect(getComments, []);

  const onCommentClicked = async () => {
    console.log('onCommentClicked');
    const cloudbase = (await import('@cloudbase/js-sdk')).default;
    const app = cloudbase.init({
      env: 'quadratic-funding-1edc914e16f235',
      region: 'ap-guangzhou'
    });

    const result = await app.callFunction({
      name: 'comment',
      data: {
        address: props.account,
        comment: textareaValue,
        projectIndex,
      }
    });

    setTextareaValue('');

    getComments();
  }

  const getCommentList = (comments) => {
    const comnentList = _.map(_.clone(comments).reverse(), (comment) => {
      return (<Comment key={comment.timestamp} comment={comment} ></Comment>);
    });
    console.log('getCommentList, comments: ', comments);
    return comnentList;
  }

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  }

  return (
    <CommentsStyle
      {...props}
    >
      <div className="content-div">
        <textarea className="comment-input" value={textareaValue} onChange={handleTextareaChange}></textarea>
        <Button title="Leave a comment" className="leave-comment" onClick={onCommentClicked}></Button>
      </div>

      <div className="content-div">
        {getCommentList(comments)}
      </div>
    </CommentsStyle>
  );
};

const mapStateToProps = (state) => ({
  account: state.account,
});

export default connect(mapStateToProps)(Comments);

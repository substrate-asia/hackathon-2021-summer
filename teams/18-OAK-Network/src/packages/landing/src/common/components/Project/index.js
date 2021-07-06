import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faStar } from '@fortawesome/free-solid-svg-icons';
import Button from 'common/components/Button';

import ProjectStyle from './project.style';
import { ellipsisAddress } from 'common/utils';
import _ from 'lodash';
import reduxHelper from '../../../redux/helper';

const Project = ({ project, Icon, ...props }) => {
  const {
    name,
    description,
    project_index,
    owner,
    socialElements,
    username,
    create_block_number,
    roundId,
  } = project;

  const projectIndex = parseInt(project_index);
  const { projectRecords, account } = props;

  const [projectRecord, setProjectRecord] = useState({})
  
  useEffect(async () => {
    const foundRecord = _.find(projectRecords, (projectRecord) => {
      return projectRecord.index === projectIndex;
    });
    setProjectRecord(foundRecord);
  }, [projectRecords]);

  const likeAccount = _.find(projectRecord.likes, (like) => {
    return like === account;
  });

  const onLikeClicked = async () => {
    console.log('onLikeClicked');
    const cloudbase = (await import('@cloudbase/js-sdk')).default;
    const app = cloudbase.init({
      env: 'quadratic-funding-1edc914e16f235',
      region: 'ap-guangzhou'
    });

    const result = await app.callFunction({
      name: 'like',
      data: {
        projectIndex,
        address: account,
        isLike: _.isNil(likeAccount)
      }
    });

    reduxHelper.getProjects();
  }

  let likeText = "Like";
  if (projectRecord && !_.isEmpty(projectRecord.likes)) {
    if (projectRecord.likes.length === 1){
      likeText = `${projectRecord.likes.length} Like`;
    } else {
      likeText = `${projectRecord.likes.length} Likes`;
    }
  }

  return (
    <ProjectStyle {...props}>
      
        <div>
          <Link href={{ pathname: `/detail/${project_index}`, query: { rid: roundId } }}>
            <div>
              <span className="title">{name}</span>
              <span className="description">{description}</span>
            </div>
          </Link>
          <div className="identity">
            <div className="infomation">
              {/* <image className="photo"></image> */}
              {Icon}
              <div style={{ textAlign: 'left' }}>
                <span className="username">{`Username: ${
                  username || ellipsisAddress(owner)
                }`}</span>
                <span className="created">
                  Created at block #{create_block_number}
                </span>
              </div>
            </div>

            <span className="creator">{socialElements}</span>

            <div className="buttons">
              <Button
                type="button"
                icon={<FontAwesomeIcon color={ likeAccount ? 'red' : 'white' } icon={faThumbsUp}></FontAwesomeIcon>}
                title={likeText}
                onClick = {onLikeClicked}
              />
              <Button
                className="button"
                type="button"
                icon={<FontAwesomeIcon icon={faStar}></FontAwesomeIcon>}
                title="Favorite"
              />
            </div>
          </div>
        </div>
    </ProjectStyle>
  );
};

const mapStateToProps = (state) => ({
  projectRecords: state.projects,
  account: state.account,
});

export default connect(mapStateToProps)(Project);
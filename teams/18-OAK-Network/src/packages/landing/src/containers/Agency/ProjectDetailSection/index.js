import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';
import { Row, Col, Spin } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faDiscord,
  faTelegram,
  faGithubSquare,
} from '@fortawesome/free-brands-svg-icons';

import Container from 'common/components/UI/Container';
import LineCharts from 'common/components/LineCharts';
import ButtonLike from 'common/components/ButtonLike';
import { PolkadotContext } from 'common/contexts/PolkadotContext';
import { ellipsisAddress } from 'common/utils';
import reduxHelper from '../../../redux/helper';
import backend from '../../../common/backend';
import notificationHelper from '../../../common/utils/notification.helper';
import ProjectDetailWrapper from './projectDetailSection.style';

import member1 from 'common/assets/image/person/1.png';
import member2 from 'common/assets/image/person/2.png';
import member3 from 'common/assets/image/person/3.png';

const ProjectDetailSection = ({ projectRecords, account, rid }) => {
  const polkadotContext = useContext(PolkadotContext);
  const [loading, setLoading] = useState(true);
  const [projectDetail, setProjectDetail] = useState({});
  const [projectRecord, setProjectRecord] = useState({});

  useEffect(async () => {
    if (!_.isEmpty(polkadotContext)) {
      setLoading(false);
      setProjectDetail(polkadotContext.projectDetail);
    }
    if (!polkadotContext.projectDetail) {
      return;
    }
    const projectIndex = parseInt(polkadotContext.projectDetail.project_index);
    const foundRecord = _.find(projectRecords, (projectRecord) => {
      return projectRecord.index === projectIndex;
    });

    setProjectRecord(foundRecord);
  }, [projectRecords, polkadotContext.projectDetail]);

  const isLiked = !_.isUndefined(
    _.find(projectRecord && projectRecord.likes, (item) => {
      return item === account;
    })
  );

  const onLikeClicked = async () => {
    if (_.isEmpty(account)) {
      notificationHelper.showNoWalletNotification();
      return;
    }

    if (!polkadotContext.projectDetail) {
      return;
    }
    const projectIndex = parseInt(polkadotContext.projectDetail.project_index);
    await backend.getApp().callFunction({
      name: 'like',
      data: {
        projectIndex,
        address: account,
        isLike: !isLiked,
      },
    });

    reduxHelper.getProjects();
  };

  const socialMedias = [faTwitter, faDiscord, faTelegram, faGithubSquare];

  const teamMembers = [
    {
      name: 'Kyle Broflovski',
      role: 'Core Rust developer',
      img: member1,
    },
    {
      name: 'Stan Marsh',
      role: 'Chief UI Designer',
      img: member2,
    },
    {
      name: 'Eric Cartman',
      role: 'Chief Entertainment Officer',
      img: member3,
    },
  ];

  return (
    <ProjectDetailWrapper>
      <Container>
        {loading ? (
          <Spin size="large"></Spin>
        ) : (
          <>
            <Row className="title">
              <h2>Project Details</h2>
              <ButtonLike
                likeCount={
                  projectRecord &&
                  projectRecord.likes &&
                  projectRecord.likes.length
                }
                isLiked={isLiked}
                onClick={onLikeClicked}
              />
            </Row>

            <Row className="content">
              <Col span={24}>
                <span>Created by</span>
              </Col>
              <Col span={24}>
                <span>
                  {projectDetail.username ||
                    ellipsisAddress(projectDetail.owner)}{' '}
                  at block #{projectDetail.create_block_number}
                  <a
                    style={{ marginLeft: '30px' }}
                    href={`https://polkadot.subscan.io/account/${projectDetail.owner}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on Subscan
                  </a>
                </span>
              </Col>
              <Col span={24}>
                <span>{projectDetail.description}</span>
              </Col>
            </Row>
            <Row className="social-media">
              {_.map(socialMedias, (item, index) => (
                <FontAwesomeIcon
                  key={`social-media-${index}`}
                  icon={item}
                  size="lg"
                ></FontAwesomeIcon>
              ))}
            </Row>
            <Row className="charts">
              <Col span={24}>
                <h2>Contribution Chart</h2>
              </Col>

              <Col span={24}>
                <LineCharts className="chart" rid={rid} />
              </Col>
            </Row>

            <Row className="team-members">
              <Col span={24}>
                <h2>Team Members</h2>
              </Col>
              <Col span={24}>
                <Row>
                  {_.map(teamMembers, (item, index) => (
                    <Col span={8} key={`team-member-${index}`}>
                      <Row align="middle">
                        <Col span={8}>
                          <div
                            className="member-profile"
                            style={{ backgroundImage: `url(${item.img})` }}
                          ></div>
                        </Col>
                        <Col span={16}>
                          <Row>
                            <Col span={24} className="member-name">
                              <span>{item.name}</span>
                            </Col>
                            <Col span={24} className="member-role">
                              <span>{item.role}</span>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </ProjectDetailWrapper>
  );
};

const mapStateToProps = (state) => ({
  projectRecords: state.projects,
  account: state.account,
});

export default connect(mapStateToProps)(ProjectDetailSection);

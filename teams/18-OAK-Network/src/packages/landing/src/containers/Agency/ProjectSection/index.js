import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH, faSearch } from '@fortawesome/pro-light-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Identicon from '@polkadot/react-identicon';

import _ from 'lodash';
import { Row, Col, Spin, Select } from 'antd';
import Box from 'common/components/Box';
import Button from 'common/components/Button';
import Input from 'common/components/Input';
import FeatureBlock from 'common/components/FeatureBlock';
import Container from 'common/components/UI/Container';
import Heading from 'common/components/Heading';
import Text from 'common/components/Text';
import { PolkadotContext } from 'common/contexts/PolkadotContext';
import ProjectSectionWrapper from './projectSection.style';

const SECOND_PER_BLOCK = 3;

const { Option } = Select;

const ProjectSection = ({
  row,
  col,
  sectionHeader,
  sectionTitle,
  sectionSubTitle,
  iconStyle,
  contentStyle,
  blockWrapperStyle,
}) => {
  const polkadotContext = useContext(PolkadotContext);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [roundProjects, setRoundProjects] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [roundId, setRoundId] = useState(null);
  const [roundTitle, setRoundTitle] = useState('There are no active rounds');

  const convertBlocksToTimeText = (blockNumbers) => {
    const secondsInBlocks = blockNumbers * SECOND_PER_BLOCK;
    const days = Math.floor(secondsInBlocks / 86400); // 60* 60 * 24
    const hours = Math.floor(secondsInBlocks / 3600) - days * 24;
    const minutes = Math.floor(secondsInBlocks / 60) - (days * 24 + hours) * 60;
    const seconds = secondsInBlocks - ((days * 24 + hours) * 60 + minutes) * 60;
    let timeText = `${days} days ${hours} hours ${minutes} minutes ${seconds} seseconds`;

    return timeText;
  };

  useEffect(() => {
    if (!_.isEmpty(polkadotContext)) {
      setLoading(false);
      const { blockNumber } = polkadotContext;

      let activeRound = {};
      let nextRound = {};

      _.forEach(rounds, (round) => {
        const { start, end } = round;
        const startBlockNumber = Number(start.replaceAll(',', ''));
        const endBlockNumber = Number(end.replaceAll(',', ''));
        if (blockNumber >= startBlockNumber && blockNumber <= endBlockNumber) {
          activeRound = round;
        }
        if (blockNumber < startBlockNumber) {
          nextRound = round;
          return false;
        }
      });

      const round = activeRound || nextRound;
      if (!_.isEmpty(round)) {
        setRoundId(round.id);
      } else if (!_.isEmpty(rounds)) {
        const { length } = rounds;
        setRoundId(length - 1);
      }
      setRounds(polkadotContext.rounds);
      setProjects(polkadotContext.projects);
    }
  }, [polkadotContext.rounds, rounds]);

  useEffect(() => {
    if (roundId !== null && !_.isEmpty(rounds) && !_.isEmpty(projects)) {
      const round = rounds[roundId];
      const { grants } = round;
      const newProjects = [];
      _.forEach(grants, (grant) => {
        newProjects.push({
          ...grant,
          ...projects[Number(grant.project_index)],
        });
      });
      setRoundProjects(newProjects);

      const { blockNumber } = polkadotContext;
      const activeRound = round;
      let nextRound = {};
      if (roundId + 1 < rounds.length) {
        nextRound = rounds[roundId + 1];
      }

      const startBlockNumber = Number(activeRound.start.replaceAll(',', ''));
      const endBlockNumber = Number(activeRound.end.replaceAll(',', ''));
      if (blockNumber >= startBlockNumber && blockNumber <= endBlockNumber) {
        setRoundTitle(
          `Round #${activeRound.id + 1} ends in ${convertBlocksToTimeText(
            endBlockNumber - blockNumber
          )}`
        );
      } else if (blockNumber < startBlockNumber) {
        setRoundTitle(
          `Round #${activeRound.id + 1} will start in ${convertBlocksToTimeText(
            startBlockNumber - blockNumber
          )}`
        );
      } else if (!_.isEmpty(nextRound)) {
        const nextStartBlockNumber = Number(
          nextRound.start.replaceAll(',', '')
        );
        if (blockNumber < nextStartBlockNumber) {
          setRoundTitle(
            `Round #${
              activeRound.id + 1
            } will start in ${convertBlocksToTimeText(
              nextStartBlockNumber - blockNumber
            )}`
          );
        } else {
          setRoundTitle(`Round #${activeRound.id + 1} is ended`);
        }
      }
    }
  }, [roundId, projects, polkadotContext.blockNumber]);

  return (
    <ProjectSectionWrapper id="teamSection">
      <Container>
        {loading ? (
          <Spin size="large" />
        ) : (
          <>
            <Box {...sectionHeader}>
              <Text {...sectionSubTitle} />
              <Heading {...sectionTitle} content={roundTitle} />
            </Box>

            <div className="operation">
              <div>
                <Button
                  type="button"
                  icon={<FontAwesomeIcon icon={faSlidersH}></FontAwesomeIcon>}
                  title="Sort By"
                />

                <div style={{ marginLeft: 30 }}>
                  <Button
                    type="button"
                    icon={<FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>}
                    title="Filter"
                  />
                </div>
              </div>

              <Input
                icon={<FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>}
                isMaterial={false}
                placeholder="Search"
              />
            </div>

            {roundId !== null && (
              <div style={{ marginBottom: '30px' }}>
                Round:
                <Select
                  defaultValue={roundId + 1}
                  style={{ width: 300 }}
                  onChange={(value) => setRoundId(Number(value) - 1)}
                >
                  {_.map(rounds, (item) => {
                    return (
                      <Option key={item.id + 1} value={item.id + 1}>
                        Round #{item.id + 1}
                      </Option>
                    );
                  })}
                </Select>
              </div>
            )}

            <Row {...row} gutter={36}>
              {roundProjects.map((project, index) => {
                return (
                  <Col
                    {...col}
                    span={8}
                    key={`project-${index}`}
                    style={{ marginBottom: '36px' }}
                  >
                    <FeatureBlock
                      style={{
                        border: '1px solid rgb(241, 244, 246)',
                        borderRadius: 5,
                        transition: 'all 0.3s ease 0s',
                      }}
                      icon={
                        <Identicon
                          value={project.owner}
                          size={75}
                          theme="polkadot"
                        />
                      }
                      wrapperStyle={blockWrapperStyle}
                      iconStyle={iconStyle}
                      contentStyle={contentStyle}
                      project={{ ...project, roundId }}
                      title={project.name}
                    />
                  </Col>
                );
              })}
            </Row>
          </>
        )}
      </Container>
    </ProjectSectionWrapper>
  );
};

// ProjectSection style props
ProjectSection.defaultProps = {
  // section header default style
  sectionHeader: {
    mb: ['40px', '56px'],
  },
  // sub section default style
  sectionSubTitle: {
    content: 'ACTIVE PROJECTS',
    as: 'span',
    display: 'block',
    textAlign: 'center',
    fontSize: '14px',
    letterSpacing: '0.15em',
    fontWeight: '700',
    color: '#10ac84',
    mb: '10px',
  },
  // section title default style
  sectionTitle: {
    content: 'All active project in this round',
    textAlign: 'center',
    fontSize: ['20px', '24px'],
    fontWeight: '400',
    color: '#0f2137',
    letterSpacing: '-0.025em',
    mb: '0',
  },
  // feature row default style
  row: {},
  // feature col default style
  col: {
    width: [1, 1 / 2, 1 / 2, 1 / 3],
  },
  // feature block wrapper default style
  blockWrapperStyle: {
    p: ['30px', '20px', '30px', '40px'],
  },
  // feature icon default style
  iconStyle: {
    width: '75px',
    height: '75px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  // feature content default style
  contentStyle: {
    textAlign: 'center',
  },
  // feature title default style
  featureTitle: {
    fontSize: ['18px', '20px'],
    fontWeight: '400',
    color: '#0f2137',
    lineHeight: '1.5',
    mb: ['10px', '10px', '10px', '20px'],
    letterSpacing: '-0.020em',
  },
  // feature description default style
  featureDescription: {
    fontSize: '15px',
    lineHeight: '1.75',
    color: '#343d48cc',
  },
};

export default ProjectSection;

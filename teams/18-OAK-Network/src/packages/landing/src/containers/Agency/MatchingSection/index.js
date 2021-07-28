import _ from 'lodash';
import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { InputNumber, Spin, notification } from 'antd';
import Button from 'common/components/Button';
import Container from 'common/components/UI/Container';
import { PolkadotContext } from 'common/contexts/PolkadotContext';
import notificationHelper from 'common/utils/notification.helper';
import { unitToNumber, getMatching, formatNumberThousands } from 'common/utils';
import backend from 'common/backend';
import MatchingCarousel from './matchingCarousel';
import config from '../../../config';
import MatchingWrapper from './matchingSection.style';
import { getWeb3Api } from 'common/utils';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';

const { oak } = config;

const MatchingSection = ({ rid, account, onVote }) => {
  const polkadotContext = useContext(PolkadotContext);

  const [loading, setLoading] = useState(true);
  const [round, setRound] = useState({});
  const [projectDetail, setProjectDetail] = useState({});
  const [contributions, setContributions] = useState([]);
  const [totalMatching, setTotalMatching] = useState(0);
  const [voteAmount, setVoteAmount] = useState(10);
  const [isVoting, setIsVoting] = useState(false);

  const getMatchingFund = (matching) => {
    const fund = _.isEmpty(round) ? 0 : unitToNumber(round.matching_fund);
    return totalMatching ? ((matching / totalMatching) * fund).toFixed(4) : 0;
  };

  useEffect(() => {
    if (!_.isEmpty(polkadotContext)) {
      setLoading(false);
      setRound(polkadotContext.rounds[rid] || {});
      setProjectDetail(polkadotContext.projectDetail || {});

      const newContributions = [];
      _.forEach(polkadotContext.projectDetail.contributions, (item, index) => {
        newContributions.push({ ...item, index });
      });
      setContributions(newContributions);
    }
  }, [
    polkadotContext.projectDetail,
    polkadotContext.projectDetail.contributions,
  ]);

  useEffect(() => {
    let totalMatchingAmount = 0;
    _.forEach(round.grants, (item) => {
      totalMatchingAmount += item.matching;
    });

    setTotalMatching(totalMatchingAmount);
  }, [contributions]);

  const onParticipateClicked = async () => {
    if (_.isEmpty(account)) {
      notificationHelper.showNoWalletNotification();
      return;
    }

    setIsVoting(true);

    try {
      const { web3FromAddress, web3Enable } = await import(
        '@polkadot/extension-dapp'
      );
      await web3Enable('quadratic-funding-webapp');

      const injector = await web3FromAddress(account);
      const projectIndex = parseInt(
        polkadotContext.projectDetail.project_index
      );
      const roundIndex = parseInt(rid);

      const api = await getWeb3Api();
      const extrinsic = api.tx.quadraticFunding.contribute(
        projectIndex,
        voteAmount * 10 ** 10
      );
      extrinsic
        .signAndSend(account, { signer: injector.signer }, async (status) => {
          if (status.status.isBroadcast) {
            notification.open({
              message: 'Processing',
              description: `Your vote is processing.`,
              top: 100,
            });
          }

          if (!status.isFinalized) {
            return;
          }

          await backend.getApp().callFunction({
            name: 'vote',
            data: {
              address: account,
              roundIndex,
              projectIndex,
              amount: voteAmount,
            },
          });

          notification.open({
            message: 'Vote successfully!',
            description: `Your ${voteAmount} OAK vote has been successful. Thanks!`,
            top: 100,
          });

          setIsVoting(false);
          onVote();
        })
        .catch(() => {
          setIsVoting(false);
        });
    } catch (error) {
      setIsVoting(false);
      notification.open({
        message: 'Vote failed!',
        description: `Your ${voteAmount} OAK vote has been failed!`,
        top: 100,
      });
      return;
    }
  };

  const totalContributionValue = _.reduce(
    contributions,
    (prev, contribution) => {
      return prev + unitToNumber(contribution.value);
    },
    0
  );

  const calculateGrantMatchings = (grants) => {
    const matchings = [];
    _.forEach(grants, (grant) => {
      const { contributions } = grant;
      const matching = getMatching(contributions);
      matchings.push(matching);
    });
    return matchings;
  };

  const voteToGrant = (grant, address, amount) => {
    const foundContribution = _.find(grant.contributions, (contribution) => {
      return contribution.account_id === address;
    });
    if (foundContribution) {
      const oldAmount = unitToNumber(foundContribution.value);
      foundContribution.value = `${oldAmount + amount} OAK`;
    } else {
      grant.contributions.push({
        account_id: address,
        value: `${amount} OAK`,
      });
    }
  };

  const getEstimatedMatching = (address, voteAmount) => {
    if (_.isEmpty(round)) {
      return 0;
    }

    const projectIndex = parseInt(polkadotContext.projectDetail.project_index);

    //  calculate old matching
    const { grants } = round;
    const oldMatchings = calculateGrantMatchings(grants);

    // Vote and calculate new matching
    const newGrants = _.cloneDeep(grants);
    const foundGrantIndex = _.findIndex(newGrants, (grant) => {
      return grant.project_index === projectIndex.toString();
    });
    voteToGrant(newGrants[foundGrantIndex], address, voteAmount);
    const newMatchings = calculateGrantMatchings(newGrants);
    const estimatedMatching =
      ((newMatchings[foundGrantIndex] - oldMatchings[foundGrantIndex]) /
        totalMatching) *
      unitToNumber(round.matching_fund);
    return estimatedMatching;
  };

  return (
    <MatchingWrapper>
      <Container>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Row gutter={{ xs: 12, lg: 36 }}>
            <Col xs={24} lg={12}>
              <div className="block basic-info">
                <div className="count-down">
                  <span className="title">{projectDetail.name}</span>
                  <span className="count-down-text">
                    {projectDetail.description}
                  </span>
                </div>
                <Row style={{ marginBottom: '1rem' }}>
                  <Col>
                    <span>
                      + {formatNumberThousands(totalContributionValue)}{' '}
                      {oak.symbol} contribution from{' '}
                      {formatNumberThousands(contributions.length)} contributors
                    </span>
                  </Col>
                  <Col>
                    <span>
                      +{' '}
                      {formatNumberThousands(
                        getMatchingFund(projectDetail.matching)
                      )}{' '}
                      {oak.symbol} match
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Row>
                      <Col span={16}>
                        <InputNumber
                          style={{
                            height: '3rem',
                            lineHeight: '3rem',
                            width: '80%',
                            marginRight: '1rem',
                            fontSize: '1.2rem',
                          }}
                          size="large"
                          min={1}
                          max={9999}
                          defaultValue={10}
                          value={voteAmount}
                          onChange={(value) => {
                            setVoteAmount(value);
                          }}
                        />
                        <span style={{ marginLeft: 5 }}>OAK</span>
                      </Col>
                      <Col span={8} style={{ textAlign: 'right' }}>
                        <Button
                          type="button"
                          isLoading={isVoting}
                          style={{
                            height: '3rem',
                            lineHeight: '3rem',
                            fontSize: '1.2rem',
                          }}
                          title="Participate"
                          onClick={onParticipateClicked}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24} style={{ marginTop: '1rem' }}>
                    <span>Estimated matching: </span>
                    <span style={{ marginRight: 20, color: 'black' }}>
                      {formatNumberThousands(
                        getEstimatedMatching(account, voteAmount)
                      )}{' '}
                      OAK
                    </span>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col xs={24} lg={12}>
              <div className="carousell">
                <MatchingCarousel />
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </MatchingWrapper>
  );
};

MatchingSection.propTypes = {
  title: PropTypes.object,
  btnStyle: PropTypes.object,
  description: PropTypes.object,
  contentStyle: PropTypes.object,
  discountText: PropTypes.object,
  discountAmount: PropTypes.object,
  outlineBtnStyle: PropTypes.object,
};

MatchingSection.defaultProps = {
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: '-15px',
    mr: '-15px',
    alignItems: 'center',
  },
  col: {
    pr: '15px',
    pl: '15px',
    width: ['100%', '70%', '60%', '50%'],
  },
  title: {
    fontSize: ['26px', '34px', '42px', '55px'],
    fontWeight: '300',
    color: '#0f2137',
    letterSpacing: '-0.025em',
    mb: ['20px', '25px'],
    lineHeight: '1.31',
  },
  description: {
    fontSize: '16px',
    color: '#343d48cc',
    lineHeight: '2.1',
    mb: '0',
  },
  btnStyle: {
    minWidth: ['120px', '156px'],
    fontSize: '14px',
    fontWeight: '500',
  },
  outlineBtnStyle: {
    minWidth: ['130px', '156px'],
    fontSize: '14px',
    fontWeight: '500',
    color: '#0f2137',
    p: '5px 10px',
  },
  discountAmount: {
    fontSize: '14px',
    color: '#10AC84',
    mb: 0,
    as: 'span',
    mr: '0.4em',
  },
  discountText: {
    fontSize: '14px',
    color: '#0f2137',
    mb: 0,
    as: 'span',
  },
};

const mapStateToProps = (state) => ({
  account: state.account,
});

export default connect(mapStateToProps)(MatchingSection);

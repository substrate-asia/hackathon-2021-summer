import React, { useState, useEffect, useContext } from 'react';
import _ from 'lodash';

import QuadraticFunding from '../../quadraticFunding';
import { unitToNumber } from 'common/utils';

export const PolkadotContext = React.createContext({});

const PolkadotProvider = ({ children, projectId, roundId }) => {
  const [quadraticFunding, setQuadraticFunding] = useState(null);
  const [blockNumber, setBlockNumber] = useState(0);
  const [projects, setProjects] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [projectDetail, setProjectDetail] = useState({});

  // Init quadraticFunding api
  const initQuadraticFunding = async () => {
    const og = new QuadraticFunding();
    await og.init();
    console.log('initQuadraticFunding!!!!!!!, og: ', og);
    setQuadraticFunding(og);
  };

  // Get the project owner's identity information
  const getIdentity = async (projects) => {
    const promises = [];
    _.forEach(projects, (project) => {
      const { owner } = project;
      promises.push(quadraticFunding.getIdentity(owner));
    });

    const results = await Promise.all(promises);

    const newProjects = [];
    _.forEach(results, (item, index) => {
      if (!_.isEmpty(item.toHuman())) {
        const username =
          item.toHuman().info.display.Raw || projects[index].owner;
        newProjects.push({ ...projects[index], username });
      } else {
        newProjects.push(projects[index]);
      }
    });
    setProjects(newProjects);
  };

  // Get all projects information
  const getProjects = async () => {
    const count = await quadraticFunding.getProjectCount();
    const promises = [];
    for (let index = 0; index < count; index += 1) {
      promises.push(quadraticFunding.getProjectInfo(index));
    }

    const results = await Promise.all(promises);

    const newProjects = [];
    _.forEach(results, (item, index) => {
      newProjects.push({ ...item.toHuman(), id: index });
    });
    console.log('newProjects: ', newProjects);
    setProjects(newProjects);

    // await getIdentity(newProjects);
  };

  // Get all rounds information
  const getRounds = async () => {
    const count = await quadraticFunding.getGrantRoundCount();
    const promises = [];
    for (let index = 0; index < count; index += 1) {
      promises.push(quadraticFunding.getGrantRoundInfo(index));
    }

    const results = await Promise.all(promises);

    const newRounds = [];
    _.forEach(results, (item, index) => {
      const round = item.toHuman();
      const { grants } = round;
      let newGrants = [];
      _.forEach(grants, (grant) => {
        const { contributions } = grant;
        const matching = getMatching(contributions);

        newGrants.push({ ...grant, matching });
      });

      newRounds.push({
        ...round,
        grants: newGrants,
        id: index,
        matchingFund: unitToNumber(round.matching_fund),
      });
    });
    setRounds(newRounds);
  };

  // Get grant matching amount
  const getMatching = (contributions) => {
    let sqrtValue = 0;
    _.forEach(contributions, (item) => {
      const value = unitToNumber(item.value);
      sqrtValue += Math.sqrt(value);
    });

    return sqrtValue ** 2;
  };

  useEffect(() => {
    if (!quadraticFunding) {
      initQuadraticFunding();
    }
  }, []);

  useEffect(() => {
    if (quadraticFunding) {
      // Substribe the latest block number
      quadraticFunding.api.rpc.chain.subscribeNewHeads((header) => {
        setBlockNumber(Number(header.number));
      });

      getProjects();
      getRounds();
    }
  }, [quadraticFunding]);

  // Get specific round's project contribute information
  useEffect(() => {
    if (projectId && roundId && !_.isEmpty(rounds) && !_.isEmpty(projects)) {
      const round = _.find(
        rounds,
        (item) => Number(item.id) === Number(roundId)
      );
      const project = _.find(
        projects,
        (item) => Number(item.id) === Number(projectId)
      );

      const { grants } = round;
      const grant = _.find(
        grants,
        (item) => Number(item.project_index) === Number(projectId)
      );

      setProjectDetail({ ...project, ...grant });
    }
  }, [rounds, projects]);

  return (
    <PolkadotContext.Provider
      value={{ quadraticFunding, projects, rounds, blockNumber, projectDetail }}
    >
      {children}
    </PolkadotContext.Provider>
  );
};

export default PolkadotProvider;

import React from 'react';
import { FC } from 'react';
import styled from 'styled-components';
import Contracts from './Contracts';
import { Grid } from 'semantic-ui-react';
import Endpoints from './Endpoints';
import Accounts from './Accounts';

const Home: FC<{ className?: string }> = ({ className }) => {

  return (
    <div className={className}>
      <Grid columns={2} stackable>
        <Grid.Column width={10}>
          <Contracts />
        </Grid.Column>
        <Grid.Column width={6}>
          <div className="right-side">
            <Endpoints />
            <Accounts />
          </div>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default styled(Home)`
  padding: 20px;
  
`;
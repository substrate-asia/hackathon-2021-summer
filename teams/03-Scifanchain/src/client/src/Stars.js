import React, { useEffect, useState, createRef } from 'react';

import { Container, Segment, Header, Icon, Button, Dimmer, Loader, Grid, Sticky, Message } from 'semantic-ui-react';

import MenuLeft from './widget/Menus';
import StageList from './story/StageList';

const contextRef = createRef();

function Home() {
  return (
    <Container style={{padding: '1rem', paddingTop: 0}} fluid>
      <Segment placeholder>
        <Header icon>
          <Icon name='star outline' />
          当一个人意识到宇宙与他内在的生命之间有种隐秘的联系，他就能容易认清他所在星球的真相，为这个牢笼对生命的禁锢不甘。 
          <br />当你拥有一个内在王国，外在的星空也会属于你。
          <br />总有一天，你会以给星球命名的方式，为自己选择归宿。
        </Header>
       
        <Button color='purple'>展示你的星球吧</Button>
      </Segment>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <MenuLeft />
          </Grid.Column>
          <Grid.Column width={9}>
            <StageList />
          </Grid.Column>
          <Grid.Column width={4}>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default Home
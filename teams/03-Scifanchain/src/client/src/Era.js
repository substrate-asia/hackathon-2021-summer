import React, { useEffect, useState, createRef } from 'react';

import { Container, Segment, Progress, Grid, Sticky, Message } from 'semantic-ui-react';

import MenuLeft from './widget/Menus';
import StageList from './story/StageList';

const contextRef = createRef();

function Home() {
  return (
    <Container style={{padding: '1rem', paddingTop: 0}} fluid>
      <Segment >
        <Progress percent={38}  progress color='purple'>
          星球能源可持续性技术
        </Progress>
        <Progress percent={50}  progress success>
          星际旅行技术的演进
        </Progress>
        <Progress percent={82}  progress warning>
          超远程信息传输
        </Progress>
        <Progress percent={40}  progress error>
          人类合作能力
        </Progress>
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
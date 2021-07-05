import React, { useEffect, useState, createRef } from 'react';

import { Container, Segment, Grid, Card, Message } from 'semantic-ui-react';

import MenuLeft from './widget/Menus';
import StageList from './story/StageList';

const contextRef = createRef();

function Home() {
  return (
    <Container fluid style={{padding: '1rem', paddingTop: 0}}>
      <Segment inverted color='red' tertiary>
        加入远征拓展舰队，在科幻各领域开疆拓土。
      </Segment>
      <Card.Group>
        <Card>
          <Card.Content>
            <Card.Header>科幻基地</Card.Header>
            <Card.Meta>SFC-Site</Card.Meta>
            <Card.Description>
              众筹一个科幻基地，打造线下科幻主题园区。
            </Card.Description>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content>
            <Card.Header content='影视制作' />
            <Card.Meta content='SFC-Film' />
            <Card.Description content='为科幻影视提供新平台，创造新的增长点。' />
          </Card.Content>
        </Card>

        <Card>
          <Card.Content
            header='科学界'
            meta='Science'
            description='联合科学界，汇聚百科知识。'
          />
        </Card>

        <Card
          header='CG动漫NFT'
          meta='NFT'
          description='非同质数字艺术作品'
        />

        <Card
          header='科幻工业'
          meta='SFC-TEC'
          description='为高新科技工业领域注入文学和艺术表达。'
        />
       
      </Card.Group>
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
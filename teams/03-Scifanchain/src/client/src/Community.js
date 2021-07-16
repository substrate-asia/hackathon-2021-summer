import React, { useEffect, useState, createRef } from 'react';

import { Container, Segment, Statistic, Grid, Sticky, Feed, Icon } from 'semantic-ui-react';

import MenuLeft from './widget/Menus';
import StageList from './story/StageList';

const contextRef = createRef();

function Home() {
  return (
    <Container style={{padding:'1rem', paddingTop: 0}} fluid>
    <Grid>
      <Segment>
        <Statistic floated='right'>
          <Statistic.Value>2,204</Statistic.Value>
          <Statistic.Label>Views</Statistic.Label>
        </Statistic>

        <p>
            赛凡链是一个完全开放的公链，其所有权全部交给社区，一经发布，即成为社区的公共财产，不属于任何人私有。

            赛凡链采用Rust语言的Substrate框架构建，其上的应用以Rust、Python、Golang、Javascript等语言编写，任何有编程能力的开发者都可以参与到赛凡链的开发中来。

            所有的决策和管理，不管是技术层面的，还是运营层面，都由社区磋商制定相应规则来进行。
        </p>

        <p>
            开发上线后，治理权即交由社区。
        </p>

        <Statistic floated='left'>
          <Statistic.Value>2,204</Statistic.Value>
          <Statistic.Label>Views</Statistic.Label>
        </Statistic>

        <p>
          区块链的社区治理逐步进行，先由创始团队托管一段时间，当社区成熟之成，逐步移交社区。社区在发展演进中，逐步探索出合理的治理模式。
        </p>
        <p>
          社区保持全球开放性，我们欢迎各个国家、各种文化种族的科幻爱好者加入，共同建设。现阶段尤其需要具备多语言背景、熟悉编程技术和互联网文化的同行者。
        </p>
      </Segment>
      <Grid.Row>
        <Grid.Column width={3}>
          <MenuLeft />
        </Grid.Column>
        <Grid.Column width={9}>
          <StageList />
        </Grid.Column>
        <Grid.Column width={4}>
          <Feed>
            <Feed.Event>
              <Feed.Content>
                <Feed.Summary>
                  <Feed.User>Elliot Fu</Feed.User> added you as a friend
                  <Feed.Date>1 Hour Ago</Feed.Date>
                </Feed.Summary>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name='like' />4 Likes
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Content>
                <Feed.Summary>
                  <a>Helen Troy</a> added <a>2 new illustrations</a>
                  <Feed.Date>4 days ago</Feed.Date>
                </Feed.Summary>
                <Feed.Extra images>
 
                </Feed.Extra>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name='like' />1 Like
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Content>
                <Feed.Summary
                  date='2 Days Ago'
                  user='Jenny Hess'
                  content='add you as a friend'
                />
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name='like' />8 Likes
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Content>
                <Feed.Summary>
                  <a>Joe Henderson</a> posted on his page
                  <Feed.Date>3 days ago</Feed.Date>
                </Feed.Summary>
                <Feed.Extra text>
                  Ours is a life of constant reruns. We're always circling back to where
                  we'd we started, then starting all over again. Even if we don't run
                  extra laps that day, we surely will come back for more of the same
                  another day soon.
                </Feed.Extra>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name='like' />5 Likes
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Content>
                <Feed.Summary>
                  <a>Justen Kitsune</a> added <a>2 new photos</a> of you
                  <Feed.Date>4 days ago</Feed.Date>
                </Feed.Summary>
                <Feed.Extra images>

                </Feed.Extra>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name='like' />
                    41 Likes
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    </Container>
  )
}

export default Home
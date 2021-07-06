import React, { useState, createRef, useEffect } from 'react';
import { Container, Dimmer, Loader, Grid, Header, Button, Message, Divider, Icon, Segment } from 'semantic-ui-react';
import { useLocation, useParams} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

import { SubstrateContextProvider, useSubstrate } from '../substrate-lib';
import { DeveloperConsole } from '../substrate-lib/components';

import ReactMarkdown from 'react-markdown';

import axios from 'axios'

import Poe from '../chain/Poe'

import StageEditor from '../widget/StageEditor';

import MenuLeft from '../widget/Menus';


function Main() {

  // React hooks for all the state variables we track.
  // Learn more at: https://reactjs.org/docs/hooks-intro.html
  const [accountAddress, setAccountAddress] = useState(null);
  const {apiState, keyring, keyringState, apiError } = useSubstrate();

  const [loading, setLoading] = useState(true);
  const [stage, setStage] = useState([])
  const [error, setError] = useState('')
  const [showEditor, setShowEditor] = useState(false)

  // 接收跳转参数
  const params = useParams();

  // 加载数据
  useEffect(() => {
    let token = window.localStorage.getItem("scifanchain_access_token")
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.get('https://api.scifanchain.com/stages/' + params.stage_id)
      .then(function (response) {
        // 处理成功情况
        setLoading(false)
        setStage(response.data)
        setError('')
        // console.log(response);
      })
      .catch(function (error) {
        // 处理错误情况
        setLoading(false)
        setStage({})
        setError('很抱歉，没有获取到数据！')
        console.log(error);
      });
  }, [])

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://api.scifanchain.com/authors/me/',
    }).then(response => {
      setLoading(false)
      console.log(accountAddress)
      // setAccountAddress(response.data.chain_address)
      // 开发环境下Alice权限
      console.log("chain_address:" + response.data.chain_address)
      setAccountAddress('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY')
    }).catch(err => {
      setLoading(false)
      setError('很抱歉，没有获取到数据！')
      console.log(err)
    });
  }, [])

  // 获取当前账户
  const accountPair =
    accountAddress &&
    keyringState === 'READY' &&
    keyring.getPair(accountAddress);
  
  const loader = text =>
    <Dimmer active>
      <Loader size='small'>{text}</Loader>
    </Dimmer>;

  const message = err =>
    <Grid centered columns={2} padded>
      <Grid.Column>
        <Message negative compact floating
          header='Error Connecting to Substrate'
          content={`${JSON.stringify(err, null, 4)}`}
        />
      </Grid.Column>
    </Grid>;

  if (apiState === 'ERROR') return message(apiError);
  else if (apiState !== 'READY') return loader('正在连接赛凡链……');

  if (keyringState !== 'READY') {
    return loader('Loading accounts (please review any extension\'s authorization)');
  }

  const onEdit = () => {
    setShowEditor(true)
  }

  const onCancel = () => {
    setShowEditor(false)
  }

  const contextRef = createRef();

  return (
    <div ref={contextRef}>
      {!loading && !error &&
      <Container ref={contextRef}>
        <Grid columns={2}>
          <Grid.Column width={4}>
            <div style={{marginBottom: '9rem'}}></div>
            <MenuLeft />
          </Grid.Column>
          <Grid.Column width={12}>
            {showEditor &&
            <div>
              <Container textAlign='right' style={{marginBottom: '1rem'}}>
                <Button.Group basic size='small'>
                  <Button icon='reply' onClick={onCancel}/>
                  <Button icon='save' />
                </Button.Group>
              </Container>
              <StageEditor stage={stage} style={{ clear: 'both' }}/>
            </div>
            }
            {!showEditor &&
              <div>
                <Poe accountPair={accountPair}/>
                <Grid.Row>
                  <Button.Group basic size='small' floated='right'>
                    <Button icon='edit' onClick={onEdit}/>
                    <Button icon='share alternate' />
                    <Button icon='download' />
                  </Button.Group>
                  <Header as="h1" id='stageTitle'>{stage.title}</Header>
                </Grid.Row>

                <Divider horizontal>
                  <Header as='h4'>
                    <Icon name='recycle' />
                    开放创作
                  </Header>
                </Divider>
                <Grid.Row>
                  <div id='stageContent' style={{ marginBottom: '2rem', textAlign: 'justify' }}>
                    <ReactMarkdown children={stage.content} />
                  </div>
                </Grid.Row>
              </div>
            }
          </Grid.Column>
        </Grid>
      </Container>
      }
      <DeveloperConsole />
    </div>
  );
}

export default function Stage() {
  return (
    <SubstrateContextProvider>
        <Main />
    </SubstrateContextProvider>
  );
}
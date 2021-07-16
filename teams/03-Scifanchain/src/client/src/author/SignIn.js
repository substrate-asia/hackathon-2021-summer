import { useHistory } from "react-router-dom";
import React, { Component, useState } from 'react'
import {Container, Grid, Form, Header, Message, Icon } from 'semantic-ui-react'
import axios from 'axios'
import qs from 'qs'
import { useRecoilState } from 'recoil';
import { usernameState} from '../StateManager'

function SignIn () {

  const history = useHistory(); 

  const [state, setState] = useState({
    username: "",
    password: "",
    dissplay_hidden: true,
  })

  function handleChange(evt) {
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
  }

  // 用户登录相关组件
  const [username, setUsername] = useRecoilState(usernameState)
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginInfo = {
      username: state.username,
      password: state.password,
      grant_type: 'password'
    }

    // 本地存储
    const storage = window.localStorage;

    axios({
      // Oauth2要求必须以表单形式提交
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      url: 'https://api.scifanchain.com/authors/token/',
      auth: {
          username: state.username,
          password: state.password
      },
      data: qs.stringify(loginInfo)
    }).then(response => {
      
      setUsername(state.username)

      // console.log(response)
      const access_token = response.data.access_token;
      axios.defaults.headers.common["Authorization"] = access_token;
      
      storage.scifanchain_username = state.username
      storage.scifanchain_access_token = access_token
      
      console.log(response.data.access_token)
      console.log(response.data.token_type)

      history.push('/space');

      // console.log(response.data.refresh_token)
    }).catch(err => {
      setState({...state,dissplay_hidden:false})
      console.log(err)
    });
  }

  return (

    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={5}>
          </Grid.Column>
          <Grid.Column width={6}>
            <Message
              attached
              header='赛凡链期待你的创造'
            />
            <Form onSubmit={handleSubmit} className='attached fluid segment'>
              <Form.Input
                placeholder='用户名'
                name='username'
                value={state.username}
                onChange={handleChange}
              />
              <Form.Input
                placeholder='密码'
                name='password'
                value={state.password}
                type='password'
                onChange={handleChange}
              />
              <Form.Button content='提交' />
            </Form>
            {!state.dissplay_hidden && 
              <Message attached='bottom' warning>
              <Icon name='help' />
              密码似乎不正确...&nbsp;<a href='#'>找回密码</a>。&nbsp;
              </Message>
            }
          </Grid.Column>
          <Grid.Column width={5}>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default SignIn
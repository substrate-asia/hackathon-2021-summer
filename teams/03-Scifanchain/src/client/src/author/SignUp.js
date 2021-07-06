import React, { useState, useEffect, createRef, useRef } from 'react'
import { Container, Dimmer, Loader, Grid, Form, Button, Message, Header, Image, Modal } from 'semantic-ui-react'
import axios from 'axios'

import { useRecoilState } from 'recoil';
import { usernameState} from '../StateManager'
import { mnemonicState} from '../StateManager'

import { useHistory } from "react-router-dom";

import { SubstrateContextProvider, useSubstrate } from '../substrate-lib';

import { mnemonicGenerate } from '@polkadot/util-crypto';
import keyring from '@polkadot/ui-keyring';

export function Main () {

  // 用户登录相关组件
  const [username, setUsername] = useRecoilState(usernameState);
  // 助记词
  const [mnemonic, setMnemonic] = useRecoilState(mnemonicState);

  // 本地存储
  const storage = window.localStorage;

  // 页面跳转
  const history = useHistory();

  const username_ref = useRef('');
  const email_ref = useRef('');
  const password_ref = useRef('');
  const password_repeat_ref = useRef('');

  const allow_username = useRef(false)
  const allow_email = useRef(false)
  const allow_password = useRef(false)
  const allow_password_repeat = useRef(false)

  const [validate_username, setValidateUsername] = useState('')
  const [validate_email, setValidateEmail] = useState('')
  const [validate_password, setValidatePassword] = useState('')
  const [validate_password_repeat, setValidatePasswordRepeat] = useState('')

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    password_repeat: "",
  })

  const [validated, setValidated] = useState(false)

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    switch (e.target.name) {
      case 'username':
        username_ref.current = e.target.value;
        validUsername();
        break;
      case 'email':
        email_ref.current = e.target.value;
        validEmail();
        break;
      case 'password':
        password_ref.current = e.target.value;
        validPassword();
        break;
      case 'password_repeat':
        password_repeat_ref.current = e.target.value;
        validPasswordRepeat();
        break;
    } 
  }

  // 验证用户名
  function validUsername () {
    if (!(/^[a-zA-Z][a-zA-Z0-9]{3,19}$/.test(username_ref.current))) {
      setValidateUsername('用户名是由英文字母和数字组成的4-20位字符，以字母开头。')
      allow_username.current = false
    }
    else{
      setValidateUsername('')
      allow_username.current = true
    }
    submitCheck();
  }

  // 验证邮箱
  function validEmail () {
    if(!(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/.test(email_ref.current))) {
      setValidateEmail('邮箱地址格式不合规范，请检查输入是否正确。')
      allow_email.current = false
    }
    else{
      setValidateEmail('')
      allow_email.current = true
    }
    submitCheck();
  }

  // 验证密码
  function validPassword () {
    if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/.test(password_ref.current))) {
      setValidatePassword('密码至少8位，至少1个大写字母，1个小写字母和1个数字。')
      allow_password.current = false
    }
    else{
      setValidatePassword('')
      allow_password.current = true
    }
    submitCheck();
  }

  // 验证密码重复
  function validPasswordRepeat () {
    if(password_ref.current !== password_repeat_ref.current) {
      setValidatePasswordRepeat('两次输入的密码不一致，请重新输入。')
      allow_password_repeat.current = false
    }
    else{
      setValidatePasswordRepeat('')
      allow_password_repeat.current = true
    }
    submitCheck();
  }

  function submitCheck () {
    if(allow_username.current && allow_email.current && allow_password.current && allow_password_repeat.current){
      setValidated(true)
    }
    else{
      setValidated(false)
    }
  }

  const handleSubmit = e => {
    e.preventDefault();

    // 创建pair
    const mnemonic = mnemonicGenerate();
    const pair = keyring.createFromUri(mnemonic, { name: state.username });
    const chain_account = keyring.saveAccount(pair, state.password)

    // console.log(chain_account)
    
    // 与其它组件共享
    setMnemonic(mnemonic)

    const authorInfo = {
      username: state.username,
      email: state.email,
      password: state.password,
      chain_address: pair.address,
    }

    axios({
      // Oauth2要求必须以表单形式提交
      // headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      // },
      headers: {
          'Content-Type': 'application/json',
      },
      method: 'POST',
      url: 'https://api.scifanchain.com/authors/create_author/',
      // data: qs.stringify(authorInfo)
      data: authorInfo
    }).then(response => {

      setUsername(username_ref.current)
      
      // console.log(response)
      const access_token = response.data.access_token;
      axios.defaults.headers.common["Authorization"] = access_token;

      storage.scifanchain_username = state.username
      storage.scifanchain_access_token = access_token

      console.log(response.data.access_token)
      console.log(response.data.token_type)
      console.log(response.data.exp)

      history.push('/sign-key');
        // console.log(response.data.refresh_token)
    }).catch(err => {
        console.log(err)
    });
  }

  return (
    <SubstrateContextProvider>
      <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={5}>
          </Grid.Column>
          <Grid.Column width={6}>
            <Message
              attached
              header='开启你的宇宙叙事'
              content='银河星旋的人类文明高度发达，数百万计的文明星球在璀璨银河生生不息，体现着创造主的荣耀。人类不断探寻宇宙的奥秘，一个又一个里程碑式的重大发现被揭示出来。'
            />
            <Form onSubmit={handleSubmit} className='attached fluid segment'>
              <Form.Input
                  placeholder='用户名'
                  name='username'
                  value={state.username}
                  onChange={handleChange}
              />
              {validate_username !== '' &&
                <Message negative>
                  <p>{validate_username}</p>
                </Message>
              }
              <Form.Input
                  placeholder='邮箱'
                  name='email'
                  value={state.email}
                  onChange={handleChange}
              />
              {validate_email !== '' &&
                <Message negative>
                  <p>{validate_email}</p>
                </Message>
              }
              <Form.Input
                  placeholder='密码'
                  name='password'
                  value={state.password}
                  type='password'
                  onChange={handleChange}
              />
              {validate_password !== '' &&
                <Message negative>
                  <p>{validate_password}</p>
                </Message>
              }
              <Form.Input
                  placeholder='重复密码'
                  name='password_repeat'
                  value={state.password_repeat}
                  type='password'
                  onChange={handleChange}
                  
              />
              {validate_password_repeat !== '' &&
                <Message negative>
                  <p>{validate_password_repeat}</p>
                </Message>
              }
                <Button fluid className={validated ? 'positive' : 'disabled'}>提交注册</Button>
              
            </Form>
          </Grid.Column>
          <Grid.Column width={5}>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
    </SubstrateContextProvider>
  ) 
}


export default function SignUp() {
  return (
    <SubstrateContextProvider>
      <Main />
    </SubstrateContextProvider>
  );
}

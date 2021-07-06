import React, { Component, useState } from 'react'
import {Container, Menu, Button, Modal, Dropdown} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import {Link} from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { usernameState} from './StateManager'

function Navigation  () {

  // 导航图标激活样式
  const [activeItem, setActiveItem] = useState('home')
  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
  }
  
  // 同步用户状态
  const [username, setUsername] = useRecoilState(usernameState)

  // 用户注销
  const handleLogout = () => { 
    window.localStorage.removeItem('scifanchain_username');
    window.localStorage.removeItem('scifanchain_access_token');
    setUsername('')
  }

  return (
    <Menu pointing >
      {/* <Image src={`${process.env.PUBLIC_URL}/assets/scifanchain_logo_black_white.png`} size='mini' /> */}
      <Menu.Item header>赛凡链</Menu.Item>
      <Menu.Item as={Link} to='/'
        name='home'
        active={activeItem === 'home'}
        content="首页"
        onClick={handleItemClick}>
      </Menu.Item>
      <Menu.Item as={Link} to='/galaxy'
        name='银河书'
        active={activeItem === '银河书'}
        onClick={handleItemClick}>
      </Menu.Item>
      <Menu.Item as={Link} to='/stars'
        name='超级星球'
        active={activeItem === '超级星球'}
        onClick={handleItemClick}>
      </Menu.Item>
      <Menu.Item as={Link} to='/era'
        name='流年'
        active={activeItem === '流年'}
        onClick={handleItemClick}>
      </Menu.Item>
      <Menu.Item as={Link} to='/expedition'
        name='远征计划'
        active={activeItem === '远征计划'}
        onClick={handleItemClick}>
      </Menu.Item>
      <Menu.Item as={Link} to='/community'
        name='星光社区'
        active={activeItem === '星光社区'}
        onClick={handleItemClick}>
      </Menu.Item>
      <Menu.Item as={Link} to='/finance'
        name='链上财政'
        active={activeItem === '链上财政'}
        onClick={handleItemClick}>
      </Menu.Item>
      <Menu.Menu position='right'>
        {username &&
          <Dropdown text={username} pointing className='link item'>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to='/space'>我的空间</Dropdown.Item>
              <Dropdown.Item as={Link} to='/wallet'>我的钱包</Dropdown.Item>
              <Dropdown.Item as={Link} to='/profile'>账号设置</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>
                  退出
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        }
        {!username &&
          <Menu.Item as={Link} to='/sign-in'
            name='登录'
            active={activeItem === '登录'}
            onClick={handleItemClick}>
          </Menu.Item>
        }
        {!username &&
          <Menu.Item as={Link} to='/sign-up'
            name='注册'
            active={activeItem === '注册'}
            onClick={handleItemClick}>
          </Menu.Item>
        }
      </Menu.Menu>
    </Menu>
  )
}

export default Navigation
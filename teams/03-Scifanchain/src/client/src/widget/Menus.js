import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class MenuLeft extends Component {
  state = {}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu vertical>
        <Menu.Item>
          <Menu.Header>素材库</Menu.Header>
          <Menu.Menu>
            <Menu.Item
              name='人物'
              active={activeItem === '人物'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='地理'
              active={activeItem === '地理'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='纪元'
              active={activeItem === '纪元'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='事件'
              active={activeItem === '事件'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
      </Menu.Item>

      <Menu.Item>
          <Menu.Header>故事列表</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name='初创'
              active={activeItem === '初创'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='焦点'
              active={activeItem === '焦点'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='待存证'
              active={activeItem === '待存证'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='已上链'
              active={activeItem === '已上链'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    )
  }
}
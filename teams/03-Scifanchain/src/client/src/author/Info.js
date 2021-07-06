import React, { useState, createContext, useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { AuthorContext } from '../Space';


function Info () {
    const author = useContext(AuthorContext)  //得到author

    return (
        <Menu vertical>
            <Menu.Item>
                <Menu.Header>我的信息</Menu.Header>
                <Menu.Menu>
                    <Menu.Item
                        name={author.username}
                    />
                    <Menu.Item
                        name={author.nickname}
                    />
                    <Menu.Item
                        name={author.email}
                    />                    
                </Menu.Menu>
            </Menu.Item>
        </Menu>
    )
}

export default Info
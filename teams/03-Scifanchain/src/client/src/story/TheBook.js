import React from 'react'
import { List, Container, Header } from 'semantic-ui-react'

const TheBook = () => (
        <List ordered>
            <List.Item as='a'>迈向银河</List.Item>
            <List.Item as='a'>银河世纪的交通概览</List.Item>
            <List.Item>
                <a>三次远征的历史</a>
                <List.List>
                    <List.Item as='a'>寻找玫瑰星盘</List.Item>
                    <List.Item as='a'>圣殿骑士团</List.Item>
                    <List.Item as='a'>意帝的涌现</List.Item>
                </List.List>
            </List.Item>
            <List.Item as='a'>行天堡和惊澜枢奥院</List.Item>
        </List>
)

export default TheBook
import React, {useEffect, useState, createRef } from 'react';

import { Container, Dimmer, Loader, Grid, Sticky, Message } from 'semantic-ui-react';

import MenuLeft from './widget/Menus';
import StageList from './story/StageList';

const contextRef = createRef();

function Home () {
    return(
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
    )
}

export default Home
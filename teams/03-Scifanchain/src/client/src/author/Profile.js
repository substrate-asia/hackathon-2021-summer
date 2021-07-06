import React, { useState, createRef } from 'react';
import { Container, Dimmer, Loader, Grid, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import { SubstrateContextProvider, useSubstrate } from '../substrate-lib';
import { DeveloperConsole } from '../substrate-lib/components';

import Wallet from './Wallet';


function Main() {
    const [accountAddress, setAccountAddress] = useState(null);
    const { apiState, keyring, keyringState, apiError } = useSubstrate();

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

    const contextRef = createRef();

    return (
        <div ref={contextRef}>
            <Container>
                <Grid stackable columns='equal'>
                    <Grid.Row stretched>
                    </Grid.Row>
                </Grid>
            </Container>
            <DeveloperConsole />
        </div>
    );
}

export default function Finance() {
    return (
        <SubstrateContextProvider>
            <Main />
        </SubstrateContextProvider>
    );
}

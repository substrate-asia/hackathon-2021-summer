// import { Keyring } from '@polkadot/keyring';
import keyring from '@polkadot/ui-keyring';
import { cryptoWaitReady, mnemonicGenerate } from '@polkadot/util-crypto';

import { Container, Dimmer, Loader, Grid, Message } from 'semantic-ui-react';
import { DeveloperConsole } from './substrate-lib/components';

import { stringToU8a, u8aToHex } from '@polkadot/util';


async function main() {

    const mnemonic = mnemonicGenerate(12);

    const accounts = keyring.getAccounts();

    accounts.forEach(({ address, meta, publicKey }) =>
        console.log(address, JSON.stringify(meta), u8aToHex(publicKey))
    );


}

main().then(() => console.log('completed'))

export default function About () {
    return (
        <main />
    )
    
}
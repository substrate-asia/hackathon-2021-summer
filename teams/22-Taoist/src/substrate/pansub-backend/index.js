const fs = require('fs');
const cors = require('cors');

const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');
const { CodePromise, ContractPromise } = require('@polkadot/api-contract');
const { cryptoWaitReady } = require('@polkadot/util-crypto');

const { create, globSource } = require('ipfs-http-client');
const IPFS = require('ipfs-core');

const express = require('express');
const busboy = require('connect-busboy');


const contractFile = './file_info_v1.0.contract';
const contractAddress = '5Eyk7qJRVNDwTUf2vXWR5Uu7L4GmcruumRK2XSrB2CgwtaDU';

let wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const endowment = 1230000000000n;
const gasLimit = 100000n * 10000000n;

async function connectChain(rpcUrl) {

    await cryptoWaitReady(); // wait for crypto initializing

    const provider = new WsProvider(rpcUrl);
    // const api = await ApiPromise.create({ provider: provider, types: { "Address": "AccountId", "LookupSource": "AccountId" } });
    const api = await ApiPromise.create({
        provider: provider, types: {
            Address: "MultiAddress",
            LookupSource: "MultiAddress"
        }
    });

    // Retrieve the chain & node information information via rpc calls
    const [chain, nodeName, nodeVersion] = await Promise.all([
        api.rpc.system.chain(),
        api.rpc.system.name(),
        api.rpc.system.version()
    ]);

    console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
    console.log("The End!!!");

    return api;
}

async function loadContract(api, abiFile, address) {
    const abi = JSON.parse(fs.readFileSync(abiFile).toString());
    const contract = new ContractPromise(api, abi, address);
    return contract;
}

async function listFilesOnChain(contract) {
    const keyring = new Keyring({ type: 'sr25519' });
    let alicePair = keyring.createFromUri('//Alice');
    let bobPair = keyring.createFromUri('//Bob');
    const { gasConsumed, result, output } = await contract.query.listFile(alicePair.address, { value: 0, gasLimit });

    console.log(result.toHuman());
    console.log(gasConsumed.toHuman());
    console.log(output.toHuman());

    if (result.isOk) {
        return output.toHuman();
    } else {
        throw Error("call contract failed!");
    }
}

async function addFileOnChain(contract, data) {
    const keyring = new Keyring({ type: 'sr25519' });
    let alicePair = keyring.createFromUri('//Alice');
    let bobPair = keyring.createFromUri('//Bob');

    let uploader = data.uploader;
    let name = data.name;
    let size = data.size;
    let hash = data.hash;
    let meta = data.meta;

    const unsub = await contract.tx
        .addFile({ value: 0, gasLimit: -1 }, uploader, name, size, hash, meta)
        .signAndSend(alicePair, (result) => {
            if (result.status.isInBlock || result.status.isFinalized) {
                console.log("result", result);
                if (!!result.dispatchError) {
                    console.log('isBadOrigin is ', result.dispatchError.isBadOrigin);
                    console.log('isOther is ', result.dispatchError.isOther);
                    console.log('isModule is ', result.dispatchError.isModule);
                } else {
                    console.log('add file success ', uploader, name);
                }
                unsub();
            }
        });
    // await wait(5000);
}

async function fileInfoOnChain(contract, hash) {
    const keyring = new Keyring({ type: 'sr25519' });
    let alicePair = keyring.createFromUri('//Alice');
    let bobPair = keyring.createFromUri('//Bob');

    const { gasConsumed, result, output } = await contract.query.queryFileByHash(alicePair.address, { value: 0, gasLimit }, hash);

    console.log(result.toHuman());
    console.log(gasConsumed.toHuman());
    console.log(output.toHuman());

    if (result.isOk) {
        return output.toHuman();
    } else {
        throw Error("call contract failed!");
    }
}

async function userFilesOnChain(contract, uploader) {
    const keyring = new Keyring({ type: 'sr25519' });
    let alicePair = keyring.createFromUri('//Alice');
    let bobPair = keyring.createFromUri('//Bob');
    const { gasConsumed, result, output } = await contract.query.queryFileByUploader(alicePair.address, { value: 0, gasLimit }, uploader);

    console.log(result.toHuman());
    console.log(gasConsumed.toHuman());
    console.log(output.toHuman());

    if (result.isOk) {
        return output.toHuman();
    } else {
        throw Error("call contract failed!");
    }
}


async function main() {

    // connect to chain
    const api = await connectChain('ws://47.243.69.75:9944');
    const contract = await loadContract(api, contractFile, contractAddress);

    // connect to ipfs
    const ipfsCli = await IPFS.create();

    // connect torrent network 
    // TODO


    // launch web server
    const app = express();
    const port = 4000;

    app.use(cors()); // cors
    app.use(busboy()); // upload file

    app.get('/listfiles', async (req, res) => {
        let list = await listFilesOnChain(contract);
        res.send(JSON.stringify({ status: 'ok', data: list }));
    })

    app.get('/userfiles/:accountId', async (req, res) => {
        let accountId = req.params.accountId;
        let list = await userFilesOnChain(contract, accountId);
        res.send(JSON.stringify({ status: 'ok', data: list }));
    })

    app.get('/fileinfo/:hash', async (req, res) => {
        let hash = req.params.hash;
        let list = await fileInfoOnChain(contract, hash);
        res.send(JSON.stringify({ status: 'ok', data: list }));
    })

    app.post('/upload', function (req, res) {

        // console.log(req);

        var fields = new Map();
        req.busboy.on('field', function (n, v) {
            fields.set(n, v);
        });

        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            var fstream = fs.createWriteStream('./datastore/' + filename);
            file.pipe(fstream);
            fstream.on('close', async function () {
                if (! 'uploader' in fields) {
                    res.send(JSON.stringify({ status: 'error', data: "missing param: uploader" }))
                }

                const { cid } = await ipfsCli.add(globSource('./datastore/' + filename));
                const key = cid.toString();
                const size = fs.statSync('./datastore/' + filename).size;
                const uploader = fields.uploader;

                let data = {
                    uploader: api.createType("AccountId", uploader), // fixme: need get account from client
                    name: filename,
                    hash: api.createType("Hash", key),
                    size: api.createType("u64", size),
                    meta: [], // fixme: to add more information.
                }

                console.log('data', data);

                await addFileOnChain(contract, data);// add file info on chain, [fixme]

                res.send(JSON.stringify({ status: 'ok', data: { 'cid': key } }));
            });
        });
    });

    app.listen(port, () => {
        console.log(`Backend listening at http://localhost:${port}`);
    })
}

main();

// main().catch(console.error).finally(() => process.exit());
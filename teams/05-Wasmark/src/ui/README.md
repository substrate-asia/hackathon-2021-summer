 RPC-CORE: submitAndWatchExtrinsic(extrinsic: Extrinsic): ExtrinsicStatus:: 1014: Priority is too low: (201077685142 vs 201077684845): The transaction has too low priority to replace another 

 
  const onStart = useCallback(async () => {
    console.log(mergedExtrinsics);
    const { tokenDecimals } = await api.rpc.system.properties();
    const decimals = tokenDecimals.toHuman() as string[];
    const decimal = parseInt(decimals[0]);

    Object.keys(mergedExtrinsics).forEach(codeHash => {
      const extrinsics = mergedExtrinsics[codeHash];
      
      if (!extrinsics?.sender) {
        return;
      }

      const code = codes.find(code => code.abi.project.source.wasmHash.toString() === codeHash);

      if (!code) {
        return;
      }
      
      const codePromise =  new CodePromise(api, code.abi, undefined);
      const method = code.abi.constructors[extrinsics.constructorIndex].method;
      const endowment = (new BN(10)).mul(
        (new BN(10)).pow(new BN(decimal)
      ));
      const gasLimit = (new BN(200000)).mul(new BN(1000000));
      const salt = randomAsHex();
      let rawCode: string;
      let data: string;

      const tx = codePromise.tx[method]({
        gasLimit,
        value: endowment,
        salt,
      }, ...extrinsics.constructorParams);

      const hex = tx.toHex();
      let extrinsicCall: Call;

      try {
        // cater for an extrinsic input...
        extrinsicCall = api.createType('Call', api.tx(hex).method);
      } catch (e) {
        extrinsicCall = api.createType('Call', hex);
      }

      const { params, values } = extractState(extrinsicCall);
      const dataIndex = params.findIndex(p => p.name === 'data');
      const codeIndex = params.findIndex(p => p.name === 'code');
      data = values[dataIndex].value.toHex();
      rawCode = values[codeIndex].value.toHex();

      const rawTx = api.tx.contracts.instantiateWithCode(endowment, gasLimit, rawCode, data, salt);
      const account = accounts.find(account => extrinsics.sender &&
        keyring.encodeAddress(keyring.decodeAddress(account.address), 0) ===
          keyring.encodeAddress(keyring.decodeAddress(extrinsics.sender), 0)
      )
      console.log('deploy account',  code.name, account)
      if (!account) {
        return;
      }
      const pair = keyring.createFromUri(account.mnemonic);
      rawTx.signAndSend(pair, {}, handleTxResultsNoQueen('signAndSend', {
        async txSuccessCb(status) {
          const data = status.events.find(
            event => event.event.section.toLowerCase() === 'contracts' &&
              event.event.method.toLowerCase() === 'instantiated'
          )?.event.data.toHuman() as (string[] | undefined);
          const contractAddress = data && data[1];

          console.log('extrinsics.messages', extrinsics.messages);
          console.log('contractAddress', contractAddress)
          
          if (!contractAddress) {
            return;
          }

          const contractPromise = new ContractPromise(api, code.abi, contractAddress);
          const senders = extrinsics.messages
            .reduce(
              (all: string[], curr) => curr.sender ?
                all.concat(curr.sender) : all,
              [],
            );
          const senderNoncePromises = senders
            .map(address =>
              api.query.system.account(address)
            );

          // handle
          const sendersNonceMap = (await Promise.all(senderNoncePromises))
            .reduce((all: { [key: string]: number }, curr, index) => {
              all[senders[index]] = curr.nonce.toNumber();

              return all;
            }, {});


          [1,1,1].forEach(() => {
            extrinsics.messages.forEach(async (message, index) => {
              if (!message.sender) {
                try {
                  const query = await contractPromise.query[message.message.method](READ_ADDR, {}, ...message.params);
                  console.log('query', message.message.method, query.output?.toHuman())
                } catch (e) {}
  
                return;
              }
  
              const tx = contractPromise.tx[message.message.method]({
                gasLimit,
                value: 0,
              }, ...message.params);
              
              const hex = tx.toHex();
              let extrinsicCall: Call;
        
              try {
                // cater for an extrinsic input...
                extrinsicCall = api.createType('Call', api.tx(hex).method);
              } catch (e) {
                extrinsicCall = api.createType('Call', hex);
              }
        
              const { params, values } = extractState(extrinsicCall);
              const dataIndex = params.findIndex(p => p.name === 'data');
              const data = values[dataIndex].value.toHex();
              const rawTx = api.tx.contracts.call(contractAddress, endowment, gasLimit, data);
  
              const account = accounts.find(account => message.sender &&
                keyring.encodeAddress(keyring.decodeAddress(account.address), 0) ===
                  keyring.encodeAddress(keyring.decodeAddress(message.sender), 0)
              )
              console.log('sender account', account)
              if (!account) {
                return;
              }
  
              const pair = keyring.createFromUri(account.mnemonic);
  
              sendersNonceMap[account.address] ++;

              console.log(message.message.method, 'nonce', sendersNonceMap[account.address]);
              rawTx.signAndSend(pair, {
                nonce: sendersNonceMap[account.address],
              }, handleTxResultsNoQueen('signAndSend', {
                txSuccessCb(status) {
                  console.log('exec success', message.message.method, status)
                },
                txFailedCb(status) {
                  console.log('exec failed', message.message.method, status)
                },
                txUpdateCb(status) {
                  console.log('exec update status', status);
                }
              }, () => {}));
            })
          });
        },
        txFailedCb() {
          console.log('upload failed', code.name)
        }
      }, () => {}));
    });
  }, [mergedExtrinsics]);
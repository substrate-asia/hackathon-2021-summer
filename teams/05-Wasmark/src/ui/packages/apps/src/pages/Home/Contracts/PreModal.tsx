import React, { FC, useCallback, useContext, useState } from 'react'
import { Modal } from 'semantic-ui-react'
import Button from '@polkadot/react-components/Button/Button';
import styled from 'styled-components';
import { BenchmarkContext, Code } from '../../../core/providers';
import { Input } from '@polkadot/react-components';
import { useHistory } from 'react-router-dom';
import { ContractBenchmark } from './Contract';

export const ENDOWMENT = 1000;

const PreModal: FC<{
  onClose: () => void;
  code?: Code;
  testData: ContractBenchmark;
 }> = ({ onClose, code, testData }) => {
  const [tpsLimit, setTpsLimit] = useState<number>(1000);
  const history = useHistory();
  const { sended, failed, successed, start } = useContext(BenchmarkContext);

  const startUp = useCallback(() => {
    code &&
    start({
      abi: code.abi,
      tpsLimit,
      ...testData,
    });
  }, []);

  return (
    <Modal
      onClose={onClose}
      open={true}
    >
      <Modal.Header>Start benchmark</Modal.Header>
      <Modal.Content>
        <div className="content">
          <Input label="contract" isDisabled={true} value={code?.name} />
          <Input label="message" isDisabled={true} value={testData.message?.message.method} />
          <Input label="TPS limit" value={`${tpsLimit}`} onChange={v => setTpsLimit(parseInt(v))} />
          {sended}, {failed}, {successed}
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={startUp} positive>
          Startup
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default styled(PreModal)`
  
`;
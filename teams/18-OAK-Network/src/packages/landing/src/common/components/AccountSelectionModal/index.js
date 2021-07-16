import React from 'react';
import { closeModal } from '@redq/reuse-modal';
import { connect } from 'react-redux';
import _ from 'lodash';
import ModalStyle from './modal.style';
import { Row, Col } from 'antd';

const AccountSelectionModal = ({ addresses, onClick, ...props }) => {
  const onAddressRowClicked = (address) => {
    closeModal();
    onClick(address);
  };

  const onCloseClicked = () => {
    closeModal();
  };

  return (
    <ModalStyle {...props}>
      <Row>
        <Col span={24} style={{ marginBottom: 12 }}>
          <h2 className="model-title">
            {_.isEmpty(addresses)
              ? 'No wallet extension found'
              : 'Please select a wallet'}
          </h2>
        </Col>
        <Col span={24} className="modal-list" style={{ marginBottom: 24 }}>
          {_.isEmpty(addresses) ? (
            <div className="modal-text">
              Please install Chrome Plugin{' '}
              <a href="https://polkadot.js.org/extension/">
                Polkadot{'\u007B'}.js{'\u007d'} extension
              </a>
              , and create a wallet in order to use this app.
            </div>
          ) : (
            <Row>
              {_.map(addresses, (address) => (
                <Col
                  span={24}
                  key={address}
                  onClick={() => onAddressRowClicked(address)}
                >
                  {address}
                </Col>
              ))}
            </Row>
          )}
        </Col>
        <Col span={24}>
          <a href={null} className="modal-btn-close" onClick={onCloseClicked}>
            Close
          </a>
        </Col>
      </Row>
    </ModalStyle>
  );
};

const mapStateToProps = (state) => ({
  account: state.account,
  projectRecords: state.projects,
});

export default connect(mapStateToProps)(AccountSelectionModal);

export const CloseComponent = () => {
  return <div />;
};

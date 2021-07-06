import React, { FC, ReactNode, useState } from "react";
import { css, cx } from "@emotion/css";
import { lang } from "lang/locales";
import { center, rowCenter, rowMiddle, Space } from "@worktools/flex-styles";
import { ArrowRight, X } from "react-feather";
import { MesonModal } from "@worktools/meson-modal";
import { useAccountInfo } from "hooks/account";

import metamaskLogo from "assets/metamask.png";
import { message } from "antd";

let ConnectWallets: FC<{ className?: string; onClose: () => void }> = React.memo((props) => {
  /** Plugins */

  let accountControl = useAccountInfo();

  /** Methods */
  /** Effects */
  /** Renderers */

  let renderCard = (text: string, iconNode: ReactNode, onClick: () => void) => {
    return (
      <div className={cx(rowMiddle, styleCard)} onClick={onClick}>
        {iconNode}
        <Space width={20} />
        {text}
      </div>
    );
  };

  return (
    <div className={cx(styleContainer, props.className)}>
      <div
        className={cx(center, styleClose)}
        onClick={() => {
          props.onClose();
        }}
      >
        <X size={12} color={"#9B9B9B"} />
      </div>
      <div className={styleTitle}>{lang.connect_your_wallets}</div>
      <Space height={8} />
      <div className={cx(rowMiddle, styleHint)}>
        {lang.how_to_get_wallet}
        <Space width={8} />
        <ArrowRight size={12} className={styleGo} />
      </div>
      <Space height={20} />
      {renderCard(lang.connect_to_metamask, <div className={styleLogo}></div>, async () => {
        if (accountControl.isLoading) {
          message.info(lang.during_processing);
          return;
        }
        await accountControl.requestConnect();
        message.success(lang.connect_to_wallet);
        props.onClose();
      })}
    </div>
  );
});

export default ConnectWallets;

export let useConnectWallets = () => {
  let [showWallets, setShowWallets] = useState(false); // DEBUG

  let ui = (
    <MesonModal
      title={null}
      visible={showWallets}
      cardClassName={styleModalCard}
      onClose={() => {
        setShowWallets(false);
      }}
      renderContent={() => {
        return (
          <ConnectWallets
            onClose={() => {
              setShowWallets(false);
            }}
          />
        );
      }}
    />
  );

  return {
    show: () => {
      setShowWallets(true);
    },
    ui,
  };
};

let styleContainer = css`
  position: relative;
  padding: 32px;
`;

let styleCard = css`
  /* Panel / 100 */
  background: #fbfafa;
  height: 64px;
  border-radius: 18px;
  padding: 12px 24px;

  cursor: pointer;

  margin: 6px 0;

  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  /* identical to box height */

  color: #000000;
`;

let styleTitle = css`
  font-weight: 800;
  padding: 0 12px;

  /* Black/900 */

  color: #0f0e0e;
  font-size: 24px;
`;

let styleHint = css`
  padding: 0 12px;
  /* Cerise/500 */

  color: #db3680;

  font-size: 13px;
`;

let styleGo = css``;

let styleClose = css`
  position: absolute;
  right: 20px;
  top: 20px;
  border-radius: 50%;

  cursor: pointer;

  /* White/100 */

  background: #f8f8f8;
  width: 24px;
  height: 24px;
`;

let styleModalCard = css`
  /* White/fff */

  background: #ffffff;
  border-radius: 18px;
`;

let styleLogo = css`
  background-image: url(${metamaskLogo});
  width: 34px;
  height: 34px;
  background-size: 100% 100%;
`;

import React, { FC, useState } from "react";
import { css, cx } from "@emotion/css";
import { column, expand, row, rowParted, Space } from "@worktools/flex-styles";
import { ChevronRight } from "react-feather";
import { lang } from "lang/locales";
import { useAccountInfo } from "hooks/account";
import { IGlobalStore } from "models/store";
import { useRexContext } from "@jimengio/rex";
import { useConnectWallets } from "pages/wallets/connect-wallets";
import { message } from "antd";

let AccountStatus: FC<{ className?: string }> = React.memo((props) => {
  let [hasFocus, setHasFocus] = useState(false);

  /** Plugins */

  let accountControl = useAccountInfo();
  let userData = useRexContext((s: IGlobalStore) => s.userData);
  let walletsPlugin = useConnectWallets();

  /** Methods */
  /** Effects */

  /** Renderers */

  // TODO different status

  let renderStatus = () => {
    return (
      <div className={cx(column, styleCardInfo)}>
        <div>Polkadot Main Network</div>
        <Space height={4} />
        {userData != null ? <div className={cx(styleId, styleCode)}>{userData}</div> : <div className={styleId}>({lang.read_only})</div>}
      </div>
    );
  };
  let renderInteraction = () => {
    return (
      <div className={cx(column, styleCardInfo)}>
        <div className={styleActionTitle}>{userData != null ? lang.disconnect_wallet : lang.connect_to_wallet}</div>
        <Space height={4} />
        {userData != null ? <div className={cx(styleId, styleCode)}>{userData}</div> : <div className={styleId}>({lang.read_only})</div>}
      </div>
    );
  };

  return (
    <>
      <div
        className={cx(row, styleTipCard, props.className)}
        onMouseEnter={() => {
          setHasFocus(true);
        }}
        onMouseLeave={() => {
          setHasFocus(false);
        }}
        onClick={() => {
          if (userData != null) {
            accountControl.disconnect();
            message.info(lang.disconnected_wallet);
          } else {
            walletsPlugin.show();
          }
        }}
      >
        <div className={styleDot}></div>
        <Space width={8} />
        {hasFocus ? renderInteraction() : renderStatus()}
      </div>
      {walletsPlugin.ui}
    </>
  );
});

export default AccountStatus;

let styleTipCard = css`
  width: 220px;
  cursor: pointer;

  height: 68px;
  padding: 8px 16px;

  /* Cerise/50 */
  background: #fff7fb;
  /* Cerise/400 */
  border: 1px solid #e5458d;
  /* Nav */

  box-shadow: 0px 3px 3px -2px rgba(7, 19, 39, 0.03), 0px 1px 2px -4px rgba(7, 19, 39, 0.02);
  border-radius: 8px;

  /* White/fff */

  background: #ffffff;

  /* Cerise/500 */
  color: #db3680;

  &:active {
    /* Cerise/600 */

    color: #bf306b;

    background: #f8f8f8;
  }

  position: relative;
`;

let styleCardInfo = css`
  width: 100%;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;

  font-weight: 500;
  font-size: 14px;
  line-height: 19px;

  justify-content: center;

  /* Black/900 */

  color: #0f0e0e;
`;

let styleId = css`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;

  overflow: hidden;
  text-overflow: ellipsis;

  /* White/500 */

  color: #bebebe;
`;

let styleDot = css`
  /* Cerise/500 */
  background: #db3680;
  width: 6px;
  height: 6px;
  border-radius: 6px;
  margin-top: 14px;
`;

let styleActionTitle = css`
  /* Cerise/600 */

  color: #bf306b;
`;

let styleCode = css`
  font-family: Menlo, monospace;
`;

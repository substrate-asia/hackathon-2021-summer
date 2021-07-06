import React, { FC, useState } from "react";
import { css, cx } from "@emotion/css";
import { ThemeColor } from "../../styles/colors";
import { rowCenter, rowMiddle, rowParted, Space } from "@worktools/flex-styles";
import HeaderSearch from "./header-search";
import RoundButton from "../../widgets/round-button";
import { lang } from "../../lang/locales";
import { genRouter } from "controller/generated-router";
import { MesonModal } from "@worktools/meson-modal";
import ConnectWallets, { useConnectWallets } from "pages/wallets/connect-wallets";
import LanguageSwitcher from "widgets/language-switcher";
import PnsLogo from "widgets/pns-logo";
import { useRexContext } from "@jimengio/rex";
import { IGlobalStore } from "models/store";
import { message } from "antd";
import copy from "copy-text-to-clipboard";

let Navbar: FC<{ className?: string }> = React.memo((props) => {
  let [text, setText] = useState("");

  /** Plugins */

  let walletPlugin = useConnectWallets();

  let userAddress = useRexContext((s: IGlobalStore) => s.userData);

  /** Methods */
  /** Effects */
  /** Renderers */

  let renderMyAddress = () => {
    return (
      <div
        className={styleMy}
        onClick={() => {
          copy(userAddress);
          message.info(lang.copied);
        }}
      >
        {lang.my_address}
      </div>
    );
  };

  return (
    <div className={cx(rowCenter, styleContainer, props.className)}>
      <div className={cx(rowParted, styleCentered)}>
        <PnsLogo
          onClick={() => {
            genRouter.search.go();
          }}
          className={styleNav}
        />
        <div className={rowMiddle}>
          <HeaderSearch
            value={text}
            onChange={(v) => {
              setText(v);
            }}
            onSearch={(v) => {
              if (v.length > 0) {
                genRouter.search.go({ keyword: v });
              }
            }}
          />
          <Space width={20} />
          <LanguageSwitcher />
          <Space width={20} />
          {userAddress != null ? (
            renderMyAddress()
          ) : (
            <RoundButton
              className={styleConnect}
              text={lang.connect_wallet}
              onClick={() => {
                walletPlugin.show();
              }}
            />
          )}
        </div>
      </div>
      {walletPlugin.ui}
    </div>
  );
});

export default Navbar;

let styleContainer = css`
  background-color: ${ThemeColor.white};
  height: 60px;
  box-shadow: 0px 3px 3px -2px rgba(7, 19, 39, 0.03), 0px 1px 2px -4px rgba(7, 19, 39, 0.02);
  z-index: 99;
`;

let styleCentered = css`
  max-width: 1024px;
  width: 90%;
`;

let styleNav = css`
  cursor: pointer;
`;

let styleConnect = css`
  /* White/50 */

  background: #fcfcfc;
  /* Black/900 */

  border: 1px solid #0f0e0e;

  /* Black/900 */

  color: #0f0e0e;
`;

let styleMy = css`
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.04em;

  cursor: pointer;

  /* Black/900 */

  color: #0f0e0e;
`;

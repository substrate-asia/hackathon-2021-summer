import React, { FC, useState } from "react";
import { css, cx } from "@emotion/css";
import { rowParted, Space } from "@worktools/flex-styles";
import RoundButton from "widgets/round-button";
import { MesonModal } from "@worktools/meson-modal";
import ConnectWallets from "pages/wallets/connect-wallets";
import { portalLang } from "lang/locales";
import LanguageSwitcher from "widgets/language-switcher";
import PnsLogo from "widgets/pns-logo";

let HeaderNav: FC<{ className?: string }> = React.memo((props) => {
  let [showWallets, setShowWallets] = useState(false); // DEBUG

  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={cx(styleContainer, props.className)}>
      <PnsLogo />
      <div className={rowParted}>
        <LanguageSwitcher />
        <Space width={24} />
        <RoundButton
          text={portalLang.connect_wallet}
          className={styleConnect}
          onClick={() => {
            setShowWallets(true);
          }}
        />
      </div>

      <MesonModal
        title={null}
        visible={showWallets}
        cardClassName={styleCard}
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
    </div>
  );
});

export default HeaderNav;

let styleCard = css`
  /* White/fff */

  background: #ffffff;
  border-radius: 18px;
`;

let styleContainer = css`
  background: #ffffff;
  box-shadow: 0px 3px 3px -2px rgba(7, 19, 39, 0.03), 0px 1px 2px -4px rgba(7, 19, 39, 0.02);
`;

let styleConnect = css`
  /* White/50 */

  background: #fcfcfc;
  /* Black/900 */

  border: 1px solid #0f0e0e;

  /* Black/900 */

  color: #0f0e0e;
`;

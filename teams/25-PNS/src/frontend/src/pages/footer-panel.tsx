import React, { FC } from "react";
import { css, cx } from "@emotion/css";
import { rowParted } from "@worktools/flex-styles";
import LanguageSwitcher from "widgets/language-switcher";

let FooterPanel: FC<{}> = React.memo((props) => {
  return (
    <div className={cx(styleFooter)}>
      <div className={cx(rowParted, styleFooterContent)}>
        <div className={styleRights}>© 2021 Polkadot Name System Project. All rights reserved</div>
        <LanguageSwitcher />
      </div>
    </div>
  );
});

export default FooterPanel;

let styleFooter = css`
  padding: 40px 0px;
  height: 106px;
`;

let styleFooterContent = css`
  max-width: 1044px;
  margin: auto;
`;

let styleRights = css`
  font-family: Noto Sans, Source Han Sans CN, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;

  /* White/500 */

  color: #bebebe;
`;

import React, { FC } from "react";
import { css, cx } from "@emotion/css";
import AccountStatus from "./account-status";
import { rowMiddle, Space } from "@worktools/flex-styles";
import { Smile } from "react-feather";
import { lang } from "lang/locales";
import AboutLink from "./about-link";

// down part of siderbar, about entry, account info
let AboutArea: FC<{ className?: string }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={cx(styleContainer, props.className)}>
      <Space height={16} />
      <AboutLink />
      <Space height={16} />
      <AccountStatus />
    </div>
  );
});

export default AboutArea;

let styleTab = css`
  height: 43px;
  padding: 0 18px;
  cursor: pointer;

  /* Black / 300 */

  color: #939090;

  &:hover {
    /* Cerise/50 */
    /* White/100 */

    background: #f8f8f8;
    border-radius: 8px;
  }
`;

let styleContainer = css`
  /* White/200 */

  border-top: 1px solid #f3f3f3;
`;

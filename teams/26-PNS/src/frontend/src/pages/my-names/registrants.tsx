import React, { FC } from "react";
import { css, cx } from "@emotion/css";
import AccountCard from "./account-card";
import DomainListTable from "./domain-list-table";
import { expand, Space } from "@worktools/flex-styles";
import ReverseRecord from "./registrants/reverse-record";
import { lang } from "lang/locales";

let PageRegistrants: FC<{ className?: string }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={cx(expand, styleContainer, props.className)}>
      <AccountCard />
      <Space height={16} />
      <ReverseRecord />
      <Space height={16} />
      <div className={styleTitle}>{lang.registrant}</div>
      <Space height={8} />
      <DomainListTable />
    </div>
  );
});

export default PageRegistrants;

let styleContainer = css``;

let styleTitle = css`
  font-weight: 800;
  font-size: 14px;
  line-height: 19px;

  /* Black/600 */

  color: #515050;
`;

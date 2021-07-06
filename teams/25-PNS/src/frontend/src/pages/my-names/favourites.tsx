import React, { FC } from "react";
import { css, cx } from "@emotion/css";
import AccountCard from "pages/my-names/account-card";
import { expand, Space } from "@worktools/flex-styles";
import DomainListTable from "pages/my-names/domain-list-table";
import { lang } from "lang/locales";

let PageFavourites: FC<{ className?: string }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */

  return (
    <div className={cx(expand, styleContainer, props.className)}>
      <AccountCard />
      <Space height={16} />
      <div className={styleTitle}>{lang.favourites}</div>
      <Space height={8} />
      <DomainListTable />
    </div>
  );
});

export default PageFavourites;

let styleContainer = css``;

let styleTitle = css`
  font-weight: 800;
  font-size: 14px;
  line-height: 19px;

  /* Black/600 */

  color: #515050;
`;

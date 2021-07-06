/**
 * 域名管理界面共用的一个头部, 名称, 标签, 以及按钮
 */

import React, { FC } from "react";
import { css, cx } from "@emotion/css";
import { rowMiddle, rowParted, Space } from "@worktools/flex-styles";
import StatusTag from "widgets/status-tag";
import FavouriteControl from "../favourite-control";
import { lang } from "lang/locales";

let DomainTitle: FC<{ domain: string; className?: string }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */

  return (
    <div className={cx(rowParted, props.className)}>
      <div className={rowMiddle}>
        <span className={styleTitle}>{props.domain}</span>
        <Space width={16} />
        <StatusTag text={lang.available} />
      </div>
      <FavouriteControl domain={props.domain} />
    </div>
  );
});

export default DomainTitle;

let styleTitle = css`
  font-weight: 500;
  font-size: 32px;
  line-height: 44px;

  /* identical to box height */

  /* Black/900 */

  color: #0f0e0e;
`;

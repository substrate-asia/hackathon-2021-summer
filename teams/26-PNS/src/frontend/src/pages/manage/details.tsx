import React, { FC } from "react";
import { css, cx } from "@emotion/css";
import { expand, rowMiddle, rowParted, Space } from "@worktools/flex-styles";
import StatusTag from "widgets/status-tag";
import FavouriteControl from "./favourite-control";
import { Alert } from "antd";
import { lang } from "lang/locales";
import NameInfo from "./details/name-info";
import NameDetails from "./details/name-details";
import { genRouter } from "controller/generated-router";

let DomainDetails: FC<{ className?: string; domain: string; viewOnly?: boolean }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={cx(expand, props.className)}>
      <div className={rowParted}>
        <div className={rowMiddle}>
          <span className={styleName}>TODO name</span>
          <Space width={16} />
          <StatusTag text={"TODO"} />
        </div>
        <FavouriteControl domain={"TODO"} />
      </div>
      <Space height={16} />

      <Alert type="info" message={lang.learn_to_manage} />

      <Space height={16} />
      <NameInfo domain={props.domain} />
      <Space height={16} />
      <NameDetails
        data={{}}
        onEdit={() => {
          genRouter.manage_.details.edit.go("TODO");
        }}
      />
    </div>
  );
});

export default DomainDetails;

let styleName = css`
  font-weight: 500;
  font-size: 32px;
  line-height: 44px;
  /* identical to box height */

  /* Black/900 */

  color: #0f0e0e;
`;

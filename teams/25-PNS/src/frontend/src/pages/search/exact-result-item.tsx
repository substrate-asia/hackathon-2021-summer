import React, { FC } from "react";
import { css, cx } from "@emotion/css";
import { center, row, rowMiddle, rowParted, Space } from "@worktools/flex-styles";
import { Check, Heart } from "react-feather";
import { ThemeColor } from "styles/colors";
import { genRouter } from "controller/generated-router";
import StatusTag from "widgets/status-tag";
import { lang } from "lang/locales";

// main search only returned a single result, in larger sizes
let ExactResultItem: FC<{ className?: string; domain: string; openToRegister: boolean }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */

  return (
    <div
      className={cx(rowParted, styleContainer, props.className)}
      onClick={() => {
        if (props.openToRegister) {
          genRouter.pickName_.register.go(props.domain);
        } else {
          genRouter.pickName_.details.go(props.domain);
        }
      }}
    >
      <div className={rowMiddle}>
        <div className={cx(center, stylePrefix)}>
          <Check color={ThemeColor.cerise500} size={16} />
        </div>
        <div className={cx(rowMiddle, styleName)}>{props.domain}</div>
        <Space width={8} />
        <StatusTag text={props.openToRegister ? lang.available : null} />
      </div>

      <div className={cx(center, stylePrefix)}>
        <Heart color={ThemeColor.cerise500} size={16} />
      </div>
    </div>
  );
});

export default ExactResultItem;

let styleContainer = css`
  height: 88px;
  cursor: pointer;

  /* White/fff */
  background: #ffffff;
  box-shadow: inset 0px -1px 0px #ececec;
`;

let stylePrefix = css`
  width: 60px;
`;

let styleName = css`
  font-weight: 500;
  font-size: 30px;
  line-height: 41px;
`;

let styleExpired = css`
  font-size: 14px;

  /* White/300 */
  color: #e3e3e3;
`;

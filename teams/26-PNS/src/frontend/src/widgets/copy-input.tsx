/**
 * 只读 input 组件, 其中包含一个特殊位置显示的拷贝按钮, 定制版本
 */

import React, { FC } from "react";
import { css, cx } from "@emotion/css";
import { rowMiddle, Space } from "@worktools/flex-styles";
import { Copy } from "react-feather";
import { ThemeColor } from "styles/colors";
import copy from "copy-text-to-clipboard";
import { message } from "antd";
import { lang } from "lang/locales";

let CopyInput: FC<{ value: string; className?: string }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */

  if (props.value == null) {
    return <div className={cx(rowMiddle, styleContainer, styleEmpty, props.className)}>{lang.not_set}</div>;
  }

  return (
    <div className={cx(rowMiddle, styleContainer, props.className)}>
      <div className={styleContent}>{props.value}</div>
      <Space width={8} />
      <Copy
        color={ThemeColor.cerise500}
        size={14}
        className={styleIcon}
        onClick={() => {
          copy(props.value);
          message.info(lang.copied);
        }}
      />
    </div>
  );
});

export default CopyInput;

let styleContent = css`
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  /* identical to box height */

  /* Black/700 */

  color: #3b3a3a;

  flex: 1;
  overflow: auto;
  max-width: max-content;
`;

let styleContainer = css`
  height: 34px;
  padding: 0 16px;

  /* Panel / 100 */

  background: #fbfafa;
  border-radius: 12px;
`;

let styleEmpty = css`
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  /* identical to box height */

  /* White/500 */

  color: #bebebe;
`;

let styleIcon = css`
  cursor: pointer;
`;

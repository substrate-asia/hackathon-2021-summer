import React, { FC } from "react";
import { css, cx } from "@emotion/css";

let StatusTag: FC<{ className?: string; text: string }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return <div className={cx(styleTag, props.className)}>{props.text}</div>;
});

export default StatusTag;

let styleTag = css`
  height: 22px;
  min-width: 60px;
  padding: 0 16px;

  /* Green/100 */

  background: #e0fdef;
  border-radius: 100000px;

  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  /* identical to box height */

  display: flex;
  align-items: center;

  /* Green/500 */

  color: #3fb885;
`;

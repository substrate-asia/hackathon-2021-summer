import React, { FC } from "react";
import { css, cx } from "@emotion/css";

let FormSection: FC<{ title: string; className?: string }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return <div className={cx(styleTitle, props.className)}>{props.title}</div>;
});

export default FormSection;

let styleTitle = css`
  font-weight: 800;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;

  /* Black/900 */

  color: #0f0e0e;

  height: 44px;

  /* White/200 */

  border-bottom: 1px solid #f3f3f3;
`;

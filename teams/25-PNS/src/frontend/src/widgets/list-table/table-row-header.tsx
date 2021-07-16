import React, { FC, ReactNode } from "react";
import { css, cx } from "@emotion/css";
import { expand, rowMiddle, rowParted } from "@worktools/flex-styles";

let TableRowHeader: FC<{ className?: string; title0: ReactNode; title1?: ReactNode; titleLast: ReactNode; lastColClassName?: string }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={cx(styleHeader, rowParted, props.className)}>
      <div className={cx(expand, rowMiddle)}>
        <div className={cx(expand)}>{props.title0}</div>
        {props.title1 ? <div className={expand}>{props.title1}</div> : null}
      </div>
      <div className={props.lastColClassName}>{props.titleLast}</div>
    </div>
  );
});

export default TableRowHeader;

let styleHeader = css`
  height: 46px;
  padding: 0 40px;

  font-weight: 500;
  font-size: 14px;
  line-height: 19px;

  /* White/400 */

  /* Black/500 */

  color: #676666;

  /* White/50 */

  background: #fcfcfc;
  box-shadow: inset 0px -1px 0px #ececec;
  border-radius: 12px 12px 0 0;
`;

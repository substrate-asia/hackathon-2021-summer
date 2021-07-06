import React, { FC, ReactNode } from "react";
import { css, cx } from "@emotion/css";
import { center, expand, row, rowMiddle, rowParted, Space } from "@worktools/flex-styles";
import { ThemeColor } from "styles/colors";

// TODO properties, interactions
let TableRow: FC<{
  className?: string;
  cell0: ReactNode;
  cell1?: ReactNode;
  cellLast: ReactNode;
  expires_date?: string;
  lastColClassName?: string;
  onClick: (cell0: ReactNode) => void;
}> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div
      className={cx(rowParted, styleContainer, props.className)}
      onClick={(event) => {
        if ((event.target as any).tagName === "svg") {
          // in case click on a icon...
          return;
        }
        props.onClick(props.cell0);
      }}
    >
      <div className={cx(expand, rowMiddle, styleColumn1)}>
        <div className={cx(expand, styleName)}>{props.cell0}</div>
        <div className={cx(expand, styleExpired)}>{props.cell1}</div>
      </div>
      <div className={cx(styleLastCell, props.lastColClassName)}>{props.cellLast}</div>
    </div>
  );
});

export default TableRow;

let styleContainer = css`
  padding: 0 40px;

  height: 52px;
  cursor: pointer;

  box-shadow: inset 0px -1px 0px #ececec;
`;

let styleLastCell = css`
  /* width: 60px; */
`;

let styleName = css`
  font-weight: 500;
  font-size: 16px;
`;

let styleExpired = css`
  font-size: 14px;

  /* White/300 */
  color: #e3e3e3;
`;

let styleColumn1 = css`
  width: 40%;
`;

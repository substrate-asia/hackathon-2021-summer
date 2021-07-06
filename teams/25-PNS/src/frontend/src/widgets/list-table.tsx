import React, { FC, ReactNode } from "react";
import { css, cx } from "@emotion/css";
import { center, column, expand, rowMiddle } from "@worktools/flex-styles";
import { lang } from "lang/locales";

let ListTable: FC<{ className?: string; header: ReactNode; emptyLocale?: string }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */

  let isEmpty = props.children == null || (props.children as ReactNode[]).length == 0;

  let renderEmptyNode = () => {
    return <div className={cx(center, styleEmpty)}>{props.emptyLocale || lang.tableIsEmpty}</div>;
  };

  return (
    <div className={cx(column, styleResults, props.className)}>
      {props.header}
      <div className={cx(expand, styleTableBody)}>
        {isEmpty ? renderEmptyNode() : null}
        {props.children}
      </div>
    </div>
  );
});

export default ListTable;

let styleResults = css`
  /* White/fff */

  background: #ffffff;
  /* White/200 */

  border: 1px solid #eeeeee;
  /* Card */

  box-shadow: 0px 4px 12px -2px rgba(7, 19, 39, 0.03), 0px 3px 3px -2px rgba(7, 19, 39, 0.03), 0px 1px 2px -4px rgba(7, 19, 39, 0.02);
  border-radius: 12px;
`;

let styleTableBody = css`
  max-height: 80vh;
`;

let styleEmpty = css`
  margin: 40px;

  /* White/500 */

  border: 1px dashed #bebebe;
  box-sizing: border-box;
  border-radius: 12px;

  height: 126px;

  font-weight: 500;
  font-size: 16px;
  line-height: 22px;

  /* White/400 */

  color: #d2d2d2;
`;

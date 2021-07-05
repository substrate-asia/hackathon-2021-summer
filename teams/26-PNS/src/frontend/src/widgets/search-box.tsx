import React, { FC } from "react";
import { css, cx } from "@emotion/css";
import { center, expand, row, rowMiddle, Space } from "@worktools/flex-styles";
import { Search, X } from "react-feather";
import { lang } from "lang/locales";

let SearchBox: FC<{ className?: string; value: string; onChange: (v: string) => void; placeholder?: string; onSearch?: () => void }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={cx(rowMiddle, styleContainer, props.className)}>
      <Space width={16} />
      <Search color="#676666" size={16} />
      <Space width={16} />
      <input
        className={cx(expand, styleInput)}
        value={props.value}
        placeholder={props.placeholder || lang.search}
        onChange={(event) => {
          let v = event.target.value;
          props.onChange(v);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            props.onSearch?.();
          }
        }}
      />
      {props.value.trim().length > 0 ? (
        <div
          className={cx(center, styleIcon)}
          onClick={() => {
            props.onChange("");
          }}
        >
          <X size={12} color="#9B9B9B" />
        </div>
      ) : null}
    </div>
  );
});

export default SearchBox;

let styleContainer = css`
  position: relative;

  /* White/fff */

  background: #ffffff;
  /* Black/500 */

  border: 1.5px solid #676666;
  box-sizing: border-box;
  /* Black/400 */

  box-shadow: 2px 3px 0px rgba(81, 80, 80, 0.1);
  border-radius: 1e8px;

  height: 48px;
`;

let styleInput = css`
  border: none;
  background: transparent;
  font-size: 18px;
  line-height: 25px;
  outline: none;

  /* identical to box height */

  /* Black/600 */

  color: #515050;
`;

let styleIcon = css`
  /* White/100 */

  background: #f8f8f8;
  border-radius: 100000px;
  width: 24px;
  height: 24px;
  cursor: pointer;

  position: absolute;
  top: 10px;
  right: 16px;
`;

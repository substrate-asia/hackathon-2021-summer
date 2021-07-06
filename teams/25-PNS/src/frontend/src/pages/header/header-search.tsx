import React, { FC } from "react";
import { css, cx } from "@emotion/css";
import { expand, rowMiddle, rowParted } from "@worktools/flex-styles";
import { lang } from "lang/locales";
import { Search } from "react-feather";
import { ThemeColor } from "../../styles/colors";

let HeaderSearch: FC<{ className?: string; value: string; onChange: (v: string) => void; onSearch: (v: string) => void }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={cx(rowMiddle, styleContainer, props.className)}>
      <Search color={ThemeColor.white500} size={16} className={styleIcon} />
      <input
        className={cx(expand, styleInput)}
        placeholder={lang.search_your_domain}
        value={props.value}
        onChange={(event) => {
          // TODO debounce
          let v = event.target.value;
          props.onChange(v);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            props.onSearch(props.value);
          }
        }}
      />
    </div>
  );
});

export default HeaderSearch;

let styleContainer = css`
  height: 40px;
  padding: 0 8px;
  min-width: 360px;

  /* White/100 */

  background: #f8f8f8;
  border-radius: 100000px;
`;

let styleInput = css`
  border: none;
  background-color: transparent;
  outline: none;
`;

let styleIcon = css`
  font-size: 16px;
  margin: 0 4px;
`;

import React, { FC, useEffect, useState } from "react";
import { css, cx } from "@emotion/css";
import { center, column, expand, row, rowMiddle, Space } from "@worktools/flex-styles";
import SearchBox from "widgets/search-box";
import ExactResultItem from "./exact-result-item";
import { formatLocale, lang } from "lang/locales";
import { useDebouncedCallback } from "use-debounce";
import { useCheckName } from "hooks/account";
import { genRouter, GenRouterTypeTree } from "controller/generated-router";
import LogoLoading from "widgets/logo-loading";

let SearchResults: FC<{ className?: string; initialName: string }> = React.memo((props) => {
  let [name, setName] = useState("");

  let checkPlugin = useCheckName();

  /** Plugins */
  /** Methods */

  const debouncedCheck = useDebouncedCallback(
    // function
    (value: string) => {
      checkPlugin.check(value, {
        onOk: (name) => {
          // 在 URL 当中记忆当前查询的地址
          genRouter.search.go({ keyword: name });
        },
      });
    },
    // delay in ms
    800
  );

  const debouncedReset = useDebouncedCallback(
    // function
    () => {
      checkPlugin.reset();
    },
    // delay in ms
    400
  );

  /** Effects */

  useEffect(() => {
    if (props.initialName) {
      checkPlugin.check(props.initialName);
    } else {
      checkPlugin.reset();
    }
  }, [props.initialName]);

  /** Renderers */
  return (
    <div className={cx(expand, column, styleContainer, props.className)}>
      <div>
        <SearchBox
          value={name}
          placeholder={lang.search_your_domain}
          onChange={(v) => {
            setName(v);
            if (v.trim() != "") {
              debouncedCheck(v);
            } else {
              debouncedReset();
            }
          }}
        />
      </div>
      <Space height={28} />
      {checkPlugin.isLoading ? (
        <div className={center}>
          <LogoLoading />
        </div>
      ) : checkPlugin.result == null ? (
        <div>TODO search</div>
      ) : checkPlugin.result.invalid ? (
        <div>{formatLocale(lang.x_is_invalid_name, { x: checkPlugin.result.name })}</div>
      ) : (
        <div className={cx(column, styleResults)}>
          <div className={cx(rowMiddle, styleHeader)}>
            <div className={stylePrefix}></div>
            <div>{lang.exactly_match}</div>
          </div>
          <div className={expand}>
            <ExactResultItem domain={checkPlugin.result?.name} openToRegister={checkPlugin.result?.available} />
          </div>
        </div>
      )}
    </div>
  );
});

export default SearchResults;

let styleContainer = css``;

let styleHeader = css`
  height: 34px;

  font-size: 14px;
  line-height: 19px;

  /* White/400 */

  color: #d2d2d2;

  /* White/50 */

  background: #fcfcfc;
  box-shadow: inset 0px -1px 0px #ececec;
`;

let stylePrefix = css`
  width: 60px;
`;

let styleResults = css`
  /* White/fff */

  background: #ffffff;
  /* White/200 */

  border: 1px solid #eeeeee;
  /* Card */

  box-shadow: 0px 4px 12px -2px rgba(7, 19, 39, 0.03), 0px 3px 3px -2px rgba(7, 19, 39, 0.03), 0px 1px 2px -4px rgba(7, 19, 39, 0.02);
  border-radius: 8px;
`;

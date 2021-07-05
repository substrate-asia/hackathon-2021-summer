import React, { FC, useState } from "react";
import { css, cx } from "@emotion/css";

import SearchBox from "widgets/search-box";
import RoundButton from "widgets/round-button";

import { center, expand, row, rowMiddle, rowParted, Space } from "@worktools/flex-styles";
import { portalLang } from "lang/locales";

import searchBg from "assets/portal/search-bg.png";

let SearchPromotion: FC<{ className?: string }> = React.memo((props) => {
  let [text, setText] = useState("");

  /** Plugins */
  /** Methods */

  let onSearch = () => {
    if (text.trim().length > 0) {
      location.replace(`/#/jump/${text}`); // let app itself to handle
    }
  };

  /** Effects */
  /** Renderers */
  return (
    <div className={cx(styleContainer, props.className)}>
      <div className={styleBrand}>
        {props.children}

        <span className={styleColoredChar}>.</span>
      </div>
      <Space height={60} />
      <div className={rowMiddle}>
        <SearchBox
          className={styleSearchBox}
          value={text}
          placeholder={portalLang.search_domain_hint}
          onChange={(v) => {
            setText(v);
          }}
          onSearch={onSearch}
        />
        <Space width={16} />
        <RoundButton
          text={portalLang.search}
          className={styleSearchButton}
          filled
          onClick={() => {
            onSearch();
          }}
        />
      </div>
    </div>
  );
});

export default SearchPromotion;

let styleBrand = css`
  white-space: pre;

  font-weight: bold;
  font-size: 70px;
  line-height: 98.6%;
  /* or 69px */

  color: #0f0e0e;

  span.colored-char {
    /* Cerise/400 */
    color: #e5458d;
  }

  font-family: Fugaz One, Source Han Sans CN, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
`;

let styleSearchBox = css`
  height: 54px;
  width: 614px;
`;

let styleSearchButton = css`
  height: 54px;
  font-size: 18px;
  line-height: 25px;
  padding: 0 36px;
`;

let styleColoredChar = css`
  font-size: 70px;
  line-height: 98.6%;
  /* or 69px */

  /* Cerise/400 */
  color: #e5458d;
`;

let styleContainer = css`
  padding: 160px 0;
  background-image: url(${searchBg});
  background-position: top right;
  background-repeat: no-repeat;
`;

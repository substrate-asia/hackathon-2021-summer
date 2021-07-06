import React, { FC } from "react";
import { css, cx } from "@emotion/css";
import { Smile } from "react-feather";
import { rowMiddle, Space } from "@worktools/flex-styles";
import { lang } from "lang/locales";
import { ThemeColor } from "styles/colors";

let AboutLink: FC<{ className?: string }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <a className={props.className} target="_blank" href="/portal/">
      <div className={cx(rowMiddle, styleTab)}>
        <Smile color={ThemeColor.cerise500} size={16} />
        <Space width={8} />
        {lang.about}
      </div>
    </a>
  );
});

export default AboutLink;

let styleTab = css`
  height: 43px;
  padding: 0 18px;
  cursor: pointer;

  /* Black / 300 */

  color: #939090;

  &:hover {
    /* Cerise/50 */
    /* White/100 */

    background: #f8f8f8;
    border-radius: 8px;
  }
`;

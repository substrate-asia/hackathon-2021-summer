import React, { FC } from "react";
import { css, cx } from "@emotion/css";
import { expand, row, rowMiddle, rowParted, Space } from "@worktools/flex-styles";
import { lang } from "lang/locales";
import { ArrowUpRight, Copy } from "react-feather";
import HashAvatar from "widgets/hash-avatar";

let AccountCard: FC<{ className?: string }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={cx(expand, row, styleContainer, props.className)}>
      <HashAvatar value={"TODO4"} size={78} className={styleAvatar} />
      <Space width={16} />
      <div className={expand}>
        <div className={styleName}>TODO</div>
        <div className={rowMiddle}>
          <span className={styleAccount}>TODO</span>
          <Space width={8} />
          <Copy color={"#E5458D"} size={16} />
          <Space width={8} />
          <Copy color={"#E5458D"} size={16} />
          <Space width={16} />
          <div className={cx(rowMiddle, styleViewLink)}>
            {lang.view_on_polkascan}
            <Space width={8} />
            <ArrowUpRight size={14} color="#E5458D" />
          </div>
        </div>
      </div>
    </div>
  );
});

export default AccountCard;

let styleContainer = css``;

let styleAvatar = css`
  width: 78px;
  height: 78px;

  /* White/fff */

  background: #ffffff;
  /* White/300 */

  border: 1.4717px solid #e3e3e3;
  box-sizing: border-box;
  box-shadow: 0px 5.88679px 17.6604px -2.9434px rgba(7, 19, 39, 0.03), 0px 4.41509px 4.41509px -2.9434px rgba(7, 19, 39, 0.03),
    0px 1.4717px 2.9434px -5.88679px rgba(7, 19, 39, 0.02);
  border-radius: 12px;
`;

let styleName = css`
  font-weight: 800;
  font-size: 28px;
  line-height: 38px;
  display: flex;
  align-items: center;

  /* Black/700 */

  color: #3b3a3a;
`;

let styleAccount = css`
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;

  /* White/500 */

  color: #bebebe;
`;

let styleViewLink = css`
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  /* identical to box height */

  /* Cerise/500 */

  color: #db3680;
`;

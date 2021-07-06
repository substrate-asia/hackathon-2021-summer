import React, { FC } from "react";
import { css, cx } from "@emotion/css";
import { rowMiddle, rowParted, Space } from "@worktools/flex-styles";
import { ArrowRight, File } from "react-feather";
import { ThemeColor } from "styles/colors";
import { lang } from "lang/locales";
import { useSelectRecord } from "./select-record";

let ReverseRecord: FC<{ className?: string }> = React.memo((props) => {
  /** Plugins */

  let recordPlugin = useSelectRecord({ afterChange: () => {} });

  /** Methods */
  /** Effects */
  /** Renderers */

  let renderRecord = () => {
    // TODO
    return <div className={styleNotSet}>{"TODO"}</div>;
  };

  return (
    <div className={cx(rowParted, styleContainer, props.className)}>
      <div className={rowMiddle}>
        <File size={16} color={ThemeColor.cerise500} />
        <Space width={8} />
        <span>{lang.reverse_record}</span>
        <Space width={8} />
        {renderRecord()}
      </div>
      <div>
        <ArrowRight
          color={ThemeColor.cerise500}
          size={16}
          className={styleIcon}
          onClick={() => {
            recordPlugin.edit();
          }}
        />
      </div>
      {recordPlugin.ui}
    </div>
  );
});

export default ReverseRecord;

let styleContainer = css`
  padding: 0 16px;
  height: 54px;
  /* White/fff */

  background: #ffffff;
  /* White/300 */

  border: 1px solid #e3e3e3;
  /* Card */

  box-shadow: 0px 4px 12px -2px rgba(7, 19, 39, 0.03), 0px 3px 3px -2px rgba(7, 19, 39, 0.03), 0px 1px 2px -4px rgba(7, 19, 39, 0.02);
  border-radius: 12px;
`;

let styleNotSet = css`
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;

  /* White/400 */

  color: #d2d2d2;
`;

let styleIcon = css`
  cursor: pointer;
`;

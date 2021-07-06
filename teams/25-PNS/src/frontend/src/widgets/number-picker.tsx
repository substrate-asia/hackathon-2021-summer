import React, { FC } from "react";
import { css, cx } from "@emotion/css";
import { center, rowParted, Space } from "@worktools/flex-styles";
import { Minus, Plus } from "react-feather";

let NumberPicker: FC<{ value: number; className?: string; onChange: (value: number) => void }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={cx(rowParted, styleContainer, props.className)}>
      <div
        className={cx(center, styleIcon)}
        onClick={() => {
          if (props.value > 1) {
            props.onChange(props.value - 1);
          }
        }}
      >
        <Minus color={"#252424"} size={16} />
      </div>
      <Space width={8} />
      <span className={styleNumber}>{props.value}</span>
      <Space width={8} />
      <div
        className={cx(center, styleIcon)}
        onClick={() => {
          props.onChange(props.value + 1);
        }}
      >
        <Plus color={"#252424"} size={16} />
      </div>
    </div>
  );
});

export default NumberPicker;

let styleNumber = css`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 33px;

  /* Black/800 */

  color: #252424;
`;

let styleIcon = css`
  width: 30px;
  height: 30px;

  /* White/200 */

  background: #f3f3f3;
  border-radius: 1.125e6px;
`;

let styleContainer = css`
  height: 38px;
  padding: 0 4px;

  /* White/100 */

  background: #f8f8f8;
  border-radius: 100000px;

  cursor: pointer;
`;

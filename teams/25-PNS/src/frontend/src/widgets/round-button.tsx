import React, { FC } from "react";
import { css, cx } from "@emotion/css";
import { center } from "@worktools/flex-styles";
import { Loader } from "react-feather";

let RoundButton: FC<{ className?: string; filled?: boolean; disabled?: boolean; isLoading?: boolean; text?: string; onClick: () => void }> = React.memo(
  (props) => {
    /** Plugins */
    /** Methods */
    /** Effects */

    /** Renderers */

    let disabled = props.disabled || props.isLoading;

    return (
      <div
        className={cx(
          center,
          styleContainer,
          props.filled ? styleFilled : styleNormal,
          disabled ? null : props.filled ? styleFilledActions : styleActions,
          disabled ? (props.filled ? styleDisabledFilled : styleDisabled) : null,
          props.className
        )}
        onClick={
          disabled
            ? null
            : () => {
                props.onClick();
              }
        }
      >
        {props.isLoading ? <Loader size={16} color={props.filled ? "#FFF2F9" : "#FEAFD3"} /> : props.text}
      </div>
    );
  }
);

export default RoundButton;

let styleContainer = css`
  user-select: none;

  height: 32px;
  min-width: 80px;
  padding: 0 16px;
  cursor: pointer;
  font-size: 14px;
`;

let styleNormal = css`
  /* White/100 */

  background: #f8f8f8;
  /* White/300 */

  border: 1px solid #e3e3e3;
  box-shadow: 0px 1px 0px rgba(27, 31, 35, 0.04);
  border-radius: 1e6px;

  color: #bf306b;
`;

let styleActions = css`
  &:hover {
    /* White/200 */

    /* White/200 */

    background: #f3f3f3;
  }

  &:active {
    /* White/200 */

    background: #f3f3f3;
    /* White/300 */

    border: 1px solid #e3e3e3;
    box-shadow: 0px 1px 0px rgba(27, 31, 35, 0.04);
    border-radius: 1e6px;
  }
`;

let styleLoading = css`
  cursor: not-allowed;
  /* Cerise/100 */

  background: #fff1f8;
  /* Cerise/100 */

  border: 2px solid #fff1f8;
  border-radius: 1e6px;
`;

let styleFilled = css`
  /* Cerise/400 */

  background: #e5458d;
  /* Cerise/500 */

  border: 2px solid #db3680;
  /* Cerise/400 */

  box-shadow: 2px 3px 0px rgba(219, 54, 128, 0.15);
  border-radius: 1e6px;

  /* White/fff */

  color: #ffffff;
`;

let styleFilledActions = css`
  :hover {
    /* Cerise/500 */

    background: #db3680;
  }

  :active {
    /* Cerise/500 */

    background: #db3680;
    /* Cerise/600 */

    border: 1px solid #bf306b;
    box-shadow: 0px 1px 0px rgba(229, 69, 141, 0.24);
    border-radius: 1e6px;
  }
`;

let styleDisabled = css`
  cursor: not-allowed;
  /* White/50 */

  background: #fcfcfc;
  /* White/300 */

  border: 1px solid #e3e3e3;
  box-shadow: 0px 1px 0px rgba(27, 31, 35, 0.04);
  border-radius: 1e6px;
  /* Cerise/200 */

  color: #feafd3;
`;

let styleDisabledFilled = css`
  cursor: not-allowed;

  /* Cerise/200 */

  background: #feafd3;
  /* Cerise/200 */

  border: 1px solid #feafd3;
  box-shadow: 0px 1px 0px rgba(229, 69, 141, 0.24);
  border-radius: 1e6px;
`;

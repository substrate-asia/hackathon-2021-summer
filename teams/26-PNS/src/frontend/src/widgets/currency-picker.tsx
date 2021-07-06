import React, { FC, useEffect } from "react";
import { css, cx } from "@emotion/css";
import { getLanguagePreference, setLanguagePreference } from "lang/locales";
import { rowCenter, rowMiddle, rowParted, Space } from "@worktools/flex-styles";
import { Check, ChevronDown } from "react-feather";
import { useDropdownArea } from "@worktools/dropdown";

export type Currency = "DOT" | "BTC" | "USD" | "RMB";

let support_currenties: Currency[] = ["DOT", "BTC", "USD", "RMB"];

let CurrencyPicker: FC<{ value: Currency; className?: string; onChange: (c: Currency) => void }> = React.memo((props) => {
  /** Plugins */

  let dropdownPlugin = useDropdownArea({
    alignToRight: true,
    cardClassName: styleMenuContainer,
    hideClose: true,
    width: 120,
    renderContent: () => {
      return (
        <div>
          {support_currenties.map((c) => {
            return (
              <div
                key={c}
                className={cx(rowParted, styleItem)}
                onClick={() => {
                  props.onChange(c);
                  dropdownPlugin.onUserClose();
                }}
              >
                <span>{c}</span>
                {props.value == c ? <Check /> : null}
              </div>
            );
          })}
        </div>
      );
    },
  });

  /** Methods */
  /** Effects */

  useEffect(() => {
    // openMenu(); // DEBUG
  }, []);
  /** Renderers */

  return (
    <div
      className={cx(rowParted, styleContainer, props.className)}
      ref={dropdownPlugin.triggerEl}
      onClick={() => {
        dropdownPlugin.openMenu();
      }}
    >
      {props.value}
      <Space width={4} />
      <ChevronDown color={"#0f0e0e"} size={14} />

      {dropdownPlugin.ui}
    </div>
  );
});

export default CurrencyPicker;

let styleContainer = css`
  cursor: pointer;
  min-width: 88px;
  height: 34px;
  padding: 0 12px;

  /* White/200 */

  background: #f3f3f3;
  border-radius: 100000px;
`;

let styleItem = css`
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
  /* identical to box height */

  display: flex;
  align-items: center;

  /* Black/900 */

  color: #0f0e0e;
  cursor: pointer;
  padding: 0 16px;

  &:hover {
    /* Red/50 */

    background: #fff8f8;
    border-radius: 6px;
  }
`;

let styleMenuContainer = css`
  min-height: 64px;
  padding: 8px 0;
`;

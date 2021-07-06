import React, { FC, ReactNode, useEffect, useState } from "react";
import { css, cx } from "@emotion/css";
import { expand, row, rowMiddle, rowParted, Space } from "@worktools/flex-styles";
import RoundButton from "widgets/round-button";
import { lang } from "lang/locales";
import { Alert } from "antd";
import { AlertTriangle } from "react-feather";
import { ThemeColor } from "styles/colors";
import NumberPicker from "widgets/number-picker";
import CurrencyPicker, { Currency } from "widgets/currency-picker";
import { useDomainPrice } from "hooks/domain";

let RegisterForm: FC<{ className?: string; domain: string; onRegister: () => void }> = React.memo((props) => {
  let [years, setYears] = useState(1);
  let [price, setPrice] = useState(null);
  let [currency, setCurrency] = useState("DOT");

  /** Plugins */

  let domainPricePlugin = useDomainPrice(props.domain, years);

  /** Methods */
  /** Effects */

  /** Renderers */

  let renderField = (label: string, value: ReactNode) => {
    return (
      <div className={rowParted}>
        <span className={styleLabel}>{label}</span>
        {value}
      </div>
    );
  };

  return (
    <div className={cx(row, props.className)}>
      <div className={styleLeft}>
        {renderField(
          lang.register_period,
          <div className={rowMiddle}>
            <NumberPicker
              value={years}
              onChange={(v) => {
                setYears(v);
              }}
            />
            <Space width={8} />
            <span className={styleYears}>{lang.years}</span>
          </div>
        )}
        <Space height={16} />
        <Alert
          type={"warning"}
          className={styleAlertHint}
          message={lang.hint_increase_peroid}
          showIcon
          icon={<AlertTriangle size={16} color={ThemeColor.cerise500} />}
        />
        <Space height={16} />
        {renderField(lang.register_price, <span className={styleValue}>{domainPricePlugin.price || "-"}</span>)}
        <Space height={32} />
        {renderField(
          lang.estimated_gas,
          <div className={rowMiddle}>
            <span className={styleValueHint}>{lang.at_least}</span>
            <Space width={12} />

            <span className={styleValue}>{"TODO"}</span>
          </div>
        )}
      </div>
      <div className={cx(expand, styleRight)}>
        <div className={rowParted}>
          <span />
          <CurrencyPicker
            value={currency as Currency}
            onChange={(c) => {
              setCurrency(c);
            }}
          />
        </div>
        <div className={rowParted}>
          <span />
          <span className={styleHintTitle}>{lang.estimated_total_details}</span>
        </div>
        <div className={rowParted}>
          <span />
          <span className={styleTotal}>TODO</span>
        </div>
        <div className={rowParted}>
          <span />
          <span className={styleHintTotal}>{lang.price_total_detail}</span>
        </div>
        <Space height={64} />
        <div>
          <RoundButton
            text={lang.register}
            filled
            onClick={() => {
              props.onRegister();
            }}
          />
        </div>
      </div>
    </div>
  );
});

export default RegisterForm;

let styleLeft = css`
  width: 60%;

  padding-right: 32px;
  margin-right: 32px;

  border-right: 1px solid #f3f3f3;
`;

let styleRight = css``;

let styleLabel = css`
  font-size: 14px;
  line-height: 19px;

  /* White/600 */

  color: #9b9b9b;
`;

let styleValue = css`
  font-weight: 500;
  font-size: 22px;
  line-height: 30px;
  /* identical to box height */

  /* Black/900 */

  color: #0f0e0e;
`;

let styleValueHint = css`
  font-size: 16px;
  line-height: 22px;

  /* Black/500 */

  color: #676666;
`;

let styleAlertHint = css`
  .ant-alert-message {
    font-size: 13px;

    /* Yellow/700 */

    color: #e78000;
  }
`;

let styleHintTitle = css`
  font-size: 14px;
  line-height: 19px;

  /* Black/500 */

  color: #676666;
`;

let styleHintTotal = css`
  font-size: 13px;
  line-height: 18px;
  /* White/500 */

  color: #bebebe;
`;

let styleTotal = css`
  font-weight: 800;
  font-size: 38px;
  line-height: 52px;
  /* identical to box height */

  /* Black/900 */

  color: #0f0e0e;
`;

let styleYears = css`
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;

  /* Black/800 */

  color: #252424;
`;

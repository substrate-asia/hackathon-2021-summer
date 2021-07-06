import React, { FC, useState } from "react";
import { css, cx } from "@emotion/css";
import { center, column, expand, rowMiddle, rowParted, Space } from "@worktools/flex-styles";
import { lang } from "lang/locales";
import { Check, Loader } from "react-feather";
import { ThemeColor } from "styles/colors";
import DomainTitle from "pages/manage/details/domain-title";
import IconLoading from "widgets/icons/icon-loading";

let RegisterProcessing: FC<{ className?: string }> = React.memo((props) => {
  let [step, setStep] = useState<1 | 2 | 3>(1);

  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */

  let renderStep1 = () => {
    return (
      <div
        className={styleStep}
        onClick={() => {
          setStep(1);
        }}
      >
        <div className={cx(rowParted, styleStepHeader)}>
          <div className={rowMiddle}>
            <div className={cx(center, styleCircle, step > 1 ? styleFinishedCircle : null)}>1</div>

            <Space width={16} />
            <div className={styleTitle}>{lang.request_register}</div>
          </div>
          {step === 1 ? <IconLoading size={16} color={ThemeColor.cerise500} /> : <Check size={16} color={ThemeColor.cerise500} />}
        </div>
        <Space height={8} />
        {step == 1 ? <div className={styleContent}>{lang.request_register_detial}</div> : null}
      </div>
    );
  };

  let renderStep2 = () => {
    return (
      <div
        className={cx(styleStep, step < 2 ? styleNotYet : null)}
        onClick={() => {
          setStep(2);
        }}
      >
        <div className={cx(rowParted, styleStepHeader)}>
          <div className={rowMiddle}>
            <div className={cx(center, styleCircle, step > 2 ? styleFinishedCircle : null)}>2</div>

            <Space width={16} />
            <div className={styleTitle}>{lang.wait_1_min}</div>
          </div>
          {step === 2 ? <IconLoading size={16} color={ThemeColor.cerise500} /> : step === 3 ? <Check size={16} color={ThemeColor.cerise500} /> : null}
        </div>
        <Space height={8} />
        {step === 2 ? <div className={styleContent}>{lang.wait_1_min_detail}</div> : null}
      </div>
    );
  };

  let renderStep3 = () => {
    return (
      <div
        className={cx(styleStep, step < 3 ? styleNotYet : null)}
        onClick={() => {
          setStep(3);
        }}
      >
        <div className={cx(rowParted, styleStepHeader)}>
          <div className={rowMiddle}>
            <div className={cx(center, styleCircle)}>3</div>
            <Space width={16} />
            <div className={styleTitle}>{lang.complete_registration}</div>
          </div>
          {step === 3 ? <Check size={16} color={ThemeColor.cerise500} /> : null}
        </div>
        <Space height={8} />
      </div>
    );
  };

  return (
    <div className={cx(expand, props.className)}>
      <DomainTitle domain={"TODO"} />
      <Space height={20} />
      <div className={cx(column, styleCard)}>
        {renderStep1()}
        {renderStep2()}
        {renderStep3()}
      </div>
    </div>
  );
});

export default RegisterProcessing;

let styleStep = css`
  white-space: pre-line;
`;

let styleStepHeader = css`
  padding: 0 24px;
  height: 58px;
  /* Cerise/50 */

  background: #fff7fb;
  border-radius: 12px;
`;

let styleCircle = css`
  width: 26px;
  height: 26px;

  font-style: normal;
  font-weight: 500;
  font-size: 14.2257px;
  line-height: 21px;
  border-radius: 12px;
  /* or 150% */

  /* Background/White FFF */

  color: #ffffff;
  /* Cerise/300 */

  /* Cerise/500 */

  background: #db3680;

  border: 2px solid #fa7ab5;
`;

let styleTitle = css`
  font-weight: 800;
  font-size: 15px;
  line-height: 20px;
  display: flex;
  align-items: center;

  /* Black/900 */

  color: #0f0e0e;
`;

let styleCard = css`
  /* White/fff */

  background: #ffffff;
  /* White/300 */

  border: 1px solid #e3e3e3;
  /* Card */

  box-shadow: 0px 4px 12px -2px rgba(7, 19, 39, 0.03), 0px 3px 3px -2px rgba(7, 19, 39, 0.03), 0px 1px 2px -4px rgba(7, 19, 39, 0.02);
  border-radius: 12px;

  padding: 24px;
`;

let styleContent = css`
  padding: 0 24px 24px 66px;
  font-size: 14px;
  line-height: 19px;

  /* Black/500 */

  color: #676666;
`;

let styleFinishedCircle = css`
  /* Cerise/300 */
  background: #fa7ab5;

  /* Cerise/200 */
  border-color: #feafd3;
`;

let styleNotYet = css`
  opacity: 0.2;
`;

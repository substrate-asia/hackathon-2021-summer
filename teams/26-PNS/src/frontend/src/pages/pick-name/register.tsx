import React, { FC } from "react";
import { css, cx } from "@emotion/css";
import RoundButton from "widgets/round-button";
import { lang } from "lang/locales";
import { center, expand, row, Space } from "@worktools/flex-styles";
import { ArrowLeft } from "react-feather";
import DomainTitle from "pages/manage/details/domain-title";
import RegisterForm from "./register/register-form";
import { ContractAddrs, getOwner, setup, isValidDomain, signLoginMessage, getAccount, getRentPrice } from "../../../sdk/src/sdk";


let PageRegister: FC<{ className?: string }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */

  return (
    <div className={cx(expand, props.className)}>
      <Space height={30} />
      <DomainTitle domain={"TODO"} />
      <Space height={26} />

      <div className={styleCard}>
        <div className={styleTitle}>{lang.name_register}</div>
        <Space height={32} />
        <RegisterForm
          domain={props.domain}
          onRegister={async () => {
            console.log("TODO Reg");
            console.log("TODO");
           console.log("polkadot.eth getRentPrice", await getRentPrice("polkadot", 86400));
          }}
        />
      </div>
    </div>
  );
});

export default PageRegister;

let styleCard = css`
  padding: 24px 32px;
  /* White/fff */

  background: #ffffff;
  /* White/200 */

  border: 1px solid #eeeeee;
  /* Card */

  box-shadow: 0px 4px 12px -2px rgba(7, 19, 39, 0.03), 0px 3px 3px -2px rgba(7, 19, 39, 0.03), 0px 1px 2px -4px rgba(7, 19, 39, 0.02);
  border-radius: 12px;
`;

let styleTitle = css`
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;

  /* Black/900 */

  color: #0f0e0e;
`;

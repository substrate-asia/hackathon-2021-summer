import { css } from "@emotion/css";
import { rowMiddle, rowParted, Space } from "@worktools/flex-styles";
import { MesonModal } from "@worktools/meson-modal";
import { Input } from "antd";
import { lang } from "lang/locales";
import RegisterForm from "pages/pick-name/register/register-form";
import React, { useState, ReactNode } from "react";
import RoundButton from "widgets/round-button";

export let useRenewModal = (props: { domain: string; afterChange: () => void }) => {
  // Model
  let [editing, setEditing] = useState(false);

  // Plugins

  // View
  let ui = (
    <MesonModal
      title={lang.renew}
      disableMoving
      visible={editing}
      cardClassName={styleCard}
      headerClassName={styleHeader}
      onClose={() => {
        setEditing(false);
      }}
      renderContent={() => {
        return (
          <div className={styleContent}>
            <RegisterForm
              domain={props.domain}
              onRegister={() => {
                console.log("TODO");
              }}
            />
            <Space height={16} />
          </div>
        );
      }}
    />
  );

  // Controller
  let edit = () => {
    setEditing(true); // TODO state
  };
  return { ui, edit };
};

let styleCard = css`
  border-radius: 12px 12px 12px 12px;
  min-width: 680px;
`;

let styleContent = css`
  padding: 16px 24px;
`;

let styleTitle = css`
  font-weight: 800;
  font-size: 14px;
  line-height: 19px;

  /* Black/800 */

  color: #252424;
`;

let styleHeader = css`
  /* Panel / 100 */

  background: #fbfafa;
  /* White/200 */

  border-bottom: 1px solid #f3f3f3;
  border-radius: 12px 12px 0px 0px;
`;

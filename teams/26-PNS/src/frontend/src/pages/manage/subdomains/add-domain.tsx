import { css } from "@emotion/css";
import { rowMiddle, rowParted, Space } from "@worktools/flex-styles";
import { MesonModal } from "@worktools/meson-modal";
import { Input } from "antd";
import { lang } from "lang/locales";
import React, { useState, ReactNode } from "react";
import RoundButton from "widgets/round-button";
import { Server } from "react-feather";

export let useAddDomainModal = (props: { afterChange: () => void }) => {
  // Model
  let [editing, setEditing] = useState(false);
  let [label, setLabel] = useState("");

  // Plugins

  // View
  let ui = (
    <MesonModal
      title={
        <div className={rowMiddle}>
          <Server size={16} color={"#000000"} />
          <Space width={8} />
          {lang.add_subdomain}
        </div>
      }
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
            <div className={styleTitle}>{lang.hint_transfer_name}</div>
            <Space height={8} />
            <Input
              value={label}
              placeholder={lang.type_in_subdomain_label}
              autoFocus
              onChange={(event) => {
                setLabel(event.target.value);
              }}
            />
            <Space height={24} />
            <div className={rowParted}>
              <span />
              <div className={rowMiddle}>
                <RoundButton
                  text={lang.cancel}
                  onClick={() => {
                    setEditing(false);
                  }}
                />
                <Space width={8} />
                <RoundButton
                  filled
                  text={lang.save}
                  onClick={() => {
                    console.log("TODO");
                  }}
                />
              </div>
            </div>
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
  min-width: 440px;
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

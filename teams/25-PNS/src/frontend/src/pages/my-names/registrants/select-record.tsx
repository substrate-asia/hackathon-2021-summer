import { css } from "@emotion/css";
import { DropdownMenu } from "@worktools/dropdown";
import { rowMiddle, rowParted, Space } from "@worktools/flex-styles";
import { MesonModal } from "@worktools/meson-modal";
import { Input } from "antd";
import { formatLocale, lang } from "lang/locales";
import React, { useState, ReactNode } from "react";
import { File } from "react-feather";
import { ThemeColor } from "styles/colors";
import RoundButton from "widgets/round-button";

export let useSelectRecord = (props: { afterChange: () => void }) => {
  // Model
  let [editing, setEditing] = useState(false);

  // Plugins

  // View
  let ui = (
    <MesonModal
      title={
        <div className={rowMiddle}>
          <File size={16} color={ThemeColor.black500} />
          <Space width={8} />
          {lang.reverse_record}
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
        let [part1, part2] = lang.hint_reserve_record.split("{id}");

        return (
          <div className={styleContent}>
            <div className={styleDesc}>
              {part1}
              <span className={styleId}>TODO</span>
              {part2}
            </div>
            <Space height={8} />
            <DropdownMenu
              allowClear
              areaClassName={styleArea}
              className={styleMenu}
              value={"TODO"}
              items={[
                {
                  value: "TODO",
                  title: "TODO",
                },
                {
                  value: "TODO2",
                  title: "TODO2",
                },
                {
                  value: "TODO3",
                  title: "TODO3",
                },
                {
                  value: "TODO4",
                  title: "TODO4",
                },
              ]}
              onSelect={(value) => {
                console.log("value", value);
              }}
              placeholder={"TODO"}
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
  width: 580px;
`;

let styleContent = css`
  padding: 16px 24px;
`;

let styleDesc = css`
  white-space: pre-line;
  font-weight: normal;
  font-size: 13px;
  line-height: 150%;

  /* Black / 400 */

  color: #8a8484;
`;

let styleHeader = css`
  /* Panel / 100 */

  background: #fbfafa;
  /* White/200 */

  border-bottom: 1px solid #f3f3f3;
  border-radius: 12px 12px 0px 0px;
`;

let styleId = css`
  color: black;
`;

let styleMenu = css`
  width: 100%;
`;

let styleArea = css`
  width: 100%;
`;

import React, { FC } from "react";
import { css, cx } from "@emotion/css";
import { lang } from "lang/locales";
import { IMesonFieldItem, useMesonFields } from "@worktools/meson-form";
import FormSection from "./form-section";
import { rowMiddle, rowParted, Space } from "@worktools/flex-styles";
import { Edit } from "react-feather";
import { ThemeColor } from "styles/colors";
import CopyInput from "widgets/copy-input";

let formItems: IMesonFieldItem[] = [
  {
    type: "decorative",
    render: () => {
      return <FormSection title={lang.address} />;
    },
  },
  {
    type: "custom",
    name: "TODO1",
    label: "DOT", // TODO
    render: (value: string) => {
      return <CopyInput value={"TODO TODO"} />;
    },
  },
  {
    type: "custom",
    name: "TODO2",
    label: "KSM", // TODO
    render: (value: string) => {
      // TODO
      return <CopyInput value={undefined} />;
    },
  },
  {
    type: "input",
    name: "TODO3",
    disabled: true,
    label: "ETH", // TODO
  },
  {
    type: "input",
    name: "TODO4",
    disabled: true,
    label: "BTC", // TODO
  },
  {
    type: "decorative",
    render: () => {
      return <FormSection title={lang.content} />;
    },
  },
  {
    type: "input",
    name: "TODO 5",
    disabled: true,
    label: lang.content, // TODO
  },
  {
    type: "decorative",
    render: () => {
      return <FormSection title={lang.text_record} />;
    },
  },
  {
    type: "input",
    name: "TODO 6",
    disabled: true,
    label: lang.email, // TODO
  },
  {
    type: "input",
    name: "TODO 7",
    disabled: true,
    label: "Notice", // TODO
  },
  {
    type: "input",
    name: "TODO 8",
    disabled: true,
    label: "vnd.twitter", // TODO
  },
  {
    type: "input",
    name: "TODO 9",
    disabled: true,
    label: "vdn.github", // TODO
  },
  {
    type: "input",
    name: "TODO 10",
    disabled: true,
    label: lang.url, // TODO
  },
  {
    type: "input",
    name: "TODO 11",
    disabled: true,
    label: lang.avatar, // TODO
  },
];

let NameDetails: FC<{ data: any; className?: string; onEdit: () => void }> = React.memo((props) => {
  /** Plugins */

  let formPlugin = useMesonFields({
    initialValue: {} as any, // TODO
    items: formItems,
    labelClassName: styleLabel,
    itemsClassName: styleItems,

    fullWidth: true,
    onSubmit: (form) => {
      console.log("TODO");
    },
  });

  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={cx(styleContainer, props.className)}>
      <div className={rowParted}>
        <span className={styleTitle}>{lang.name_details}</span>
        <div
          className={cx(rowMiddle, styleLink)}
          onClick={() => {
            props.onEdit();
          }}
        >
          <Edit color={ThemeColor.cerise500} size={14} />
          <Space width={8} />
          {lang.edit_record}
        </div>
      </div>
      <div>{formPlugin.ui}</div>
    </div>
  );
});

export default NameDetails;

let styleContainer = css`
  padding: 16px;

  /* White/fff */

  background: #ffffff;
  /* White/300 */

  border: 1px solid #e3e3e3;
  /* Card */

  box-shadow: 0px 4px 12px -2px rgba(7, 19, 39, 0.03), 0px 3px 3px -2px rgba(7, 19, 39, 0.03), 0px 1px 2px -4px rgba(7, 19, 39, 0.02);
  border-radius: 12px;
`;

let styleTitle = css`
  font-weight: 500;
  font-size: 18px;
  line-height: 25px;
  /* identical to box height */

  /* Black/900 */

  color: #0f0e0e;
`;

let styleLabel = css`
  min-width: 100px;
`;

let styleItems = css`
  padding-right: 80px;
`;

let styleLink = css`
  cursor: pointer;
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  /* identical to box height */

  letter-spacing: 0.02em;

  /* Cerise/500 */

  color: #db3680;
`;

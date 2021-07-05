import React, { FC, useEffect } from "react";
import { css, cx } from "@emotion/css";
import DomainTitle from "./domain-title";
import { expand, rowMiddle, rowParted, Space } from "@worktools/flex-styles";
import FormSection from "./form-section";
import { IMesonFieldItem, useMesonFields } from "@worktools/meson-form";
import { lang } from "lang/locales";
import RoundButton from "widgets/round-button";

let formItems: IMesonFieldItem[] = [
  {
    type: "decorative",
    render: () => {
      return <FormSection title={lang.address} />;
    },
  },
  {
    type: "input",
    name: "TODO1",

    label: "DOT", // TODO
  },
  {
    type: "input",
    name: "TODO2",

    label: "KSM", // TODO
  },
  {
    type: "input",
    name: "TODO3",

    label: "ETH", // TODO
  },
  {
    type: "input",
    name: "TODO4",

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

    label: lang.email, // TODO
  },
  {
    type: "input",
    name: "TODO 7",

    label: "Notice", // TODO
  },
  {
    type: "input",
    name: "TODO 8",

    label: "vnd.twitter", // TODO
  },
  {
    type: "input",
    name: "TODO 9",

    label: "vdn.github", // TODO
  },
  {
    type: "input",
    name: "TODO 10",

    label: lang.url, // TODO
  },
  {
    type: "input",
    name: "TODO 11",

    label: lang.avatar, // TODO
  },
];

let DetailsForm: FC<{ className?: string; onSubmit: () => void; onCancel: () => void }> = React.memo((props) => {
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

  useEffect(() => {
    // scroll to top
    document.body.scrollTo(0, 0);
  }, []);

  /** Renderers */
  return (
    <div className={cx(expand, props.className)}>
      <DomainTitle domain="TODO" />
      <Space height={16} />
      <div className={styleCard}>
        <div className={styleHeader}>{"TODO edit"}</div>
        <div className={styleBody}>{formPlugin.ui}</div>
        <div className={cx(rowParted, styleFooter)}>
          <div className={styleHint}>{lang.edit_record_hint}</div>
          <div className={rowMiddle}>
            <RoundButton
              text={lang.cancel}
              onClick={() => {
                console.log("TODO");
                props.onCancel();
              }}
            />
            <Space width={8} />
            <RoundButton
              filled={true}
              text={lang.save}
              onClick={() => {
                console.log("TODO");
                props.onSubmit();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default DetailsForm;

let styleCard = css`
  /* White/fff */

  background: #ffffff;
  /* White/300 */

  border: 1px solid #e3e3e3;
  box-sizing: border-box;
  /* Card */

  box-shadow: 0px 4px 12px -2px rgba(7, 19, 39, 0.03), 0px 3px 3px -2px rgba(7, 19, 39, 0.03), 0px 1px 2px -4px rgba(7, 19, 39, 0.02);
  border-radius: 12px;
`;

let styleHeader = css`
  /* White/50 */

  background: #fcfcfc;
  /* White/300 */

  border-bottom: 1px solid #e3e3e3;
  box-sizing: border-box;

  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  padding: 24px 24px;
  font-weight: 500;

  font-size: 18px;
  line-height: 25px;
  /* identical to box height */

  display: flex;
  align-items: center;

  /* Black/900 */

  color: #0f0e0e;

  border-radius: 12px 12px 0 0;
`;

let styleLabel = css`
  min-width: 100px;
`;

let styleItems = css`
  padding-right: 80px;
`;

let styleBody = css`
  padding: 16px 16px;
`;

let styleFooter = css`
  height: 74px;

  /* White/50 */

  background: #fcfcfc;
  /* White/300 */

  border-top: 1px solid #e3e3e3;
  padding: 24px;
`;

let styleHint = css`
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;

  /* White/600 */

  color: #9b9b9b;
`;

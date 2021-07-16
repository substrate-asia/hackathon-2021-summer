import React, { FC, ReactNode } from "react";
import { css, cx } from "@emotion/css";
import { lang } from "lang/locales";
import { row, rowMiddle, Space } from "@worktools/flex-styles";
import { ArrowRight, Copy } from "react-feather";
import { ThemeColor } from "styles/colors";
import { message } from "antd";
import { useTransferModal } from "./name-info/transfer";
import { useControllerModal } from "./name-info/change-controller";
import { useResolverModal } from "./name-info/change-resolver";
import { useRenewModal } from "./name-info/renew";

let NameInfo: FC<{ className?: string; domain: string }> = React.memo((props) => {
  /** Plugins */

  let transferPlugin = useTransferModal({
    afterChange: () => {
      console.log("TODO");
    },
  });
  let controllerPlugin = useControllerModal({
    afterChange: () => {
      console.log("TODO");
    },
  });
  let resolverPlugin = useResolverModal({
    afterChange: () => {
      console.log("TODO");
    },
  });
  let renewPlugin = useRenewModal({
    domain: props.domain,
    afterChange: () => {
      console.log("TODO");
    },
  });

  /** Methods */
  /** Effects */
  /** Renderers */

  let renderField = (title: string, children: ReactNode) => {
    return (
      <div className={styleField}>
        <div className={styleFieldTitle}>{title}</div>
        <Space height={8} />
        {children}
      </div>
    );
  };

  let renderCopyContent = (content: string, className?: string) => {
    return (
      <div className={row}>
        <div className={cx(styleContent, className)}>{content}</div>
        <Space width={8} />
        <div>
          <Copy
            color={ThemeColor.cerise500}
            size={14}
            className={styleIcon}
            onClick={() => {
              console.log("TODO");
              message.info(lang.copied);
            }}
          />
        </div>
      </div>
    );
  };

  let renderLinkButton = (text: string, onClick: () => void) => {
    return (
      <div className={cx(rowMiddle, styleLinkButton)} onClick={onClick}>
        <span>{text}</span>
        <Space width={8} />
        <ArrowRight size={14} color={ThemeColor.cerise500} />
      </div>
    );
  };

  return (
    <div className={cx(styleContainer, props.className)}>
      <div className={styleTitle}>{lang.name_details}</div>

      <div>
        {renderField(lang.parent, <div className={styleParent}>TODO</div>)}
        {renderField(
          lang.registration,
          <div>
            {renderCopyContent("TODO TODO TODO TODO TODOTODO TODO TODO TODO TODOTODO TODO TODO TODO TODOTODO TODO TODO TODO TODOTODO TODO TODO TODO TODO")}
            <Space height={24} />
            {renderLinkButton(lang.transfer, () => {
              transferPlugin.edit();
            })}
          </div>
        )}
        {renderField(
          lang.controller,
          <div>
            {renderCopyContent("TODO")}
            <Space height={24} />
            {renderLinkButton(lang.set, () => {
              controllerPlugin.edit();
            })}
          </div>
        )}
        {renderField(
          lang.expires_date,
          <div>
            {renderCopyContent("TODO", styleLarger)}
            <Space height={24} />
            {renderLinkButton(lang.renew, () => {
              renewPlugin.edit();
            })}
          </div>
        )}
        {renderField(
          lang.resolver,
          <div>
            {renderCopyContent("TODO", styleLarger)}
            <Space height={24} />
            {renderLinkButton(lang.set, () => {
              resolverPlugin.edit();
            })}
          </div>
        )}
      </div>
      {transferPlugin.ui}
      {controllerPlugin.ui}
      {resolverPlugin.ui}
      {renewPlugin.ui}
    </div>
  );
});

export default NameInfo;

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

let styleField = css`
  vertical-align: top;
  margin: 20px 0 40px 0;
  width: 50%;
  min-height: 160px;

  display: inline-block;
`;

let styleFieldTitle = css`
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;

  /* White/600 */

  color: #9b9b9b;
`;

let styleIcon = css`
  cursor: pointer;
  margin-top: 4px;
`;

let styleContent = css`
  word-break: break-all;

  flex-grow: 0;
  flex-basis: 70%;
  flex-basis: calc(100% - 80px);
  max-width: max-content;
`;

let styleParent = css`
  font-weight: 500;
  font-size: 24px;
  line-height: 34px;
  /* identical to box height */

  /* Cerise/500 */

  color: #db3680;
`;

let styleLarger = css`
  font-size: 20px;
`;

let styleLinkButton = css`
  cursor: pointer;

  font-size: 13px;
  line-height: 18px;
  /* identical to box height */

  letter-spacing: 0.02em;

  /* Cerise/500 */
  color: #db3680;
`;

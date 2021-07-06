import React, { FC } from "react";
import { css, cx } from "@emotion/css";

import AboutArea from "pages/sidebar/about-area";
import { ArrowLeft, Clipboard, File, Icon, Server } from "react-feather";
import { genRouter, GenRouterTypeTree } from "controller/generated-router";
import { rowMiddle, Space } from "@worktools/flex-styles";
import { lang } from "lang/locales";
import NavArea from "pages/sidebar/nav-area";
import IconClipboardNotes from "widgets/icons/icon-clipboard-notes";

let SidebarUnderManage: FC<{ className?: string; domain: string; router: GenRouterTypeTree["manage_"]["next"] }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */

  return (
    <div className={props.className}>
      <div>
        <div
          className={cx(rowMiddle, styleBack)}
          onClick={() => {
            // TODO meanings may be richer...
            history.back();
          }}
        >
          <ArrowLeft color={"#9B9B9B"} size={14} />
          <Space width={8} />
          {lang.back}
        </div>
      </div>
      <Space height={16} />
      <NavArea
        routerName={props.router?.name}
        entries={[
          {
            path: genRouter.manage_.details.name,
            name: lang.details,
            renderIcon: (color, size) => <IconClipboardNotes color={color} size={size} />,
            onClick: () => {
              genRouter.manage_.details.go(props.router.params.name);
            },
          },
          {
            path: genRouter.manage_.subdomains.name,
            name: lang.subdomains,
            renderIcon: (color, size) => <Server color={color} size={size} />,
            onClick: () => {
              genRouter.manage_.subdomains.go(props.router.params.name);
            },
          },
        ]}
      />
      <AboutArea />
    </div>
  );
});

export default SidebarUnderManage;

let styleBack = css`
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;

  padding: 0 18px;

  /* identical to box height, or 143% */

  display: flex;

  /* White/600 */

  color: #9b9b9b;
`;

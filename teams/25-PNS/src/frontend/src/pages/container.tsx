import React, { FC, useEffect } from "react";
import { css, cx } from "@emotion/css";
import { fullscreen, row, expand, column, Space, rowCenter, rowParted } from "@worktools/flex-styles";

import { HashRedirect, findRouteTarget } from "@worktools/ruled-router/lib/dom";
import Navbar from "./header/navbar";
import { genRouter, GenRouterTypeTree } from "../controller/generated-router";
import PageMyNames from "./my-names";
import PageSearch from "./search";
import PageJump from "./jump";

import { ThemeColor } from "../styles/colors";
import FooterPanel from "./footer-panel";

import { message } from "antd";
import PageManage from "./manage";
import PagePickName from "./pick-name";
import PageBrowseName from "./browse-name";
import PagePortal from "../portal/pages/portal-container";

let Container: FC<{ router: GenRouterTypeTree["next"] }> = React.memo((props) => {
  /** Methods */
  /** Effects */

  /** Renderers */

  // 使用 App 页面自己带的 landing 页面, 避免用户需要重复登录的问题
  if (props.router.name == "portal") {
    return <PagePortal />;
  }

  let renderViewBody = () => {
    switch (props.router.name) {
      case "search":
        return <PageSearch intialName={props.router.query.keyword} />;
      case "my-names":
        return <PageMyNames router={props.router?.next} />;
      case "manage":
        return <PageManage className={styleManagePage} router={props.router?.next} />;
      case "pick-name":
        return <PagePickName router={props.router?.next} />;
      case "browse-name":
        return <PageBrowseName />;
      case "home":
        return <HashRedirect to={genRouter.search.path()} noDelay />;
      default:
        return <div>Redirecting...</div>;
    }
  };

  let renderPage = () => {
    switch (props.router.name) {
      case "jump":
        return <PageJump jumpName={props.router.params.name} />;

      default:
        return renderViewBody();
    }
  };

  return (
    <div className={cx(fullscreen, column, styleContainer)}>
      <Navbar className={styleNav} />

      <div className={styleBody}>
        <div className={cx(row, styleCentered)}>{renderPage()}</div>
      </div>
      <FooterPanel />
    </div>
  );
});

export default Container;

const styleContainer = css`
  background-color: ${ThemeColor.white100};
  padding-top: 60px;
`;

let styleCentered = css`
  padding-top: 28px;
  max-width: 976px;
  margin: auto;
`;

let styleManagePage = css`
  width: 100%;
`;

let styleNav = css`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
`;

let styleBody = css`
  flex: 1;
`;

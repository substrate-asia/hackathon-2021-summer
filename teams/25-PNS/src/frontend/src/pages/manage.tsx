import React, { FC } from "react";
import { css, cx } from "@emotion/css";

import SidebarUnderManage from "./manage/sidebar";
import { row, rowParted, Space } from "@worktools/flex-styles";
import { GenRouterTypeTree } from "controller/generated-router";
import DomainDetails from "./manage/details";
import SubDomains from "./manage/subdomains";
import DetailsForm from "./manage/details/form";

let PageManage: FC<{ className?: string; router: GenRouterTypeTree["manage_"]["next"] }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */

  // TODO check domain registed or not

  /** Renderers */

  let renderPage = () => {
    switch (props.router?.name) {
      case "details":
        if (props.router?.next?.name == "edit") {
          return (
            <DetailsForm
              onSubmit={() => {}}
              onCancel={() => {
                history.back();
              }}
            />
          );
        }
        return <DomainDetails domain={props.router.params.name} />;
      case "subdomains":
        return <SubDomains />;
      default:
        console.info("router", props.router);
        return <div>Unknown page</div>;
    }
  };

  return (
    <div className={cx(row, props.className)}>
      <SidebarUnderManage domain={props.router.params?.name} router={props.router} />
      <Space width={52} />
      {renderPage()}
    </div>
  );
});

export default PageManage;

import React, { FC } from "react";
import { css, cx } from "@emotion/css";
import { genRouter, GenRouterTypeTree } from "controller/generated-router";
import NavArea from "./sidebar/nav-area";
import { expand, row, rowParted, Space } from "@worktools/flex-styles";
import AboutLink from "./sidebar/about-link";
import { lang } from "lang/locales";
import PageRegister from "./pick-name/register";
import { Heart, File, Bookmark, Clipboard, Server, Book } from "react-feather";
import DomainDetails from "./manage/details";
import SubDomains from "./manage/subdomains";
import RegisterProcessing from "./pick-name/processing";
import IconBookAlt from "widgets/icons/icon-book-alt";
import IconClipboardNotes from "widgets/icons/icon-clipboard-notes";

let PagePickName: FC<{ className?: string; router: GenRouterTypeTree["pickName_"]["next"] }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */

  console.log("pick name", props);

  /** Renderers */

  let renderBody = () => {
    switch (props.router?.name) {
      case "register":
        if (props.router.next?.name === "processing") {
          return <RegisterProcessing />;
        }

        return <PageRegister domain={props.router.params.name} />;
      case "details":
        return <DomainDetails viewOnly domain={props.router.params.name} />;
      case "subdomains":
        return <SubDomains viewOnly />;
      default:
        console.error("Unknown page:", props.router);
        return <div>TODO</div>;
    }
  };

  return (
    <div className={cx(expand, row, props.className)}>
      <div>
        <NavArea
          routerName={props.router?.name}
          entries={[
            {
              path: genRouter.pickName_.register.name,
              name: lang.register,
              renderIcon: (color, size) => <IconBookAlt color={color} size={size} />,
              onClick: () => {
                genRouter.pickName_.register.go(props.router.params.name);
              },
            },
            {
              path: genRouter.pickName_.details.name,
              name: lang.details,
              renderIcon: (color, size) => <IconClipboardNotes color={color} size={size} />,
              onClick: () => {
                genRouter.pickName_.details.go(props.router.params.name);
              },
            },
            {
              path: genRouter.pickName_.subdomains.name,
              name: lang.subdomains,
              renderIcon: (color, size) => <Server color={color} size={size} />,
              onClick: () => {
                genRouter.pickName_.subdomains.go(props.router.params.name);
              },
            },
          ]}
        />
        <Space height={16} />
        <AboutLink />
      </div>
      <Space width={16} />
      {renderBody()}
    </div>
  );
});

export default PagePickName;

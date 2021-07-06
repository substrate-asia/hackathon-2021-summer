import React, { FC } from "react";
import { css, cx } from "@emotion/css";
import DomainListTable from "./my-names/domain-list-table";
import { expand, row, Space } from "@worktools/flex-styles";
import { genRouter, GenRouterTypeTree } from "controller/generated-router";
import NavArea from "./sidebar/nav-area";
import { lang } from "lang/locales";
import { Heart, Search, File, Book, Clipboard } from "react-feather";
import PageRegistrants from "./my-names/registrants";
import PageControllers from "./my-names/controllers";
import AboutLink from "./sidebar/about-link";
import PageFavourites from "./my-names/favourites";
import { HashRedirect } from "@worktools/ruled-router";
import IconBookAlt from "widgets/icons/icon-book-alt";
import IconClipboardNotes from "widgets/icons/icon-clipboard-notes";

let PageMyNames: FC<{ className?: string; router: GenRouterTypeTree["myNames"]["next"] }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */

  let renderBody = () => {
    switch (props.router?.name) {
      case "registrants":
        return <PageRegistrants />;
      case "controllers":
        return <PageControllers />;
      case "favourites":
        return <PageFavourites />;
      case undefined:
      case null:
        return <HashRedirect noDelay to={genRouter.myNames.registrants.path()} />;
      default:
        console.error("Unknown page:", props.router);
        return <div>TODO</div>;
    }
  };

  return (
    <div className={cx(expand, row, styleContainer, props.className)}>
      <div>
        <NavArea
          routerName={props.router?.name}
          entries={[
            {
              path: genRouter.myNames.registrants.name,
              name: lang.registrants,
              renderIcon: (color, size) => <IconBookAlt color={color} size={size} />,
              onClick: () => {
                genRouter.myNames.registrants.go();
              },
            },
            {
              path: genRouter.myNames.controllers.name,
              name: lang.controllers,
              renderIcon: (color, size) => <IconClipboardNotes color={color} size={size} />,
              onClick: () => {
                genRouter.myNames.controllers.go();
              },
            },
            {
              path: genRouter.myNames.favourites.name,
              name: lang.favourites,
              renderIcon: (color, size) => <Heart color={color} size={size} />,
              onClick: () => {
                genRouter.myNames.favourites.go();
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

export default PageMyNames;

let styleContainer = css`
  padding-right: 80px;
`;

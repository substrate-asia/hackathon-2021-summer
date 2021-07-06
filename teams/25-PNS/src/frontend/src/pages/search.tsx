import React, { FC } from "react";
import { css, cx } from "@emotion/css";
import { genRouter, GenRouterTypeTree } from "controller/generated-router";
import SearchResults from "./search/search-results";
import { expand, row, Space } from "@worktools/flex-styles";
import NavArea from "./sidebar/nav-area";
import { lang } from "lang/locales";
import { AtSign, Heart, Search } from "react-feather";
import AboutArea from "./sidebar/about-area";

let PageSearch: FC<{ className?: string; intialName: string }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */

  return (
    <div className={cx(expand, row, styleSidebar, props.className)}>
      <div>
        <NavArea
          routerName={genRouter.search.name}
          entries={[
            {
              path: genRouter.search.name,
              name: lang.new_names,
              renderIcon: (color, size) => <Search color={color} size={size} />,
              onClick: () => {
                genRouter.search.go();
              },
            },
            {
              path: genRouter.myNames.name,
              name: lang.my_names,
              renderIcon: (color, size) => <AtSign color={color} size={size} />,
              onClick: () => {
                genRouter.myNames.registrants.go();
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
        <AboutArea />
      </div>
      <Space width={16} />
      <SearchResults initialName={props.intialName} />
    </div>
  );
});

export default PageSearch;

let styleSidebar = css`
  width: 24%;
`;

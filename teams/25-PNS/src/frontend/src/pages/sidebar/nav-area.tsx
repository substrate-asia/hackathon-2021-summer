import React, { FC, ReactNode } from "react";
import { css, cx } from "@emotion/css";
import { rowMiddle, Space } from "@worktools/flex-styles";
import { lang } from "../../lang/locales";
import { Box, Heart, AtSign, Smile, Icon, Search } from "react-feather";
import { ThemeColor } from "../../styles/colors";
import { genRouter, GenRouterTypeTree } from "../../controller/generated-router";

export type NavEntry = {
  path: string;
  name: string;
  renderIcon: (color: string, size: number) => ReactNode;
  onClick: () => void;
};

let NavArea: FC<{ className?: string; routerName: string; entries: NavEntry[] }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */

  let renderEntry = (entry: NavEntry) => {
    let selected = entry.path === props.routerName;
    return (
      <div
        className={cx(rowMiddle, styleTab, selected && styleSelected)}
        onClick={() => {
          entry.onClick();
        }}
        key={entry.path}
      >
        {entry.renderIcon(selected ? "#DB3680" : "#D2D2D2", 16)}
        <Space width={8} />
        {entry.name}
      </div>
    );
  };

  return (
    <div className={cx(styleContainer, props.className)}>
      {props.entries.map((entry) => {
        return renderEntry(entry);
      })}
    </div>
  );
});

export default NavArea;

let styleTab = css`
  height: 43px;
  /* padding: 0 18px; */
  cursor: pointer;

  /* White/400 */

  color: #d2d2d2;

  &:hover {
    /* Cerise/50 */
    /* White/100 */

    background: #f8f8f8;
    border-radius: 8px;
  }
`;

let styleContainer = css`
  width: 212px;

  /* White/fff */

  padding: 10px 18px;
`;

let styleSelected = css`
  /* Cerise/500 */
  color: #db3680;

  /* White/100 */

  background: #f8f8f8;
  border-radius: 6px;
`;

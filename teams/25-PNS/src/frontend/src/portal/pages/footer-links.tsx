import React, { FC, ReactNode } from "react";
import { css, cx } from "@emotion/css";
import { expand, row } from "@worktools/flex-styles";
import { portalLang } from "lang/locales";

let site_links = [
  {
    category: portalLang.overview,
    entries: [
      { text: portalLang.about, url: "", icon: null as ReactNode },
      { text: "FAQ", url: "" },
      { text: portalLang.support, url: "" },
      { text: "Build", url: "" },
    ],
  },
  {
    category: portalLang.technology,
    entries: [
      { text: portalLang.technology, url: "", icon: null as ReactNode },
      { text: portalLang.roadmap, url: "" },
    ],
  },
  {
    category: portalLang.community,
    entries: [
      { text: portalLang.community, url: "", icon: null as ReactNode },
      { text: portalLang.documentation, url: "" },
      { text: portalLang.brand_assets, url: "" },
      { text: portalLang.blog, url: "" },
    ],
  },
  {
    category: portalLang.links,
    entries: [
      { text: "Twitter", url: "", icon: null as ReactNode },
      { text: "GitHub", url: "" },
      { text: "Youtube", url: "" },
      { text: "Medium", url: "" },
    ],
  },
];

let FooterLinks: FC<{ className?: string }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */

  // TODO factor to support JSON abstraction

  return (
    <div className={cx(row, styleContainer, props.className)}>
      {site_links.map((category) => {
        return (
          <div className={cx(expand, styleColumn)} key={category.category}>
            <div>
              <div className={styleTitle}>{category.category}</div>
              <>
                {category.entries.map((entry) => {
                  return (
                    <div className={styleEntry} key={entry.text}>
                      <a href={entry.url || "/TODO"} target="_blank" className={styleLink}>
                        {entry.text}
                      </a>
                    </div>
                  );
                })}
              </>
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default FooterLinks;

let styleTitle = css`
  font-weight: 800;
  font-size: 16px;
  line-height: 22px;
  /* identical to box height */

  /* Black/800 */

  color: #252424;

  margin-bottom: 32px;
`;

let styleColumn = css``;

let styleEntry = css`
  font-size: 14px;
  line-height: 19px;

  /* White/600 */

  color: #9b9b9b;
  margin: 4px 0;
`;

let styleContainer = css`
  padding-left: 80px;
`;

let styleLink = css`
  text-decoration: none;

  /* White/600 */

  color: #9b9b9b;

  &:hover {
    text-decoration: underline;
  }
`;

import React, { FC } from "react";
import { css, cx } from "@emotion/css";
import { center, expand, row, rowMiddle, rowParted, Space } from "@worktools/flex-styles";
import { portalLang } from "lang/locales";
import RoundButton from "widgets/round-button";
import FooterLinks from "./footer-links";
import SearchPromotion from "./search-promotion";
import HeaderNav from "./header-nav";
import FooterPanel from "pages/footer-panel";

import bgAccessDappByName from "assets/portal/access-dapp-by-name.png";
import bgNftSupport from "assets/portal/nft-support.png";
import bgOneNameForAddress from "assets/portal/one-name-for-address.png";
import bgSearchBg from "assets/portal/search-bg.png";
import bgUnifyChains from "assets/portal/unify-chains.png";
import bgUnlimitedSubnames from "assets/portal/unlimited-subnames.png";
import bgPnsIntro from "assets/portal/pns-intro.png";

let showExplainData: {
  bg: string;
  title: string;

  content: string;
}[] = [
  { bg: bgOneNameForAddress, title: portalLang.usage_one_name_for_address, content: portalLang.usage_bind_account },
  { bg: bgAccessDappByName, title: portalLang.usage_access_dapp_by_name, content: portalLang.usage_access_DApp },
  { bg: bgUnifyChains, title: portalLang.usage_unify_multiple_chains, content: portalLang.usage_unlimited_subnames },
  { bg: bgNftSupport, title: portalLang.NFT_support, content: portalLang.usage_trade_pns },
  { bg: bgUnlimitedSubnames, title: portalLang.usage_unlimited_names, content: portalLang.usage_unify_identities },
];

let PortalContainer: FC<{ className?: string }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */

  return (
    <div className={cx(stylePage, props.className)}>
      <HeaderNav className={cx(rowParted, styleHeader)} />

      <div className={styleCenter}>
        <div>
          <SearchPromotion
            children={<span dangerouslySetInnerHTML={{ __html: portalLang.polkadot_name.replace(/o/g, "<span class='colored-char'>o</span>") }}></span>}
          />
        </div>
        <div className={row}>
          <div
            className={styleIntroImage}
            style={{
              backgroundImage: `url(${bgPnsIntro})`,
            }}
          ></div>
          <Space width={76} />
          <div className={expand}>
            <div className={styleIntroTitle}>{portalLang.what_is_pns}</div>
            <Space height={18} />
            <div className={styleIntroContent}>{portalLang.what_is_pns_explain}</div>
          </div>
        </div>
        <div>
          <div className={cx(center, styleSectionTitle)}>{portalLang.pns_features}</div>
          <div className={cx(row, styleCardsContainer)}>
            <div className={styleFeatureCard}>
              <div className={styleFeatureTitle}>{portalLang.uniqueness}</div>
              <div className={styleFeatureContent}>{portalLang.uniqueness_explain}</div>
            </div>
            <div className={styleFeatureCard}>
              <div className={styleFeatureTitle}>{portalLang.decentralized}</div>
              <div className={styleFeatureContent}>{portalLang.decentralized_explain}</div>
            </div>

            <div className={styleFeatureCard}>
              <div className={styleFeatureTitle}>{portalLang.polkadot_integration}</div>
              <div className={styleFeatureContent}>{portalLang.polkadot_integration_explain}</div>
            </div>
            <div className={styleFeatureCard}>
              <div className={styleFeatureTitle}>{portalLang.NFT_support}</div>
              <div className={styleFeatureContent}>{portalLang.NFT_support_explain}</div>
            </div>

            <div className={styleFeatureCard}>
              <div className={styleFeatureTitle}>{portalLang.extendable_resolvers}</div>
              <div className={styleFeatureContent}>{portalLang.extendable_resolvers_explain}</div>
            </div>

            <div className={styleFeatureCard}>
              <div className={styleFeatureTitle}>{portalLang.DNS_resolution}</div>
              <div className={styleFeatureContent}>{portalLang.DNS_resolution_explain}</div>
            </div>
          </div>
        </div>
        <div className={"scenarios-container"}>
          <div className={cx(center, styleSectionTitle)}>{portalLang.usage_scenarios}</div>

          {showExplainData.map((item, idx) => {
            return (
              <div className={cx("scenario-card", row, styleShowAndExplain)} key={idx}>
                <div className={cx(expand, center)}>
                  <div className={cx(styleExplainPart)}>
                    <div className={styleExplainTitle}>{item.title}</div>
                    {item.content}
                  </div>
                </div>
                <div className={cx(expand, center)}>
                  <div
                    className={cx(styleShowPart)}
                    style={{
                      backgroundImage: `url(${item.bg})`,
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
        <Space height={200} />
        <div>
          <SearchPromotion children={<span>{portalLang.search_your_domain_hint}</span>} />
        </div>
        <Space height={200} />
        <FooterLinks />
        <Space height={64} />
      </div>
      <FooterPanel />
    </div>
  );
});

export default PortalContainer;

let styleCenter = css`
  max-width: 1024px;
  min-width: 800px;
  margin: 0 auto;
`;

let stylePage = css`
  padding: 0 120px;
`;

let styleFeatureCard = css`
  /* White/fff */

  background: #ffffff;
  /* White/300 */

  border: 1px solid #e3e3e3;
  box-sizing: border-box;
  /* Black/500 */

  box-shadow: 3px 4px 0px rgba(81, 80, 80, 0.1);
  border-radius: 12px;

  padding: 40px 36px 36px;
  height: 270px;

  display: inline-block;
  width: 285.33px;

  vertical-align: top;

  margin: 16px;
`;
let styleFeatureTitle = css`
  font-weight: bold;
  font-size: 18px;
  line-height: 27px;
  /* identical to box height */

  /* Black/900 */
`;
let styleFeatureContent = css`
  font-size: 16px;
  line-height: 24px;

  /* Black/500 */

  color: #676666;
`;

let styleCardsContainer = css`
  flex-wrap: wrap;
  justify-content: center;
`;

let styleShowAndExplain = css`
  margin: 20px 0;
  align-items: center;
`;

let styleShowPart = css`
  height: 340px;
  min-width: 340px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

let styleExplainPart = css`
  width: 360px;
  font-size: 16px;
  line-height: 150%;
  /* or 24px */

  /* Black/500 */

  color: #676666;
`;

let styleSectionTitle = css`
  font-weight: 900;
  font-size: 36px;
  line-height: 49px;
  text-align: center;

  /* Black/900 */

  color: #0f0e0e;
  margin: 64px;
`;

let styleIntroImage = css`
  width: 420px;
  height: 384px;
  background-color: #ccc; /* TODO */
  background-position: center;
`;

let styleIntroTitle = css`
  font-weight: 900;
  font-size: 28px;
  line-height: 38px;

  /* Black/900 */
`;

let styleIntroContent = css`
  font-size: 16px;
  line-height: 150%;
  /* or 24px */

  /* Black/500 */

  color: #676666;
`;

let styleHeader = css`
  padding: 16px 0px;
`;

let styleSiteFooter = css`
  height: 200px;
`;

let styleExplainTitle = css`
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 33px;
  /* identical to box height */

  /* Black/800 */

  color: #252424;
  margin-bottom: 16px;
`;

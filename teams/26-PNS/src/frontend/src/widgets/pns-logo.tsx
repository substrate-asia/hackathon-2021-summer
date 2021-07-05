import React, { FC } from "react";
import { css, cx } from "@emotion/css";
import logo from "assets/pns-logo.png";

let PnsLogo: FC<{ className?: string; onClick?: () => void }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return <div className={cx(styleLogo, props.className)} onClick={props.onClick}></div>;
});

export default PnsLogo;

let styleLogo = css`
  width: 84px;
  height: 32px;
  background-image: url(${logo});
  background-size: 84px 32px;
  background-position: center center;
`;

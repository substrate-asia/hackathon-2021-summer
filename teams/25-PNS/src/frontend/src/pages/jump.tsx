import React, { FC, useEffect } from "react";
import { css } from "@emotion/css";
import { genRouter } from "controller/generated-router";
import { HashRedirect } from "@worktools/ruled-router";

/** this component used for redirecting */
let PageJump: FC<{ className?: string; jumpName: string }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={props.className}>
      Redirecting...
      <HashRedirect to={genRouter.search.path({ keyword: props.jumpName })} />
    </div>
  );
});

export default PageJump;

import React, { FC, useEffect, useRef } from "react";
import { css, cx } from "@emotion/css";

import * as jdenticon from "jdenticon";
import { center } from "@worktools/flex-styles";

let HashAvatar: FC<{ className?: string; size: string | number; value: string }> = React.memo((props) => {
  let iconRef = useRef<SVGSVGElement>();

  /** Plugins */
  /** Methods */
  /** Effects */

  useEffect(() => {
    jdenticon.update(iconRef.current, props.value, {
      padding: 0,
    });
  }, [props.value]);

  /** Renderers */
  return (
    <div className={cx(center, props.className)}>
      <svg data-jdenticon-value={props.value} height={props.size} ref={iconRef} width={props.size} />
    </div>
  );
});

export default HashAvatar;

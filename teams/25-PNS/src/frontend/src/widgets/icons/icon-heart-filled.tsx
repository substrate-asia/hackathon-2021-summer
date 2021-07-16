import React, { FC } from "react";
import { css, cx } from "@emotion/css";

let IconHeartFilled: FC<{ className?: string; color: string; size: number }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */

  let width = props.size;
  let height = (width / 24) * 21;

  return (
    <div className={cx(styleContainer, props.className)}>
      <svg width={width ?? 24} height={height ?? 21} viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.7968 0.626587C15.9694 0.626587 15.15 0.789619 14.3855 1.10637C13.6212 1.42309 12.9265 1.88746 12.3416 2.47263L11.9997 2.81446L11.6577 2.47247C10.4762 1.2909 8.87363 0.627105 7.20264 0.627105C5.53165 0.627105 3.9291 1.2909 2.74753 2.47247C1.56596 3.65404 0.902161 5.25659 0.902161 6.92758C0.902161 8.59857 1.56596 10.2011 2.74753 11.3827L11.3145 19.9496C11.6929 20.3281 12.3065 20.3281 12.685 19.9496L21.2518 11.3829C21.837 10.7979 22.3013 10.1033 22.618 9.33887C22.9348 8.57442 23.0978 7.75506 23.0978 6.92758C23.0978 6.1001 22.9348 5.28074 22.618 4.51629C22.3014 3.75198 21.8369 3.05722 21.2518 2.47231C20.6669 1.88721 19.9724 1.42306 19.2081 1.10637C18.4437 0.789619 17.6243 0.626587 16.7968 0.626587Z"
          fill={props.color ?? "black"}
        />
      </svg>
    </div>
  );
});

export default IconHeartFilled;

let styleContainer = css`
  display: inline-block;
`;

import React, { FC } from "react";
import { css, cx, keyframes } from "@emotion/css";

let IconLoading: FC<{ className?: string; color: string; size: number }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  let width = props.size;
  let height = props.size;

  return (
    <div
      className={cx("global-rotating", styleContainer, props.className)}
      style={{
        width,
        height,
      }}
    >
      <svg width={width ?? 16} height={height ?? 16} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.25 11C0.25 5.06294 5.06294 0.25 11 0.25C11.0761 0.25 11.152 0.250792 11.2277 0.252369C17.0599 0.373836 21.75 5.13905 21.75 11C21.75 16.9371 16.9371 21.75 11 21.75C10.3096 21.75 9.75 21.1904 9.75 20.5C9.75 19.8096 10.3096 19.25 11 19.25C15.5563 19.25 19.25 15.5563 19.25 11C19.25 6.50233 15.6506 2.84503 11.1757 2.75183C11.1173 2.75061 11.0587 2.75 11 2.75C6.44365 2.75 2.75 6.44365 2.75 11C2.75 11.6904 2.19036 12.25 1.5 12.25C0.809644 12.25 0.25 11.6904 0.25 11Z"
          fill={props.color || "black"}
        />
      </svg>
    </div>
  );
});

export default IconLoading;

let styleContainer = css`
  display: inline-block;
`;

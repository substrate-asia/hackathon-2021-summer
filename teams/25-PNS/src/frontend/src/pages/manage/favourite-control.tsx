import React, { FC } from "react";
import { css } from "@emotion/css";
import { Heart } from "react-feather";
import IconHeart from "widgets/icons/icon-heart";
import IconHeartFilled from "widgets/icons/icon-heart-filled";
import IconLoading from "widgets/icons/icon-loading";

/** this button contains buttons for itself */
let FavouriteControl: FC<{ className?: string; domain: string }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div
      className={props.className}
      onClick={(event) => {
        event.stopPropagation();
        console.log("TODO logics");
      }}
    >
      <IconHeart size={20} color={"#E5458D"} className={styleIcon} />
    </div>
  );
});

export default FavouriteControl;

let styleIcon = css`
  cursor: pointer;
`;

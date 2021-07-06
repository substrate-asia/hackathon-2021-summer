/**
 * 基于设计提供的版本 https://codepen.io/liucsny/pen/dyvBYEL
 */

import React, { FC } from "react";
import { css } from "@emotion/css";

let LogoLoading: FC<{ className?: string }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={props.className}>
      <svg width="156" height="156" viewBox="0 0 156 156" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style
          dangerouslySetInnerHTML={{
            __html: styleCode,
          }}
        ></style>

        <circle className="dot-level-1 dot" cx="125.196" cy="104.751" />
        <circle className="dot-level-1 dot" cx="100.297" cy="119.126" />
        <circle className="dot-level-1 dot" cx="100.297" cy="90.3729" />
        <circle className="dot-level-1 dot" cx="125.196" cy="76.0002" />
        <circle className="dot-level-1 dot" cx="75.3992" cy="133.5" />
        <circle className="dot-level-1 dot" cx="75.348" cy="104.751" />
        <circle className="dot-level-1 dot" cx="75.348" cy="76.0002" />
        <circle className="dot-level-1 dot" cx="100.297" cy="61.6282" />
        <circle className="dot-level-1 dot" cx="125.196" cy="47.2357" />

        <circle className="dot-level-2 dot" cx="50.348" cy="119.126" />
        <circle className="dot-level-2 dot" cx="50.348" cy="90.373" />
        <circle className="dot-level-2 dot" cx="50.348" cy="61.6282" />
        <circle className="dot-level-2 dot" cx="75.348" cy="47.2502" />
        <circle className="dot-level-2 dot" cx="100.297" cy="32.8725" />

        <circle className="dot-level-3 dot" cx="25.5" cy="104.751" />
        <circle className="dot-level-3 dot" cx="25.5" cy="76.0003" />
        <circle className="dot-level-3 dot" cx="25.5" cy="47.2357" />
        <circle className="dot-level-3 dot" cx="50.348" cy="32.8726" />
        <circle className="dot-level-3 dot" cx="75.348" cy="18.4998" />
      </svg>
    </div>
  );
});

export default LogoLoading;

let styleCode = `

@keyframes level-1-anime{
  0% { r: 0 }
  2.5% { r: 0.332 }
  5% { r: 1.4865 }
  7.5% { r: 3.641 }
  10% { r: 6.4905 }
  12.5% { r: 9.0925 }
  15% { r: 10.835 }
  17.5% { r: 11.739 }
  20% { r: 12 }
  22.5% { r: 11.8155 }
  25% { r: 11.3885 }
  27.5% { r: 10.8235 }
  30% { r: 10.173 }
  32.5% { r: 9.468 }
  35% { r: 8.729 }
  37.5% { r: 7.9725 }
  40% { r: 7.209 }
  42.5% { r: 6.4475 }
  45% { r: 5.6965 }
  47.5% { r: 4.9625 }
  50% { r: 4.253 }
  52.5% { r: 3.574 }
  55% { r: 2.9305 }
  57.5% { r: 2.3305 }
  60% { r: 1.78 }
  62.5% { r: 1.2865 }
  65% { r: 0.858 }
  67.5% { r: 0.504 }
  70% { r: 0.2345 }
  72.5% { r: 0.0615 }
  75% { r: 0 }
  100% { r: 0 }
}

@keyframes level-2-anime{
  0% { r: 10.835 }
  2.5% { r: 11.739 }
  5% { r: 12 }
  7.5% { r: 11.8155 }
  10% { r: 11.3885 }
  12.5% { r: 10.8235 }
  15% { r: 10.173 }
  17.5% { r: 9.468 }
  20% { r: 8.729 }
  22.5% { r: 7.9725 }
  25% { r: 7.209 }
  27.5% { r: 6.4475 }
  30% { r: 5.6965 }
  32.5% { r: 4.9625 }
  35% { r: 4.253 }
  37.5% { r: 3.574 }
  40% { r: 2.9305 }
  42.5% { r: 2.3305 }
  45% { r: 1.78 }
  47.5% { r: 1.2865 }
  50% { r: 0.858 }
  52.5% { r: 0.504 }
  55% { r: 0.2345 }
  57.5% { r: 0.0615 }
  60% { r: 0 }
  85% { r: 0 }
  87.5% { r: 0.332 }
  90% { r: 1.4865 }
  92.5% { r: 3.641 }
  95% { r: 6.4905 }
  97.5% { r: 9.0925 }
  100% { r: 10.835 }
}

@keyframes level-3-anime{
  0% { r: 10.173 }
  2.5% { r: 9.468 }
  5% { r: 8.729 }
  7.5% { r: 7.9725 }
  10% { r: 7.209 }
  12.5% { r: 6.4475 }
  15% { r: 5.6965 }
  17.5% { r: 4.9625 }
  20% { r: 4.253 }
  22.5% { r: 3.574 }
  25% { r: 2.9305 }
  27.5% { r: 2.3305 }
  30% { r: 1.78 }
  32.5% { r: 1.2865 }
  35% { r: 0.858 }
  37.5% { r: 0.504 }
  40% { r: 0.2345 }
  42.5% { r: 0.0615 }
  45% { r: 0 }
  70% { r: 0 }
  72.5% { r: 0.332 }
  75% { r: 1.4865 }
  77.5% { r: 3.641 }
  80% { r: 6.4905 }
  82.5% { r: 9.0925 }
  85% { r: 10.835 }
  87.5% { r: 11.739 }
  90% { r: 12 }
  92.5% { r: 11.8155 }
  95% { r: 11.3885 }
  97.5% { r: 10.8235 }
  100% { r: 10.173 }
}

.dot{
  fill: #DB3680;
}

.dot-level-1{
  -webkit-animation: level-1-anime 1.2s infinite; /* Safari 4+ */
  -moz-animation:    level-1-anime 1.2s infinite; /* Fx 5+ */
  -o-animation:      level-1-anime 1.2s infinite; /* Opera 12+ */
  animation:         level-1-anime 1.2s infinite; /* IE 10+, Fx 29+*/

}

.dot-level-2{
  -webkit-animation: level-2-anime 1.2s infinite; /* Safari 4+ */
  -moz-animation:    level-2-anime 1.2s infinite; /* Fx 5+ */
  -o-animation:      level-2-anime 1.2s infinite; /* Opera 12+ */
  animation:         level-2-anime 1.2s infinite; /* IE 10+, Fx 29+*/
}
    
.dot-level-3{
  -webkit-animation: level-3-anime 1.2s infinite; /* Safari 4+ */
  -moz-animation:    level-3-anime 1.2s infinite; /* Fx 5+ */
  -o-animation:      level-3-anime 1.2s infinite; /* Opera 12+ */
  animation:         level-3-anime 1.2s infinite; /* IE 10+, Fx 29+*/
}

`;

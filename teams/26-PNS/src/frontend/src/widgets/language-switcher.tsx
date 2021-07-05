import React, { FC, useEffect } from "react";
import { css, cx } from "@emotion/css";
import { getLanguagePreference, LanguageKind, setLanguagePreference } from "lang/locales";
import { rowMiddle, Space } from "@worktools/flex-styles";
import { ChevronDown } from "react-feather";
import { useDropdownArea } from "@worktools/dropdown";

let LanguageSwitcher: FC<{ className?: string }> = React.memo((props) => {
  let currentLang = getLanguagePreference();

  /** Plugins */

  let selectLang = (kind: LanguageKind) => {
    if (kind !== currentLang) {
      setLanguagePreference(kind);
      location.reload();
    } else {
    }
  };

  let dropdown = useDropdownArea({
    alignToRight: true,
    cardClassName: styleMenuContainer,
    hideClose: true,
    width: 120,
    renderContent: () => {
      return (
        <div>
          <div
            className={styleItem}
            onClick={() => {
              selectLang("en");
              dropdown.onUserClose();
            }}
          >
            EN
          </div>
          <div
            className={styleItem}
            onClick={() => {
              selectLang("zh");
              dropdown.onUserClose();
            }}
          >
            ZH
          </div>
        </div>
      );
    },
  });

  /** Methods */
  /** Effects */

  useEffect(() => {
    // openMenu(); // DEBUG
  }, []);
  /** Renderers */

  let renderLangText = () => {
    switch (currentLang) {
      case "en":
        return "EN";
      case "zh":
        return "ZH";
      default:
        return JSON.stringify(currentLang);
    }
  };

  return (
    <div
      className={cx(styleContainer, props.className)}
      ref={dropdown.triggerEl}
      onClick={() => {
        dropdown.openMenu();
      }}
    >
      <div className={rowMiddle}>
        {renderLangText()}
        <Space width={4} />
        <ChevronDown color={"#0f0e0e"} size={14} />
      </div>
      {dropdown.ui}
    </div>
  );
});

export default LanguageSwitcher;

let styleContainer = css`
  cursor: pointer;
`;

let styleItem = css`
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
  /* identical to box height */

  display: flex;
  align-items: center;

  /* Black/900 */

  color: #0f0e0e;
  cursor: pointer;
  padding: 0 16px;

  &:hover {
    /* Red/50 */

    background: #fff8f8;
    border-radius: 6px;
  }
`;

let styleMenuContainer = css`
  min-height: 64px;
  padding: 8px 0;
`;

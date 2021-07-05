import { observer } from "mobx-react-lite";
import * as React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "@util/style/global";
import { dark, light, lightMobile, darkMobile } from "@util/style/theme";
import { useMediaQuery } from "@util/hook/useMediaQuery";
import { useStore } from "@util/hook/useStore";
import { DefaultTheme } from "styled-components";

type Props = {
  children: React.ReactNode;
};

function resolveTheme(themeString: string): DefaultTheme {
  const rawThemeConfig = themeString === "dark" ? dark : light;
  const isMobile = useMediaQuery(
    `(max-width: ${rawThemeConfig.breakpoints.tablet}px)`
  );

  if (isMobile) {
    if (themeString === "dark") {
      return darkMobile;
    } else {
      return lightMobile;
    }
  } else {
    return rawThemeConfig;
  }
}

export const Theme = observer(({ children }: Props) => {
  const { uiStore } = useStore();
  const resolvedTheme = resolveTheme(uiStore.theme);

  return (
    <ThemeProvider theme={resolvedTheme}>
      <>
        <GlobalStyle />
        {children}
      </>
    </ThemeProvider>
  );
});

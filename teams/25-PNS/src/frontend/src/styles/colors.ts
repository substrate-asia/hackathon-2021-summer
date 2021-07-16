import { css } from "@emotion/css";

export enum ThemeColor {
  cerise900 = "#6C1D36",
  cerise800 = "#872346",
  cerise700 = "#A32A58",
  cerise600 = "#BF306B",
  cerise500 = "#DB3680",
  cerise400 = "#EE559B",
  cerise300 = "#FA7AB5",
  cerise200 = "#FFA4D0",
  cerise100 = "#FFE1F0",
  cerise50 = "#FFF0F8",

  white600 = "#A9A9A9", // TODO incorrect
  white500 = "#A9A9A9",
  white400 = "#A9A9A9",
  white300 = "#CFCFCF",
  white200 = "#E9E9E9",
  white100 = "#F8F8F8",
  white50 = "#FCFCFC",
  white = "#ffffff",

  black800 = "#252424",
  black700 = "#3B3A3A",
  black600 = "#515050",
  black500 = "#676666",
}

export let themeShadows = {
  shadowCerise600: css`
    box-shadow: 3px 4px 0px rgba(219, 54, 128, 0.15);
  `,
  shadowCerise500: css`
    box-shadow: 3px 4px 0px rgba(219, 54, 128, 0.15);
  `,
  shadowCerise400: css`
    box-shadow: 2px 3px 0px rgba(219, 54, 128, 0.15);
  `,
  shadowCerise300: css`
    box-shadow: 1px 2px 0px rgba(219, 54, 128, 0.15);
  `,
  shadowBlack600: css`
    box-shadow: 4px 5px 0px rgba(81, 80, 80, 0.1);
  `,
  shadowBlack500: css`
    box-shadow: 3px 4px 0px rgba(81, 80, 80, 0.1);
  `,
  shadowBlack400: css`
    box-shadow: 2px 3px 0px rgba(81, 80, 80, 0.1);
  `,
  shadowBlack300: css`
    box-shadow: 1px 2px 0px rgba(81, 80, 80, 0.1);
  `,
  shadowNav: css`
    box-shadow: 0px 3px 3px -2px rgba(7, 19, 39, 0.03), 0px 1px 2px -4px rgba(7, 19, 39, 0.02);
  `,
  shadowCard: css`
    box-shadow: 0px 4px 12px -2px rgba(7, 19, 39, 0.03), 0px 3px 3px -2px rgba(7, 19, 39, 0.03), 0px 1px 2px -4px rgba(7, 19, 39, 0.02);
  `,
};

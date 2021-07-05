import * as React from "react";
import styled from "styled-components";

type JustifyValues =
  | "center"
  | "space-around"
  | "space-between"
  | "flex-start"
  | "flex-end";

type AlignValues =
  | "stretch"
  | "center"
  | "baseline"
  | "flex-start"
  | "flex-end";

type Props = {
  column?: boolean;
  shrink?: boolean;
  align?: AlignValues;
  justify?: JustifyValues;
  auto?: boolean;
  className?: string;
  children?: React.ReactNode;
  role?: string;
  gap?: number;
};

export const Flex = (props: Props) => {
  const { children, ...restProps } = props;

  return <Container {...restProps}>{children}</Container>;
};

const Container = styled.div`
  display: flex;
  flex: ${({ auto }: Props) => (auto ? "1 1 auto" : "initial")};
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};
  flex-shrink: ${({ shrink }) => (shrink ? 1 : "initial")};
  gap: ${({ gap }) => `${gap}px` || "initial"};
  min-height: 0;
  min-width: 0;
`;

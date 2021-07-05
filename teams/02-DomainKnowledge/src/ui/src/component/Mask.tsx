import * as React from "react";
import styled from "styled-components";
import { randomInteger } from "@util/random";
import { pulsate } from "@util/style/animation";
import { Flex } from "@component/Flex";

type Props = {
  header?: boolean;
  height?: number;
  minWidth?: number;
  maxWidth?: number;
};

export const Mask = (props: Props) => {
  const width = randomInteger(props.minWidth || 75, props.maxWidth || 100);

  return <Redacted width={width} height={props.height} />;
};

const Redacted = styled(Flex)<Props & { width: number }>`
  width: ${(props) => (props.header ? props.width / 2 : props.width)}%;
  height: ${(props) =>
    props.height ? props.height : props.header ? 24 : 18}px;
  margin-bottom: 6px;
  background-color: ${(props) => props.theme.divider};
  animation: ${pulsate} 1.3s infinite;

  &:last-child {
    margin-bottom: 0;
  }
`;

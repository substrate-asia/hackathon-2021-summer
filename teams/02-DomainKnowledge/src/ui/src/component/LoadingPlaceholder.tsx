import * as React from "react";
import styled from "styled-components";
import { DelayedMount } from "@component/DelayedMount";
import { Fade } from "@component/Fade";
import { Flex } from "@component/Flex";
import { Mask } from "@component/Mask";

export function LoadingPlaceholder(props: Object) {
  return (
    <DelayedMount>
      <Wrapper>
        <Flex column auto {...props}>
          <Mask height={34} />
          <br />
          <Mask />
          <Mask />
          <Mask />
        </Flex>
      </Wrapper>
    </DelayedMount>
  );
}

const Wrapper = styled(Fade)`
  display: block;
  margin: 40px 0;
`;

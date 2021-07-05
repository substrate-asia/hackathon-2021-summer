import * as React from "react";
import styled from "styled-components";

type Props = {
  children?: React.ReactNode;
  withStickyHeader?: boolean;
};

const Container = styled.div<Props>`
  width: 100%;
  max-width: 100vw;
  padding: ${(props) => (props.withStickyHeader ? "4px 12px" : "60px 12px")};
`;

const Content = styled.div`
  max-width: 46em;
  margin: 0 auto;
`;

export const CenteredContent = ({ children, ...rest }: Props) => {
  return (
    <Container {...rest}>
      <Content>{children}</Content>
    </Container>
  );
};

import * as React from "react";
import styled from "styled-components";
import { CenteredContent } from "@component/CenteredContent";
import { Header } from "@component/Header";
import { PageTitle } from "@component/PageTitle";

type Props = {
  icon?: React.ReactNode;
  title: Title;
  children: React.ReactNode;
  headerLeft?: React.ReactNode;
  actions?: React.ReactNode;
  centered?: boolean;
};

type Title =
  | { kind: "text"; text: string }
  | { kind: "node"; node: React.ReactNode; text: string };

export function Scene({
  title,
  icon,
  actions,
  headerLeft,
  children,
  centered,
}: Props) {
  return (
    <FillWidth>
      <PageTitle title={title.text} />
      <Header
        title={
          icon ? (
            <>
              {icon}&nbsp;{title}
            </>
          ) : title.kind === "text" ? (
            title.text
          ) : (
            title.node
          )
        }
        headerRight={actions}
        headerLeft={headerLeft}
      />
      {centered !== false ? (
        <CenteredContent withStickyHeader>{children}</CenteredContent>
      ) : (
        children
      )}
    </FillWidth>
  );
}

const FillWidth = styled.div`
  width: 100%;
`;

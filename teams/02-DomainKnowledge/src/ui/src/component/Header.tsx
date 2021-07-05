import { observer } from "mobx-react-lite";
import { transparentize } from "polished";
import * as React from "react";
import styled from "styled-components";
/* import breakpoint from "styled-components-breakpoint"; */
import { Fade } from "@component/Fade";
import { Flex } from "@component/Flex";
import { useObservable } from "rxjs-hooks";
import { fromEvent } from "rxjs";
import { throttleTime, map } from "rxjs/operators";

export type HeaderProps = {
  title: React.ReactNode;
  headerLeft: React.ReactNode;
  headerRight?: React.ReactNode;
};

export const Header = observer(
  ({ headerLeft, title, headerRight }: HeaderProps) => {
    const isScrolled = useObservable(() =>
      fromEvent(window, "scroll").pipe(
        throttleTime(50),
        map((_) => window.scrollY > 75)
      )
    );

    const handleClickTitle = React.useCallback(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, []);

    return (
      <Wrapper align="center" shrink={false}>
        <HeaderLeft> {headerLeft} </HeaderLeft>
        {isScrolled ? (
          <Title onClick={handleClickTitle}>
            <Fade>{title}</Fade>
          </Title>
        ) : (
          <div />
        )}
        {headerRight && (
          <HeaderRight align="center" justify="flex-end">
            {headerRight}
          </HeaderRight>
        )}
      </Wrapper>
    );
  }
);

const HeaderLeft = styled("div")`
  flex-grow: 1;
  flex-basis: 0;
  align-items: center;
  padding-right: 8px;

  display: flex;
};
`;

const HeaderRight = styled(Flex)`
  flex-grow: 1;
  flex-basis: 0;
  min-width: auto;
  padding-left: 8px;
`;

const Wrapper = styled(Flex)`
  position: sticky;
  top: 0;
  z-index: ${(props) => props.theme.depths.header};
  background: ${(props) => transparentize(0.2, props.theme.background)};
  padding: 12px;
  transition: all 100ms ease-out;
  transform: translate3d(0, 0, 0);
  backdrop-filter: blur(20px);
  min-height: 56px;

  @media print {
    display: none;
  }

  justify-content: flex-start;
`;

const Title = styled("div")`
  display: none;
  font-size: 16px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  min-width: 0;
  align: center;
  justify: flex-start;

  svg {
    vertical-align: bottom;
  }
`;

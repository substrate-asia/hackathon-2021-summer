import * as React from "react";
import { Link } from "wouter";
import styled, { ThemeContext } from "styled-components";

const TabLink = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  color: ${(props) => props.theme.textTertiary};
  margin-right: 24px;
  padding: 6px 0;

  &:hover {
    color: ${(props) => props.theme.textSecondary};
    border-bottom: 3px solid ${(props) => props.theme.divider};
    padding-bottom: 5px;
  }
`;

export const Tab = (props: any) => {
  const theme = React.useContext(ThemeContext);
  const activeStyle = {
    paddingBottom: "5px",
    borderBottom: `3px solid ${theme.textSecondary}`,
    color: theme.textSecondary,
  };

  return <TabLink {...props} activeStyle={activeStyle} />;
};

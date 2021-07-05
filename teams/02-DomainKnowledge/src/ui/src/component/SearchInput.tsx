import * as React from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { SearchIcon } from "outline-icons";
import styled, { ThemeContext } from "styled-components";
import { useLocation } from "wouter";
import { Input } from "@component/Input";
import { searchUrl } from "@util/url";

type Props = {
  placeholder?: string;
  label?: string;
  labelHidden?: boolean;
};

export const SearchInput = observer((props: Props) => {
  const { t } = useTranslation();
  const [_location, setLocation] = useLocation();
  const [focused, setFocus] = React.useState(false);
  const theme = React.useContext(ThemeContext);

  const placeholder = props.placeholder || `${t("Search")}…`;
  const onFocus = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };

  const onInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();

    setLocation(searchUrl(ev.target.value));
  };

  return (
    <InputMaxWidth
      type="search"
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onInput}
      icon={
        <SearchIcon
          color={focused ? theme.inputBorderFocused : theme.inputBorder}
        />
      }
      label={props.label}
      margin={0}
      labelHidden
    />
  );
});

const InputMaxWidth = styled(Input)`
  max-width: 30vw;
`;

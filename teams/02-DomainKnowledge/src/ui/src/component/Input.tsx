import * as React from "react";
import { observer } from "mobx-react-lite";
import { VisuallyHidden } from "reakit/VisuallyHidden";
import styled, { DefaultTheme } from "styled-components";
import breakpoint from "styled-components-breakpoint";
import { Flex } from "@component/Flex";

const RealInput = styled.input<Props & { hasIcon: boolean }>`
  border: 0;
  flex: 1;
  padding: 8px 12px 8px ${(props) => (props.hasIcon ? "8px" : "12px")};
  outline: none;
  background: none;
  color: ${(props) => props.theme.text};
  height: 30px;

  &:disabled,
  &::placeholder {
    color: ${(props) => props.theme.placeholder};
  }

  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }

  ${breakpoint("mobile", "tablet")`
    font-size: 16px;
  `};
`;

const Wrapper = styled.div<WrapperProps>`
  flex: ${(props) => (props.flex ? "1" : "0")};
  width: ${(props) => (props.short ? "49%" : "auto")};
  max-width: ${(props) => (props.short ? "350px" : "100%")};
  min-height: ${({ minHeight }) => (minHeight ? `${minHeight}px` : "0")};
  max-height: ${({ maxHeight }) => (maxHeight ? `${maxHeight}px` : "initial")};
`;

const IconWrapper = styled.span`
  position: relative;
  left: 4px;
  width: 24px;
  height: 24px;
`;

export const Outline = styled(Flex)<Props>`
  flex: 1;
  margin: ${(props) =>
    props.margin !== undefined ? props.margin : "0 0 16px"};
  color: inherit;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) =>
    props.hasError
      ? props.theme.danger
      : props.focused
      ? props.theme.inputBorderFocused
      : props.theme.inputBorder};
  border-radius: 4px;
  font-weight: normal;
  align-items: center;
  overflow: hidden;
`;

export const LabelText = styled.div`
  font-weight: 500;
  padding-bottom: 4px;
  display: inline-block;
`;

export type Props = {
  theme: DefaultTheme;
  hasError?: boolean;
  focused?: boolean;
  inputKind?: "text" | "email" | "checkbox" | "search";
  value?: string;
  label?: string;
  className?: string;
  labelHidden?: boolean;
  flex?: boolean;
  short?: boolean;
  margin?: string | number;
  icon?: React.ReactNode;
  name?: string;
  minLength?: number;
  maxLength?: number;
  autoFocus?: boolean;
  readOnly?: boolean;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (ev: React.KeyboardEvent<HTMLInputElement>) => any;
  onFocus?: (ev?: React.SyntheticEvent) => any;
  onBlur?: (ev?: React.SyntheticEvent) => any;
} & React.InputHTMLAttributes<HTMLInputElement>;

type WrapperProps = {
  flex?: boolean;
  short?: boolean;
  minHeight?: string;
  maxHeight?: string;
};

function label(props: Props): React.ReactNode {
  if (props.label) {
    const wrappedLabel = <LabelText>{props.label}</LabelText>;
    if (props.labelHidden) {
      return <VisuallyHidden>{wrappedLabel}</VisuallyHidden>;
    } else {
      return wrappedLabel;
    }
  } else {
    return null;
  }
}

export const Input = observer((props: Props) => {
  const [focused, setFocus] = React.useState(false);

  const handleBlur = (ev: React.SyntheticEvent) => {
    setFocus(false);
    if (props.onBlur) {
      props.onBlur(ev);
    }
  };

  const handleFocus = (ev: React.SyntheticEvent) => {
    setFocus(true);
    if (props.onFocus) {
      props.onFocus(ev);
    }
  };

  return (
    <Wrapper className={props.className} short={props.short} flex={props.flex}>
      <label>
        {label(props)}
        <Outline focused={focused} margin={props.margin}>
          {props.icon && <IconWrapper>{props.icon}</IconWrapper>}
          <RealInput
            onBlur={handleBlur}
            onFocus={handleFocus}
            type={props.inputKind}
            hasIcon={!!props.icon}
            {...props}
          />
        </Outline>
      </label>
    </Wrapper>
  );
});

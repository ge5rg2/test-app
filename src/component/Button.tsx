import { css } from "styled-components";
import styled from "styled-components";
import React from "react";
import palette from "../styles/palette";

const getButtonDisabled = (disabled?: boolean) => {
  switch (disabled) {
    case true:
      return css`
        background-color: ${(props) => props.theme.textColor};
        color: ${palette.gray[400]};
        cursor: default;

        &:hover {
          background-color: ${(props) => props.theme.textColor};
        }
      `;
  }
};

const getButtonSize = (size?: "small" | "medium" | "large") => {
  switch (size) {
    case "small":
      return css`
        height: 2rem; // 36px
        padding: 0.5rem 1.2rem; // 8px 19.2px
        font-size: 0.75rem; // 12px
      `;
    case "medium":
      return css`
        height: 2.5rem; // 40px
        padding: 0.625rem 1.5rem; // 10px 24px
        font-size: 0.875rem; // 14px
      `;
    case "large":
      return css`
        height: 3rem; // 48px
        padding: 0.75rem 1.8rem; // 12px 28.8px
        font-size: 1rem; // 16px
      `;
  }
};

interface BaseProps {
  variant?: "text" | "contained" | "outlined";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
}

const Base = styled.button<BaseProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem; // 8px

  height: 2.5rem; // 40px
  padding: 0.625rem 1.5rem; // 10px 24px
  font-size: 0.875rem; // 14px
  font-weight: 500;
  border-radius: 10px;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.5s;

  ${({ disabled }) => getButtonDisabled(disabled)};

  ${({ size }) => getButtonSize(size)};
`;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({ children, disabled, size, ...props }) => {
  return (
    <Base disabled={disabled} size={size} {...props}>
      {children}
    </Base>
  );
};

export default Button;

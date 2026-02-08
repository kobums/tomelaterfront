import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  font-weight: 500;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  outline: 2px solid transparent;
  outline-offset: 2px;
  cursor: pointer;

  &:focus {
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return css`
          background-color: #4f46e5;
          color: white;
          border: 1px solid transparent;
          &:hover:not(:disabled) {
            background-color: #4338ca;
          }
          &:focus {
            --tw-ring-color: #6366f1;
          }
        `;
      case 'secondary':
        return css`
          background-color: #f3f4f6;
          color: #111827;
          border: 1px solid transparent;
          &:hover:not(:disabled) {
            background-color: #e5e7eb;
          }
          &:focus {
            --tw-ring-color: #6b7280;
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          color: inherit;
          border: 1px solid #d1d5db;
          &:hover:not(:disabled) {
            background-color: #f9fafb;
          }
          &:focus {
            --tw-ring-color: #6b7280;
          }
        `;
      case 'ghost':
        return css`
          background-color: transparent;
          color: #374151;
          border: 1px solid transparent;
          &:hover:not(:disabled) {
            background-color: #f3f4f6;
          }
          &:focus {
            --tw-ring-color: #6b7280;
          }
        `;
      default:
        return '';
    }
  }}

  ${({ size }) => {
    switch (size) {
      case 'sm':
        return css`
          padding: 0.375rem 0.75rem;
          font-size: 0.875rem;
          line-height: 1.25rem;
        `;
      case 'lg':
        return css`
          padding: 0.75rem 1.5rem;
          font-size: 1.125rem;
          line-height: 1.75rem;
        `;
      default: // md
        return css`
          padding: 0.5rem 1rem;
          font-size: 1rem;
          line-height: 1.5rem;
        `;
    }
  }}

  ${({ className }) => className && className}
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : null}
      {children}
    </StyledButton>
  );
};

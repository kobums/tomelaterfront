import React from 'react';
import styled from '@emotion/styled';
import { Button } from './Button';
import { fadeIn, slideUp } from '../../styles/animations';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: ${fadeIn} 0.2s ease-out;
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  transition: opacity 0.3s;
`;

const ModalContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 24rem;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(24px);
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 1.5rem;
  transform: scale(1);
  transition: all 0.3s;
  animation: ${slideUp} 0.3s ease-out;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
`;

const Message = styled.p`
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.625;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
`;

const ButtonWrapper = styled.div`
  margin-top: 1.5rem;
`;

const ConfirmButton = styled(Button)`
  width: 100%;
  background-image: linear-gradient(to right, #4f46e5, #9333ea);
  color: white;
  font-weight: 700;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(199, 210, 254, 0.5);
  transition: transform 0.1s;

  &:hover {
    background-image: linear-gradient(to right, #4338ca, #7e22ce);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <Backdrop onClick={onClose} />
      <ModalContent>
        <div style={{ textAlign: 'center' }}>
          {title && <Title>{title}</Title>}
          <div style={{ marginTop: '0.5rem' }}>
            <Message>{message}</Message>
          </div>
        </div>

        <ButtonWrapper>
          <ConfirmButton onClick={onClose}>
            확인
          </ConfirmButton>
        </ButtonWrapper>
      </ModalContent>
    </Overlay>
  );
};

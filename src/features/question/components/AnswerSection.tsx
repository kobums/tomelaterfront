import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Button } from '../../../components/ui/Button';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const AnsweredCard = styled.div`
  background-color: #ecfdf5;
  border-radius: 0.75rem;
  padding: 2rem;
  border: 1px solid #d1fae5;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out;
`;

const IconWrapper = styled.div`
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  background-color: #d1fae5;
`;

const IconText = styled.span`
  font-size: 1.5rem;
`;

const AnsweredTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #064e3b;
  margin-bottom: 0.75rem;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
`;

const AnsweredText = styled.p`
  color: #065f46;
  font-style: italic;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  line-height: 1.625;
`;

const FooterText = styled.div`
  margin-top: 1rem;
  font-size: 0.75rem;
  color: #059669;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
`;

const AnswerFormContainer = styled.form`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid #f3f4f6;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: ${slideUp} 0.5s ease-out;
  animation-delay: 100ms;
  animation-fill-mode: backwards;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1.25rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  min-height: 180px;
  font-size: 1.125rem;
  line-height: 1.625;
  resize: vertical;
  background-color: #f9fafb;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  transition: box-shadow 0.2s, background-color 0.2s;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #6366f1;
    border-color: #6366f1;
    background-color: white;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 0.5rem;
`;

const Checkbox = styled.input`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.25rem;
  border: 1px solid #d1d5db;
  color: #4f46e5;
  cursor: pointer;
  &:focus {
    box-shadow: 0 0 0 2px #6366f1;
  }
`;

const CheckboxLabel = styled.label`
  font-size: 0.875rem;
  color: #4b5563;
  cursor: pointer;
  user-select: none;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-0.125rem);
  }
`;

interface AnswerSectionProps {
  existingAnswer: boolean;
  answer: string;
  setAnswer: (value: string) => void;
  isPublic: boolean;
  setIsPublic: (value: boolean) => void;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

export const AnswerSection: React.FC<AnswerSectionProps> = ({
  existingAnswer,
  answer,
  setAnswer,
  isPublic,
  setIsPublic,
  isSubmitting,
  handleSubmit,
}) => {
  if (existingAnswer) {
    return (
      <AnsweredCard>
        <IconWrapper>
          <IconText>🌿</IconText>
        </IconWrapper>
        <AnsweredTitle>Answered</AnsweredTitle>
        <AnsweredText>"{answer}"</AnsweredText>
        <FooterText>See you next year</FooterText>
      </AnsweredCard>
    );
  }

  return (
    <AnswerFormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="answer">Your Answer</Label>
        <TextArea
          id="answer"
          placeholder="Write your thoughts here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
      </FormGroup>

      <CheckboxGroup>
        <Checkbox
          type="checkbox"
          id="isPublic"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        <CheckboxLabel htmlFor="isPublic">
          Make this answer public (share with others)
        </CheckboxLabel>
      </CheckboxGroup>

      <SubmitButton type="submit" isLoading={isSubmitting}>
        Submit to Future Me
      </SubmitButton>
    </AnswerFormContainer>
  );
};

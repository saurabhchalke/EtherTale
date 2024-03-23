import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: #00ff00;
  color: #0d0d0d;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ChoiceButton = ({ children, onClick }) => {
  return <Button onClick={onClick}>{children}</Button>;
};

export default ChoiceButton;
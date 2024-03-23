import React from "react";
import styled from "styled-components";

const Container = styled.div`
  white-space: pre-wrap;
  margin-bottom: 20px;
  font-size: 20px;
  line-height: 1.6;
  color: #00ff00;
`;

const StoryDisplay = ({ story }) => {
  return <Container>{story}</Container>;
};

export default StoryDisplay;

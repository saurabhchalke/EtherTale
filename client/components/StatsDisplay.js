import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: #00ff00;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 20px;
  border-radius: 10px;
`;

const ChoiceContainer = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const StatsDisplay = ({ stats, choice }) => {
  return (
    <Container>
      <ChoiceContainer>Chosen Path: Choice {choice}</ChoiceContainer>
      <div>Number of Votes: {stats.totalVotes}</div>
      <div>MACI Contract Address: {stats.contractAddress}</div>
      <div>Network: {stats.network}</div>
      <div>Chain ID: {stats.chainId}</div>
    </Container>
  );
};

export default StatsDisplay;

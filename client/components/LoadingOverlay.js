import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const LoadingText = styled.div`
  color: #00ff00;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const LoadingOverlay = ({ children, showContent, onMouseDown, onMouseUp }) => {
  return (
    <>
      {showContent && (
        <Overlay onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
          <LoadingText>
            Waiting for votes...
            <br />
            Please submit your MACI vote.
          </LoadingText>
          {children}
        </Overlay>
      )}
    </>
  );
};

export default LoadingOverlay;

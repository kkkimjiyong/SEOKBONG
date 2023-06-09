import React from "react";
import styled, { keyframes } from "styled-components";
import { Layout } from "../global/Layout";

export const Modal = ({
  text,

  modalClick,
}: {
  modalClick: any;
  text: string;
}) => {
  return (
    <StyledContainer>
      <StyledContentBox>
        <StyledContentTitle>{text}</StyledContentTitle>
        <StyledConfirmBtn onClick={modalClick}>ok</StyledConfirmBtn>
      </StyledContentBox>
    </StyledContainer>
  );
};

const smoothAppear = keyframes`
  from {
transform: translateY(-20px);
opacity: 0;
  }
  to {
    transform: translateY(0px);

  }
`;

const StyledContainer = styled.div`
  z-index: 5;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const StyledContentBox = styled.div`
  animation: ${smoothAppear} 400ms linear;
  margin: 0 auto;
  width: 85%;
  height: 100px;
  background-color: #e1e1e1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const StyledContentTitle = styled.div`
  margin-top: 20px;
  font-size: 14px;
  /* font-weight: 700; */
  width: 80%;
  color: #676767;
`;

const StyledConfirmBtn = styled.div`
  width: 20%;
  height: 20px;
  background-color: white;
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #676767;
  :hover {
    cursor: pointer;
    color: #adadad;
  }
`;

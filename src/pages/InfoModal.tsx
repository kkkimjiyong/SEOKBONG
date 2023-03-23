import React from "react";
import styled, { keyframes } from "styled-components";
import { Layout } from "../global/Layout";
import WaterMark from "../assets/waterMark2.png";
export const InfoModal = () => {
  return (
    <StyledContainer>
      <StyledContentBox>
        <StyledWaterMark src={WaterMark} alt="SEOK-BONG" />
        <StyledContentTitle>
          <div className="large">이용해주셔서 감사합니다!</div>
          <br />
          저희 <span className="bold">SEOK-BONG</span>은 한 분의 디자이너와 한
          분의 개발자의 수고로 만들어졌습니다.
          <br />
          아래 설문조사링크를 통해, 여러분의 피드백을 받고있습니다.
          <br /> (설문조사는 1분 이내로 소요됩니다)
          <br />
          <div></div>
          <br />
          많은 피드백 부탁드리겠습니다!
          <div>-한석봉 올림-</div>
        </StyledContentTitle>
        <StyledConfirmBtn
          onClick={() => {
            localStorage.setItem("done", "true");
          }}
        >
          ok
        </StyledConfirmBtn>
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

const StyledWaterMark = styled.img`
  position: absolute;
  bottom: 70px;
  right: 20px;
  opacity: 0.4;
  width: 80px;
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
  height: 500px;
  background-color: #000000da;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const StyledContentTitle = styled.div`
  margin-top: 20px;
  font-size: 14px;
  /* font-weight: 700; */
  color: #ff9d42;
  line-height: 1.6;
  width: 80%;
  .large {
    margin-bottom: 10px;
    color: #ff9d42;
    font-size: 20px;
    font-weight: 700;
  }
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

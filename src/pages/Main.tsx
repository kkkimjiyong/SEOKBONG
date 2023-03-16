import React from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../global/Footer";
import { Header } from "../global/Header";
import { Layout } from "../global/Layout";
import styled from "styled-components";

export const Main = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      {/* <StyledMainImg src={MainBird} alt="메인로고" /> */}
      <div>
        메인에는 이때까지 쓴 글들이 액자에 담긴채로 자동슬라이드 형식으로 계속
        넘어가는 형태 굳
      </div>
      <StyledButton onClick={() => navigate("/write")}>글쓰러가기</StyledButton>
    </Layout>
  );
};

const StyledMainImg = styled.img`
  margin-top: 220px;
  width: 80%;
`;

const StyledButton = styled.button`
  position: absolute;
  bottom: 70px;
  width: 80%;
  height: 50px;
  background-color: #906fd4;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 700;
  font-size: 16px;
  :hover {
    cursor: pointer;
    color: #af93e8;
  }
`;

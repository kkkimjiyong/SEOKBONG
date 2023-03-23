import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../global/Layout";
import MainBackground from "../assets/MainBackGround.png";
import MainBackground2 from "../assets/MainBack2.png";
// import { ReactComponent as MainFont } from "../assets/MainFont.svg";
import MainFont from "../assets/MainFont.png";
import styled from "styled-components";
import { supabase } from "../lib/api";

export const Main = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState<number>();
  useEffect(() => {
    const getShareData = async () => {
      const { count } = await supabase
        .from("writedown")
        .select("titleId", { count: "exact", head: true });
      console.log(count);
      setCount(count || 0);
    };
    getShareData();
  }, []);
  return (
    <Layout>
      <StyledContainer>
        <StyledMainImg src={MainBackground2} alt="메인배경" />
        {/* <MainFont className="mainfont" /> */}
        <img src={MainFont} alt="메인로고" className="mainfont" />
        <StyledHelpTxt>
          석봉아, 어서오거라. <br />
          한 문장만 적은 다음, 친구에게 공유하면 <br />
          재미있는 <span className="white">릴레이 스토리</span>완성된단다.
        </StyledHelpTxt>
        <StyledMainListBox>
          <StyledMainItem>
            어머니께서 붓과 벼루와 종이를 가져오셨다. “나는 떡을 썰 테니, 너는
            글을 쓰거라.”
            <div className="sub">2023.02.21 - 민지</div>
          </StyledMainItem>
          <StyledMainItem>
            한석봉은 놀란 눈으로 어머니를 쳐다보았다. 그 짧은 사이에, 한석봉의
            어머니는 등잔의 촛불을 후 불어서 껐다. 이상하다.{" "}
            <div className="sub">2023.02.21 - 해린</div>
          </StyledMainItem>
          <StyledMainItem>
            어머니께서는 묵묵부답으로 계속해서 떡을 썰고 계셨고, 민망해진 석봉은
            자연스럽게 붓을 들지 아니할 수가 없었다.{" "}
            <div className="sub">2023.02.21 - 하니</div>
          </StyledMainItem>
          <StyledMainItem>
            방 안이 온통 깜깜해지자, 어머니가 떡을 써는 소리가 들리기 시작했다.
            “아니, 어머니 제가 아까 중국당면 시켰는데 ...”{" "}
            <div className="sub">2023.02.21 - 혜민</div>
          </StyledMainItem>
          <StyledMainListShadow />
        </StyledMainListBox>
        <StyledButton onClick={() => navigate("/write")}>
          첫 붓자루 쥐러가기
        </StyledButton>
        <StyledContinueTxt>참여 수 : {count}</StyledContinueTxt>
      </StyledContainer>
    </Layout>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
  .mainfont {
    top: 72px;
    left: 133px;
    position: absolute;
    width: 60%;
  }
`;

const StyledMainImg = styled.img`
  position: absolute;
  margin-top: 80px;
  width: 100%;
  opacity: 0.6;
`;

const StyledHelpTxt = styled.div`
  margin-top: 60px;
  z-index: 2;
  font-size: 12px;
  line-height: 1.8;
  text-align: center;
  color: #fda757;
  .white {
    color: white;
  }
`;

const StyledMainListBox = styled.div`
  position: relative;
  color: white;
  margin-top: 30px;
  z-index: 2;
  width: 85%;
  height: 50%;

  @media screen and (max-height: 720px) {
    height: 40%;
  }
  padding: 40px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;
const StyledMainListShadow = styled.div`
  position: absolute;
  width: 100%;
  height: 50%;
  bottom: 0;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(218, 218, 218, 0) 100%
  );
`;

const StyledMainItem = styled.div`
  margin-top: 25px;
  font-size: 12px;
  line-height: 1.5;
  word-break: break-all;
  .sub {
    color: #979797;
    width: 100%;
    display: flex;
    margin-top: 3px;
    font-size: 10px;
    justify-content: end;
  }
`;

const StyledButton = styled.button`
  z-index: 3;
  font-size: 16px;
  margin-bottom: 50px;
  width: 85%;
  height: 50px;
  background-color: #eb7305;
  border: none;
  color: white;
  font-weight: 700;
  :hover {
    cursor: pointer;
    background-color: white;
    color: #eb7305;
  }
`;

const StyledContinueTxt = styled.div`
  z-index: 2;
  color: white;
  font-weight: 700;
  position: absolute;
  bottom: 20px;
`;

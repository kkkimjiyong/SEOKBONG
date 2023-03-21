import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../global/Layout";
import MainBackground from "../assets/MainBackGround.png";
import MainBackground2 from "../assets/MainBack2.png";
// import { ReactComponent as MainFont } from "../assets/MainFont.svg";
import MainFont from "../assets/MainFont.png";
import styled from "styled-components";
import { supabase } from "../lib/api";

export const ShareMain = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<any>([]);
  const [newContent, setNewContent] = useState<string>("");
  const [count, setCount] = useState<number>();
  useEffect(() => {
    const getShareData = async () => {
      const { count } = await supabase
        .from("writedown")
        .select("titleId", { count: "exact", head: true })
        .eq("titleId", id);
      console.log(count);
      setCount(count || 0);
    };
    getShareData();
  }, []);
  const getData = async () => {
    const { data }: any = await supabase
      .from("writedown")
      .select("title,content,name")
      .eq("titleId", id);
    if (data.length === 0) {
      alert("에러발생");
    }

    setTitle(data[0].title);
    // 문장 합치기
    console.log(data);
    setContent(data);
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(content);
  return (
    <Layout>
      <StyledContainer>
        <StyledMainImg src={MainBackground2} alt="메인배경" />

        <img src={MainFont} alt="메인로고" className="mainfont" />
        <StyledHelpTxt>
          방금 내 친구가 <span className="white">릴레이 스토리</span>를
          공유했습니다. <br />
          seok-bong이 여러분의<span className="white">상상력</span>을
          응원합니다. <br />
          무궁무진하고 가슴 벅찬 <span className="white">스토리의 세계</span>에
          함께하세요!
        </StyledHelpTxt>
        <StyledTitle>제목: {title}</StyledTitle>
        <StyledMainListBox>
          {content?.map((el: any) => {
            return (
              <StyledMainItem>
                {el.content}
                <div className="sub">2023.02.21 - 아무개</div>
              </StyledMainItem>
            );
          })}

          <StyledMainListShadow />
        </StyledMainListBox>
        <StyledButton onClick={() => navigate(`/write/${id}`)}>
          Start
        </StyledButton>
        <StyledContinueTxt>총 붓자루 개수 : {count}</StyledContinueTxt>
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
  z-index: 2;
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

const StyledTitle = styled.div`
  margin-top: 50px;
  z-index: 2;
  font-size: 20px;
  font-weight: 700;
  color: white;
  width: 85%;
`;
const StyledMainListBox = styled.div`
  position: relative;
  color: white;
  margin-top: 30px;
  z-index: 2;
  width: 85%;
  max-height: 40%;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  @media screen and (max-height: 680px) {
    height: 20%;
  }
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
  filter: blur(1px);
  width: 80%;
  margin-bottom: 20px;
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
  font-size: 20px;
  width: 85%;
  height: 50px;
  margin-top: 70px;
  background-color: #eb7305;
  border: none;

  color: white;
  font-weight: 700;
  font-size: 16px;
  :hover {
    cursor: pointer;
    background-color: white;
    color: #eb7305;
  }
`;

const StyledContinueTxt = styled.div`
  z-index: 2;
  color: white;
  margin-top: 20px;
`;

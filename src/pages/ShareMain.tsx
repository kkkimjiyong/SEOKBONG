import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../global/Layout";
import MainBackground from "../assets/MainBackGround.png";
import MainBackground2 from "../assets/MainBack2.png";
// import { ReactComponent as MainFont } from "../assets/MainFont.svg";
import MainFont from "../assets/MainFont.png";
import styled from "styled-components";
import { supabase } from "../lib/api";
import { Modal } from "./Modal";

export const ShareMain = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<any>([]);
  const [count, setCount] = useState<number>();
  const [share, setShare] = useState<number>(0);
  const [modal, setModal] = useState<boolean>(false);
  const [modalTxt, setModalTxt] = useState<string>("");
  const [modalClick, setModalClick] = useState<any>();

  useEffect(() => {
    const getShareData = async () => {
      const { count } = await supabase
        .from("writedown")
        .select("titleId", { count: "exact", head: true });
      console.log(count);
      setShare(count || 0);
    };
    getShareData();
  }, []);
  const getData = async () => {
    const { data }: any = await supabase
      .from("writedown")
      .select("title,content,name")
      .eq("titleId", id);
    if (data.length === 0) {
      setModal(true);
      setModalTxt("잘못된 링크입니다. 다시 시도해주세요!");
    }
    setCount(data.length);
    setTitle(data[0].title);
    // 문장 합치기
    console.log(data);
    setContent(data);
  };
  useEffect(() => {
    getData();
  }, []);

  //클릭해서 보기
  const [more, setMore] = useState<boolean>(false);

  return (
    <Layout>
      <StyledContainer>
        <StyledMainImg src={MainBackground2} alt="메인배경" />
        <img src={MainFont} alt="메인로고" className="mainfont" />
        <StyledHelpTxt>
          석봉아, 어서오거라. 네 친구가 이야기를 쓰다가 도망갔단다. <br />
          한 문장만 적은 다음, 친구에게 공유하면 <br />
          재미있는 <span className="white">릴레이 스토리</span>가 완성된단다.
        </StyledHelpTxt>
        <StyledTitle>
          제목: {title}
          <div className="max">최대인원 ({count}/4)</div>
        </StyledTitle>
        <StyledMainListBox more={more}>
          <div className="moreBtn" onClick={() => navigate(`/capture/${id}`)}>
            결과물 먼저 보기
          </div>
          {content?.map((el: any) => {
            return (
              <StyledMainItem more={more}>
                {el.content}
                <div className="sub">2023.02.21 - 아무개</div>
              </StyledMainItem>
            );
          })}
          <StyledMainListShadow />
        </StyledMainListBox>
        <StyledButton
          onClick={() => {
            if (count === 4) {
              setModal(true);
              setModalTxt("완성된 글은 이어서 작성할 수 없습니다.");
            } else {
              navigate(`/write/${id}`);
            }
          }}
        >
          붓자루 이어받기
        </StyledButton>
        <StyledButtonTxt onClick={() => navigate("/")}>
          나도 새로운 글 쓰러가기
        </StyledButtonTxt>
        <StyledContinueTxt>총 공유 수: {share}</StyledContinueTxt>
      </StyledContainer>
      {modal && (
        <Modal
          text={modalTxt}
          modalClick={() => {
            if (count === 4) {
              setModal(false);
            } else {
              window.location.reload();
            }
          }}
        />
      )}
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
  font-size: 12px;
  line-height: 1.8;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
  color: #fda757;
  .white {
    color: white;
  }
  @media screen and (max-height: 650px) {
    display: none;
  }
`;

const StyledTitle = styled.div`
  margin-top: 50px;
  z-index: 2;
  font-size: 18px;
  font-weight: 700;
  color: white;
  width: 85%;
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  .max {
    margin-left: 10px;
    font-size: 12px;
    font-weight: 500;
  }
`;
const StyledMainListBox = styled.div<{ more: boolean }>`
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
  .moreBtn {
    position: absolute;
    font-size: 12px;
    color: #fda757;
    text-decoration: underline;
    opacity: 0.7;
    z-index: 10;
    bottom: 20px;
    :hover {
      opacity: 1;
      cursor: pointer;
    }
  }
  @media screen and (max-height: 760px) {
    max-height: 20%;
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

const StyledMainItem = styled.div<{ more: boolean }>`
  filter: ${({ more }) => (more ? "blur(0px)" : "blur(1px)")};
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

const StyledButtonTxt = styled.div`
  z-index: 5;
  margin-top: 10px;
  font-size: 14px;
  color: #bcbcbc;
  text-decoration: underline;
  :hover {
    cursor: pointer;
    color: white;
  }
`;

const StyledContinueTxt = styled.div`
  position: absolute;
  font-size: 12px;
  font-weight: 700;
  bottom: 20px;
  z-index: 2;
  color: #ebebeb;
`;

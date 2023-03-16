import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Footer } from "../global/Footer";
import { Header } from "../global/Header";
import { Layout } from "../global/Layout";
import { supabase } from "../lib/api";

export const Write = () => {
  const navigate = useNavigate();
  const [process, setProcess] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [id, setId] = useState<string>("");

  const postData = async () => {
    const { data }: any = await supabase
      .from("writedown")
      .insert([{ title, content: [content] }])
      .select("id");
    navigate(`/result/${data[0].id}`);
  };

  const onClickHandler = () => {
    switch (process) {
      case 0:
        setProcess(1);
        break;
      case 1:
        postData();
        break;
      default:
        break;
    }
  };

  return (
    <Layout>
      <Header />
      <StyledTitle>
        {process === 0 ? (
          <>
            {" "}
            먼저 글의 제목을 정해주세요
            <span className="sub">*글의 제목에서 내용이 연상되면 좋아요</span>
          </>
        ) : (
          <>
            글의 첫 문장을 적어주세요
            <span className="sub">*시작이 반이니, 신중히 적어주세요</span>
          </>
        )}
      </StyledTitle>
      {process === 0 && (
        <StyledInput
          onChange={(e) => setTitle(e.target.value)}
          placeholder="글의 제목은 얼굴과도 같아요"
        />
      )}
      {process === 1 && (
        <StyledInput
          onChange={(e) => setContent(e.target.value)}
          placeholder="과연 첫 시작은 어떨까요?"
        />
      )}
      <StyledNextButton onClick={onClickHandler}>다음</StyledNextButton>
      <Footer />
    </Layout>
  );
};

const StyledTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  line-height: 1.6;
  font-size: 20px;
  font-weight: 700;
  margin-top: 100px;
  .sub {
    color: gray;
    font-size: 12px;
  }
`;

const StyledInput = styled.input`
  margin-top: 30px;
  width: 90%;
  height: 50px;
  border: none;
  padding: 0 3%;
  font-size: 16px;
  ::placeholder {
    color: #d4d1d1;
  }
  border-bottom: 2px solid black;
`;

const StyledNextButton = styled.button`
  margin-top: 50px;
  width: 60%;
  height: 50px;
  border-radius: 10px;
  border: none;
  color: white;
  background-color: gray;
  :hover {
    cursor: pointer;
    color: #d2d2d2;
  }
`;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Footer } from "../global/Footer";
import { Header } from "../global/Header";
import { Layout } from "../global/Layout";
import { supabase } from "../lib/api";
import uuid from "react-uuid";

export const Write = () => {
  const navigate = useNavigate();
  const [process, setProcess] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");

  const postData = async () => {
    let titleId = uuid();
    try {
      const { data }: any = await supabase
        .from("writedown")
        .insert([{ title, content, titleId, name }]);
      navigate(`/result/${titleId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickHandler = () => {
    switch (process) {
      case 0:
        setProcess(1);
        break;
      case 1:
        setProcess(2);
        break;
      case 2:
        postData();
        break;
      default:
        break;
    }
  };

  return (
    <Layout>
      <StyledTitle>
        {process === 0 && (
          <>
            {" "}
            역사가 될 이 글의 제목을 적어주세요.
            <span className="sub">
              글의 제목에서 내용이 연상되면 효과적입니다.
            </span>
          </>
        )}
        {process === 1 && (
          <>
            글의 첫 문장을 적어주세요
            <span className="sub">
              첫 붓자루는 당신에게 주어졋습니다. 신중히 작성하세요.
            </span>
          </>
        )}
        {process === 2 && (
          <>
            당신의 이름을 적어주세요
            <span className="sub">모든 붓자루에는 주인이 있기 마련입니다.</span>
          </>
        )}
      </StyledTitle>
      {process === 0 && (
        <StyledInput
          onChange={(e) => setTitle(e.target.value)}
          placeholder="예) 효자 한석봉"
        />
      )}
      {process === 1 && (
        <StyledInput
          onChange={(e) => setContent(e.target.value)}
          placeholder="예) 어머니는 종이와 붓과 벼루를 가져오셨다."
        />
      )}
      {process === 2 && (
        <StyledInput
          onChange={(e) => setName(e.target.value)}
          placeholder="예) 한석봉"
        />
      )}
      <StyledNextButton onClick={onClickHandler}>Next</StyledNextButton>
    </Layout>
  );
};

const StyledTitle = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  line-height: 1.6;
  font-size: 18px;
  font-weight: 700;
  margin-top: 100px;
  .sub {
    margin-top: 5px;
    width: 100%;
    color: gray;
    font-size: 12px;
  }
`;

const StyledInput = styled.input`
  margin-top: 30px;
  width: 80%;
  height: 50px;
  border: none;
  padding: 0 3%;
  background-color: #222222;
  font-size: 16px;
  color: white;
  ::placeholder {
    color: #727272;
  }
  border: 1px solid #afafaf;
`;

const StyledNextButton = styled.button`
  margin-top: 20px;
  width: 80%;
  font-size: 20px;
  height: 50px;
  border: none;
  color: white;
  background-color: #b0adaa;
  :hover {
    cursor: pointer;
    color: #d2d2d2;
  }
`;

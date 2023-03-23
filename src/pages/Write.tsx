import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Layout } from "../global/Layout";
import { supabase } from "../lib/api";
import uuid from "react-uuid";

export const Write = () => {
  const navigate = useNavigate();
  const [process, setProcess] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorTxt, setErrorTxt] = useState<string>("");
  const [id, setId] = useState<string>("");

  const postData = async () => {
    let titleId = uuid();
    try {
      const { data }: any = await supabase
        .from("writedown")
        .insert([{ title, content, titleId, name }]);
      navigate(`/capture/${titleId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickHandler = () => {
    switch (process) {
      case 0:
        if (title.trim().length !== 0 && title.trim().length <= 10) {
          setProcess(1);
          setError(false);
        } else if (title.trim().length > 10) {
          setError(true);
          setErrorTxt("10글자 이내로 작성해주세요");
        } else {
          setError(true);
          setErrorTxt("빈칸을 채워주세요");
        }

        break;
      case 1:
        if (content.trim().length !== 0) {
          setError(false);
          setProcess(2);
        } else {
          setError(true);
          setErrorTxt("빈칸을 채워주세요");
        }
        break;
      case 2:
        if (name.trim().length !== 0 && name.trim().length <= 10) {
          postData();
        } else if (name.trim().length > 10) {
          setError(true);
          setErrorTxt("10글자 이내로 작성해주세요");
        } else {
          setError(true);
        }
        break;
      default:
        break;
    }
  };

  const onBtnColor = () => {
    switch (process) {
      case 0:
        if (title.trim().length !== 0 && title.trim().length <= 10) {
          return true;
        }
        break;
      case 1:
        if (content.trim().length !== 0) {
          return true;
        }
        break;
      case 2:
        if (name.trim().length !== 0 && name.trim().length <= 10) {
          return true;
        }
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
          placeholder="예) 효자 한석봉 (10글자 이내)"
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
          placeholder="예) 한석봉 (10글자 이내)"
        />
      )}
      {error && <StyledErrorTxt>{errorTxt}</StyledErrorTxt>}
      <StyledNextButton error={onBtnColor()} onClick={onClickHandler}>
        Next
      </StyledNextButton>
    </Layout>
  );
};

const StyledTitle = styled.div`
  width: 85%;
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
  width: 85%;
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

const StyledErrorTxt = styled.div`
  margin-top: 5px;
  color: red;
  width: 85%;
  font-size: 12px;
`;

const StyledNextButton = styled.button<{ error: any }>`
  margin-top: 25px;
  width: 85%;
  font-size: 20px;
  font-weight: 700;
  height: 50px;
  border: none;
  color: white;
  background-color: ${({ error }) => (!error ? "#b0adaa" : "#eb7305")};
  :hover {
    cursor: pointer;
    color: #d2d2d2;
  }
`;

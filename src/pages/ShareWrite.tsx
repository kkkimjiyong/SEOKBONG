import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Layout } from "../global/Layout";
import { supabase } from "../lib/api";
import uuid from "react-uuid";

export const ShareWrite = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [process, setProcess] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<any>([]);
  const [newContent, setNewContent] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorTxt, setErrorTxt] = useState<string>("");
  const getData = async () => {
    try {
      const { data }: any = await supabase
        .from("writedown")
        .select("title,content,name,created_at")
        .eq("titleId", id);
      setTitle(data[0].title);
      setContent(data);
    } catch (error) {
      console.log(error);
    }
  };

  const postData = async () => {
    try {
      await supabase
        .from("writedown")
        .insert({ title, content: newContent, titleId: id, name });
      navigate(`/result/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickHandler = () => {
    switch (process) {
      case 0:
        if (newContent.trim().length !== 0) {
          setError(false);
          setProcess(1);
        } else {
          setError(true);
          setErrorTxt("빈칸을 입력해주세요");
        }

        break;
      case 1:
        if (name.trim().length !== 0 && name.trim().length <= 10) {
          postData();
          setError(false);
        } else if (name.trim().length > 10) {
          setError(true);
          setErrorTxt("10글자 이내로 작성해주세요");
        } else {
          setError(true);
          setErrorTxt("빈칸을 입력해주세요");
        }

        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      {process === 0 && (
        <StyledTitle>
          이어질 문장을 적어주세요.{" "}
          <span className="sub">
            이제 붓자루는 당신에게 있습니다. 제 2의 한석봉에 도전하세요.
          </span>
        </StyledTitle>
      )}{" "}
      {process === 1 && (
        <StyledTitle>
          당신의 이름을 적어주세요
          <span className="sub">모든 붓자루에는 주인이 있기 마련입니다.</span>
        </StyledTitle>
      )}
      <StyledListBox>
        {content.map((el: any) => {
          return (
            <StyledMainItem>
              {el.content}
              <span className="sub">
                {el.created_at.split("").slice(0, 10)} - {el.name}
              </span>
            </StyledMainItem>
          );
        })}

        <div className=""></div>
      </StyledListBox>
      {process === 0 && (
        <StyledInput
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="예) 어머니는 종이와 붓과 벼루를 가져오셨다."
        />
      )}{" "}
      {process === 1 && (
        <StyledInput
          onChange={(e) => setName(e.target.value)}
          placeholder="예) 한석봉 (10글자 이내)"
        />
      )}
      {error && <StyledErrorTxt>{errorTxt}</StyledErrorTxt>}
      <StyledNextButton onClick={onClickHandler}>Finish</StyledNextButton>
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

const StyledListBox = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  width: 85%;
  padding: 15px 25px;
  background-color: #3b3b3b;
  line-height: 1.6;
`;

const StyledMainItem = styled.div`
  width: 90%;
  margin-bottom: 15px;
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

const StyledInput = styled.input`
  margin-top: 50px;
  width: 85%;
  height: 50px;
  border: none;
  padding: 0 3%;
  background-color: #222222;
  font-size: 16px;
  color: white;
  ::placeholder {
    font-size: 14px;
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
const StyledNextButton = styled.button`
  margin-top: 15px;
  width: 85%;
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

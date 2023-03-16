import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Footer } from "../global/Footer";
import { Header } from "../global/Header";
import { Layout } from "../global/Layout";
import { supabase } from "../lib/api";

type Tdata = {
  title: string;
  content: string[];
};

export const ShareWrite = () => {
  const navigate = useNavigate();
  const [process, setProcess] = useState<number>(0);

  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string[]>([""]);
  const [newContent, setNewContent] = useState<string>("");

  const getData = async () => {
    const { data, error }: any = await supabase
      .from("writedown")
      .select("title,content")
      .eq("id", id);
    console.log(error);
    if (data.length === 0) {
      alert("에러발생");
    }
    setTitle(data[0].title);
    setContent(data[0].content);
  };

  const postData = async () => {
    try {
      await supabase
        .from("writedown")
        .update({ content: [...content, newContent] })
        .eq("id", id);
      navigate(`/result/${id}`);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const onClickHandler = () => {
    postData();
  };

  return (
    <Layout>
      <Header text={"한 문장에 꾹꾹 눌러담아 써보세요"} />
      <StyledTitle>{title}</StyledTitle>
      <StyledContent>
        {content.join(" ")} {newContent}
      </StyledContent>
      <StyledTextArea onChange={(e) => setNewContent(e.target.value)} />
      <StyledNextButton onClick={onClickHandler}>완성</StyledNextButton>
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

const StyledContent = styled.div`
  margin-top: 30px;
  width: 90%;
  height: 50px;
  border: none;
  font-size: 16px;
  line-height: 1.6;
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

const StyledTextArea = styled.textarea`
  margin-top: 50px;
  width: 90%;
  height: 10%;
`;

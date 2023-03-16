import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Footer } from "../global/Footer";
import { Header } from "../global/Header";
import { Layout } from "../global/Layout";
import { supabase } from "../lib/api";

type Tdata = {
  title: string;
  content: string[];
};

export const Result = () => {
  const { id } = useParams();
  const [data, setData] = useState<Tdata>();

  const getData = async () => {
    const { data }: any = await supabase
      .from("writedown")
      .select("title,content")
      .eq("id", id);
    setData(data[0]);
  };

  const url = `${window.location.origin}/${id}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(url).then(() => {
      console.log(url, "복사완료");
    });
  };

  useEffect(() => {
    if (id) getData();
  }, []);

  return (
    <Layout>
      <Header />
      <StyledTitle>{data?.title}</StyledTitle>
      <StyledContent>{data?.content?.join(" ")}</StyledContent>
      <StyledShareButton onClick={copyUrl}>
        링크 복사하여 공유하기
      </StyledShareButton>
      <Footer />
    </Layout>
  );
};

const StyledTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin: 130px 0 30px 0;
  width: 90%;
  text-align: center;
`;

const StyledContent = styled.div`
  font-size: 16px;
  font-weight: 700;
  width: 90%;
  line-height: 1.6;
`;

const StyledShareButton = styled.button`
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

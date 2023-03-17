import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Layout } from "../global/Layout";
import { supabase } from "../lib/api";
import ReactGA from "react-ga4";

type Tdata = {
  title: string;
  content: string[];
};

export const Result = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<any>([]);
  const getData = async () => {
    const { data }: any = await supabase
      .from("writedown")
      .select("title,content,name,created_at")
      .eq("titleId", id);
    console.log(data[0].content);
    setTitle(data[0].title);
    setContent(data);
    console.log(data);
  };

  const url = `${window.location.origin}/${id}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(url).then(() => {
      console.log(url, "복사완료");
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <StyledTitle>제목: {title}</StyledTitle>
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

        <div className="helptxt">다음 문장을 이어 적어주세요! |</div>
      </StyledListBox>

      <StyledShareButton
        onClick={() => {
          ReactGA.event({
            category: "Button",
            action: "copyUrl",
            label: "result",
          });
          copyUrl();
        }}
      >
        <svg
          style={{ marginRight: "10px" }}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 11V14H2V11H0V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V11H14ZM3 5L4.41 6.41L7 3.83V12H9V3.83L11.59 6.41L13 5L8 0L3 5Z"
            fill="white"
          />
        </svg>
        공유하기
      </StyledShareButton>
      <StyledShareButton className="bottom" onClick={() => navigate("/")}>
        <svg
          style={{ marginRight: "5px" }}
          width="19"
          height="18"
          viewBox="0 0 19 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.06 0.585L17.41 1.935C18.2 2.715 18.2 3.985 17.41 4.765L4.18 17.995H0V13.815L10.4 3.405L13.23 0.585C14.01 -0.195 15.28 -0.195 16.06 0.585ZM2 15.995L3.41 16.055L13.23 6.225L11.82 4.815L2 14.635V15.995Z"
            fill="white"
          />
        </svg>
        새로운 글 작성
      </StyledShareButton>
    </Layout>
  );
};

const StyledTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin: 100px 0 0px 0;
  width: 80%;
`;

const StyledListBox = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  width: 80%;
  padding: 15px 25px;
  background-color: #3b3b3b;
  line-height: 1.6;
  .helptxt {
    width: 90%;
    color: #646464;
  }
`;

const StyledMainItem = styled.div`
  width: 90%;
  margin-bottom: 15px;
  font-size: 12px;
  line-height: 1.5;
  word-break: break-all;
  .sub {
    color: #999595;
    width: 100%;
    display: flex;
    margin-top: px;
    font-size: 10px;
    justify-content: end;
  }
`;

const StyledShareButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  width: 80%;
  height: 50px;
  font-weight: 700;
  border: none;
  color: white;
  background-color: #eb7305;
  &.bottom {
    margin-top: 15px;
    background-color: #b0adaa;
  }
  :hover {
    cursor: pointer;
    color: #d2d2d2;
  }
`;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Layout } from "../global/Layout";
import { supabase } from "../lib/api";
import ReactGA from "react-ga4";

type Tdata = {
  title: string;
  content: string;
  name: string;
  created_at: string;
};

type TdataArray = Tdata[];

export const Result = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<TdataArray>([]);
  const getData = async () => {
    const { data }: any = await supabase
      .from("writedown")
      .select("title,content,name,created_at")
      .eq("titleId", id);
    setTitle(data[0].title);
    setContent(data);
  };

  const url = `${window.location.origin}/${id}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert("복사완료");
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <StyledTitle>
        <div className="title"> 제목: {title} </div>
        <div
          className="copy"
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
            style={{ marginRight: "5px" }}
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.28639 9.46195C8.625 9.1425 9.07861 8.94445 9.58333 8.94445C10.6439 8.94445 11.5 9.80056 11.5 10.8611C11.5 11.9217 10.6439 12.7778 9.58333 12.7778C8.52278 12.7778 7.66667 11.9217 7.66667 10.8611C7.66667 10.7078 7.69222 10.5608 7.72417 10.4203L3.22 7.78806C2.875 8.1075 2.42139 8.30556 1.91667 8.30556C0.856111 8.30556 0 7.44945 0 6.38889C0 5.32833 0.856111 4.47222 1.91667 4.47222C2.42139 4.47222 2.875 4.67028 3.22 4.98972L7.72417 2.36389C7.69222 2.22333 7.66667 2.07 7.66667 1.91667C7.66667 0.856111 8.52278 0 9.58333 0C10.6439 0 11.5 0.856111 11.5 1.91667C11.5 2.97722 10.6439 3.83333 9.58333 3.83333C9.07861 3.83333 8.61861 3.63528 8.28 3.31583L3.77583 5.94167C3.80778 6.08861 3.83333 6.23556 3.83333 6.38889C3.83333 6.54222 3.80778 6.68917 3.77583 6.83611L8.28639 9.46195ZM10.2222 1.91671C10.2222 1.56532 9.93473 1.27782 9.58334 1.27782C9.23195 1.27782 8.94445 1.56532 8.94445 1.91671C8.94445 2.26809 9.23195 2.55559 9.58334 2.55559C9.93473 2.55559 10.2222 2.26809 10.2222 1.91671ZM1.91666 7.02778C1.56527 7.02778 1.27777 6.74028 1.27777 6.38889C1.27777 6.0375 1.56527 5.75 1.91666 5.75C2.26805 5.75 2.55555 6.0375 2.55555 6.38889C2.55555 6.74028 2.26805 7.02778 1.91666 7.02778ZM8.94445 10.8611C8.94445 11.2125 9.23195 11.5 9.58334 11.5C9.93473 11.5 10.2222 11.2125 10.2222 10.8611C10.2222 10.5097 9.93473 10.2222 9.58334 10.2222C9.23195 10.2222 8.94445 10.5097 8.94445 10.8611Z"
              fill="white"
            />
          </svg>
          릴레이 공유
        </div>
      </StyledTitle>
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

      <StyledShareButton onClick={() => navigate(`/capture/${id}`)}>
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
        결과물 저장하기
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
      {/* <StyledShareButton
        onClick={() => {
          navigate(`/capture/${id}`);
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
        자랑하러가기
      </StyledShareButton> */}
    </Layout>
  );
};

const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 100px 0 0px 0;
  width: 80%;
  .title {
    font-size: 20px;
    font-weight: 700;
  }
  .copy {
    background-color: #3b3b3b;
    font-size: 14px;
    padding: 10px;
    :hover {
      cursor: pointer;
      background-color: gray;
    }
  }
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

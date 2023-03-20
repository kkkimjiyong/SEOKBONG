import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Layout } from "../global/Layout";
import { supabase } from "../lib/api";
import CaptureMain1 from "../assets/CaptureBack1.png";
import WaterMark from "../assets/waterMark.png";
import html2canvas from "html2canvas";
import { EditTable } from "./EditTable";

export const Capture = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<any>([]);
  const [name, setName] = useState<string>("");
  const [hideSub, setHideSub] = useState<boolean>(true);
  const getData = async () => {
    const { data }: any = await supabase
      .from("writedown")
      .select("title,content,name,created_at")
      .eq("titleId", id);
    setTitle(data[0].title);
    setContent(data);
    for (let i = 0; i < data.length; i++) {
      if (i !== 0) {
        setName((prev: string) => (prev += `,${data[i].name}`));
      } else {
        setName((prev: string) => (prev += `${data[i].name}`));
      }
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // --------------------------   폰트 및 배경바꾸기   -----------------------------

  const [font, setFont] = useState<any>();
  const [back, setBack] = useState<any>(CaptureMain1);
  const [modal, setModal] = useState<boolean>(true);
  // -------------------  캡쳐  -------------------------------

  const captureRef = useRef(null);

  const onHtmlToPng = () => {
    const onCapture = () => {
      console.log("onCapture");
      if (captureRef.current !== null)
        html2canvas(captureRef.current).then((canvas) => {
          onSaveAs(canvas.toDataURL("image/png"), "image-download.png");
        });
    };

    const onSaveAs = (uri: string, filename: string) => {
      console.log("onSaveAs");
      var link = document.createElement("a");
      document.body.appendChild(link);
      link.href = uri;
      link.download = filename;
      link.click();
      document.body.removeChild(link);
    };
    onCapture();
  };

  return (
    <Layout>
      <EditTable
        setFont={setFont}
        setBack={setBack}
        setModal={setModal}
        modal={modal}
      />

      <StyledContainer font={font} ref={captureRef}>
        <StyledBack src={back} alt="배경" />
        <StyledTitle>{title}</StyledTitle>
        <StyledName>{name}</StyledName>
        <StyledContent>
          {" "}
          {content.map((el: any) => {
            return (
              <StyledMainItem>
                {/* {!modal && (
                  <StyledCurrentEditArrow>
                    이 문장 수정하기
                  </StyledCurrentEditArrow>
                )} */}
                {el.content}
                {hideSub && (
                  <span className="sub">
                    {el.created_at.split("").slice(0, 10)} - {el.name}
                  </span>
                )}
              </StyledMainItem>
            );
          })}
        </StyledContent>
        <StyledWaterMark src={WaterMark} alt="SEOK-BONG" />
      </StyledContainer>
      <StyledHideButton onClick={() => setHideSub(!hideSub)}>
        문장별 글쓴이 {hideSub ? "지우기" : "보이기"}
      </StyledHideButton>
      <StyledButton onClick={onHtmlToPng}>
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
        이미지 다운로드
      </StyledButton>
      <StyledBackButton onClick={() => navigate(`/result/${id}`)}>
        뒤로가기
      </StyledBackButton>
    </Layout>
  );
};

const StyledTitle = styled.div`
  z-index: 2;
  font-size: 24px;
  font-weight: 700;
  color: black;
  position: absolute;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;
const StyledBackButton = styled.button`
  margin-top: 20px;
  background-color: gray;
  z-index: 3;
  font-size: 16px;
  width: 80%;
  height: 50px;
  border: none;
  color: white;
  font-weight: 700;
  height: 50px;
`;

const StyledName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  z-index: 2;
  font-size: 14px;
  font-weight: 700;
  color: black;
  position: absolute;
  width: 80%;
  top: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const StyledContent = styled.div`
  position: absolute;
  font-weight: 700;
  width: 80%;
  top: 120px;
  color: black;
`;

const StyledCurrentEditArrow = styled.div`
  position: absolute;
  left: -50px;
  width: 40px;
  height: 20px;
  background-color: rebeccapurple;
  :hover {
    cursor: pointer;
    background-color: aqua;
  }
`;

const StyledMainItem = styled.div`
  position: relative;
  z-index: 3;
  width: 90%;
  margin-bottom: 15px;
  font-size: 12px;
  line-height: 1.5;
  word-break: break-all;
  color: black;
  .sub {
    color: #999595;
    width: 100%;
    display: flex;
    font-weight: 500;
    font-size: 10px;
    justify-content: end;
  }
`;

const StyledWaterMark = styled.img`
  position: absolute;
  bottom: 15px;
  right: 20px;
  width: 10%;
  opacity: 0.3;
`;

const StyledContainer = styled.div<{ font: any }>`
  font-family: ${({ font }) => font && `${font.fontFamily}`};
  position: relative;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  margin-top: 150px;
  width: 80%;
  height: 50%;
  min-height: 300px;
`;

const StyledBack = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const StyledButton = styled.button`
  margin-top: 30px;
  z-index: 3;
  font-size: 16px;
  width: 80%;
  height: 50px;
  background-color: #eb7305;
  border: none;
  color: white;
  font-weight: 700;
  :hover {
    cursor: pointer;
    background-color: white;
    color: #eb7305;
  }
`;
const StyledHideButton = styled.button`
  margin-top: 30px;
  z-index: 3;
  font-size: 12px;
  width: 40%;
  height: 30px;
  background-color: #eb7305;
  border: none;
  color: white;
  font-weight: 700;
  :hover {
    cursor: pointer;
    background-color: white;
    color: #eb7305;
  }
`;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { ThemeContext } from "styled-components";
import { Layout } from "../global/Layout";
import { supabase } from "../lib/api";
import WaterMark from "../assets/waterMark.png";
import html2canvas from "html2canvas";
import Theme1 from "../assets/Mask group.png";
import Theme2 from "../assets/Mask group-1.png";
import Theme3 from "../assets/Mask group-2.png";
import Theme4 from "../assets/Mask group-3.png";
import Theme5 from "../assets/Mask group-4.png";
import Back1 from "../assets/Back1.png";
import Back2 from "../assets/Back2.png";
import Back3 from "../assets/Back3.png";
import Back4 from "../assets/Back4.png";
import Back5 from "../assets/Back5.png";

type TthemeData = {
  padding?: boolean;
  backSrc: string;
  src: string;
  fontFamily: string;
  titleFont: string;
  contentFont: string;
  fontColor: string;
};

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
  const themeData: TthemeData[] = [
    {
      padding: true,
      backSrc: Back2,
      src: Theme1,
      fontFamily: "Black And White Picture",
      titleFont: "26px",
      contentFont: "16px",
      fontColor: "black",
    },
    {
      backSrc: Back5,
      src: Theme2,
      fontFamily: "Dokdo",
      titleFont: "30px",
      contentFont: "20px",
      fontColor: "white",
    },
    {
      backSrc: Back1,
      src: Theme3,
      fontFamily: "Nanum Brush Script",
      titleFont: "30px",
      contentFont: "20px",
      fontColor: "white",
    },
    {
      backSrc: Back3,
      src: Theme4,
      fontFamily: "Noto Serif KR",
      titleFont: "20px",
      contentFont: "12px",
      fontColor: "white",
    },
    {
      backSrc: Back4,
      src: Theme5,
      fontFamily: "Song Myung",
      titleFont: "24px",
      contentFont: "14px",
      fontColor: "black",
    },
  ];
  const [theme, setTheme] = useState<any>(themeData[0]);
  const [modal, setModal] = useState<boolean>(true);

  // // -------------------  캡쳐  -------------------------------

  // const captureRef = useRef(null);

  // const onHtmlToPng = () => {
  //   const onCapture = () => {
  //     console.log("onCapture");
  //     if (captureRef.current !== null)
  //       html2canvas(captureRef.current).then((canvas) => {
  //         onSaveAs(canvas.toDataURL("image/png"), "image-download.png");
  //       });
  //   };

  //   const onSaveAs = (uri: string, filename: string) => {
  //     console.log("onSaveAs");
  //     var link = document.createElement("a");
  //     document.body.appendChild(link);
  //     link.href = uri;
  //     link.download = filename;
  //     link.click();
  //     document.body.removeChild(link);
  //   };
  //   onCapture();
  // };
  const url = `${window.location.origin}/${id}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert("복사완료");
    });
  };

  return (
    <Layout>
      <StyledEditCtn>
        테마지정
        <StyledEditTable>
          {themeData.map((el: TthemeData) => {
            return (
              <StyledThemeBox
                onClick={() => setTheme(el)}
                fontFamily={el.fontFamily}
                fontSize={el.titleFont}
                color={el.fontColor}
              >
                가<StyledBack src={el.src} alt="배경" />
              </StyledThemeBox>
            );
          })}
        </StyledEditTable>
      </StyledEditCtn>

      <StyledContainer font={theme.fontFamily}>
        <StyledBackCtn src={theme.backSrc} alt="배경" />
        <StyledTitle
          padding={theme["padding"]}
          fontSize={theme.titleFont}
          color={theme.fontColor}
        >
          {title}
        </StyledTitle>
        <StyledName color={theme.fontColor} padding={theme["padding"]}>
          {name}
        </StyledName>
        <StyledContent fontSize={theme.contentFont} padding={theme["padding"]}>
          {content.map((el: any) => {
            return (
              <StyledMainItem color={theme.fontColor}>
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
      <StyledButton onClick={copyUrl}>
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
      </StyledButton>
      <StyledButton className="gray" onClick={() => navigate(`/`)}>
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
        </svg>{" "}
        새로운 글 작성
      </StyledButton>
    </Layout>
  );
};

const StyledEditCtn = styled.div`
  z-index: 4;
  top: 0;
  position: absolute;
  width: 100%;
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px 40px;
  background-color: #d9d9d9;
  color: black;
  font-weight: 700;
`;

const StyledBackCtn = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const StyledEditTable = styled.div`
  z-index: 4;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #d9d9d9;
`;

const StyledTitle = styled.div<{
  fontSize: string;
  padding: boolean;
  color: string;
}>`
  color: ${({ color }) => color && `${color}`};
  z-index: 2;
  font-size: ${({ fontSize }) => fontSize && `${fontSize}`};
  font-weight: 700;
  margin-top: ${({ padding }) => padding && `35px`};
  position: absolute;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const StyledName = styled.div<{ padding: boolean; color: string }>`
  color: ${({ color }) => color && `${color}`};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  z-index: 2;
  font-size: 12px;
  font-weight: 700;
  position: absolute;
  width: ${({ padding }) => (padding ? "70%" : "80%")};
  top: ${({ padding }) => (padding ? "120px" : "80px")};
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const StyledContent = styled.div<{
  fontSize: string;
  padding: boolean;
}>`
  font-size: ${({ fontSize }) => fontSize && `${fontSize}`};
  position: absolute;
  font-weight: 700;
  width: 80%;
  width: ${({ padding }) => (padding ? "70%" : "80%")};
  top: ${({ padding }) => (padding ? "150px" : "120px")};
`;

const StyledMainItem = styled.div<{ color: string }>`
  color: ${({ color }) => color && `${color}`};
  position: relative;
  z-index: 3;
  width: 90%;
  margin-bottom: 15px;
  line-height: 1.5;
  word-break: break-all;
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
  font-family: ${({ font }) => font && `${font}`};
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

const StyledThemeBox = styled.div<{
  fontFamily: string;
  fontSize: string;
  color: string;
}>`
  font-family: ${({ fontFamily }) => fontFamily && `${fontFamily}`};
  font-size: ${({ fontSize }) => fontSize && `${fontSize}`};
  color: ${({ color }) => color && `${color}`};
  font-weight: 700;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid black;
`;

const StyledBack = styled.img`
  width: 100%;
  position: absolute;
  z-index: -1;
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
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    cursor: pointer;
    background-color: white;
    color: #eb7305;
  }
  &.gray {
    margin-top: 15px;
    background-color: #afadaa;
  }
`;
const StyledHideButton = styled.div`
  margin-top: 10px;
  text-decoration: underline;
  z-index: 3;
  font-size: 12px;
  border: none;
  color: white;
  font-weight: 500;
`;

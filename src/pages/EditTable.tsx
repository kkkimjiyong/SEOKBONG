import React, { useState } from "react";
import styled from "styled-components";
import CaptureMain1 from "../assets/CaptureBack1.png";
import CaptureMain2 from "../assets/CaptureBack2.jpg";
import CaptureMain3 from "../assets/CaptureBack3.jpg";
import CaptureMain4 from "../assets/CaptureBack4.jpg";
import CaptureMain5 from "../assets/CaptureBack5.jpg";
export const EditTable = ({
  setFont,
  setBack,
  modal,
  setModal,
}: {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<any>>;
  setBack: React.Dispatch<React.SetStateAction<any>>;
  setFont: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const fontData = [
    { fontFamily: "Black And White Picture", fontSize: "24px" },
    { fontFamily: "Dokdo", fontSize: "24px" },
    { fontFamily: "Nanum Brush Script", fontSize: "24px" },
    { fontFamily: "Noto Sans KR", fontSize: "24px" },
    { fontFamily: "Song Myung, serif", fontSize: "24px" },
  ];

  const backData = [
    { name: "1", src: CaptureMain1 },
    { name: "2", src: CaptureMain2 },
    { name: "3", src: CaptureMain3 },
    { name: "4", src: CaptureMain4 },
    { name: "5", src: CaptureMain5 },
  ];

  const [category, setCategory] = useState<string>("font");

  return (
    <StyledContainer modal={modal}>
      <StyledEditCategoryBox>
        <StyledEditCategory
          category={category === "font"}
          onClick={() => setCategory("font")}
        >
          폰트
        </StyledEditCategory>
        <StyledEditCategory
          category={category === "back"}
          onClick={() => setCategory("back")}
        >
          배경
        </StyledEditCategory>
      </StyledEditCategoryBox>
      {category === "font" && (
        <div>
          <StyledFontBox>
            {fontData.map((el) => {
              return (
                <StyledFontButton font={el} onClick={() => setFont(el)}>
                  석봉
                </StyledFontButton>
              );
            })}
          </StyledFontBox>
          <StyledFontColorBox>
            <StyledFontColor />
            <StyledFontColor className="blue" />
            <StyledFontColor className="yellow" />
            <StyledFontColor className="purple" />
            <StyledFontColor className="white" />
          </StyledFontColorBox>
        </div>
      )}
      {category === "back" && (
        <StyledFontBox>
          {backData.map((el) => {
            return (
              <StyledBackButton onClick={() => setBack(el.src)}>
                {el.name}
              </StyledBackButton>
            );
          })}
        </StyledFontBox>
      )}
      <StyledHideBtn modal={modal} onClick={() => setModal(!modal)}>
        {modal ? "글 꾸미기" : "숨기기"}
      </StyledHideBtn>
    </StyledContainer>
  );
};

const StyledContainer = styled.div<{ modal: boolean }>`
  position: absolute;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: white;
  height: 150px;
  top: ${({ modal }) => (modal ? "-130px" : "0px")};
  transition: all 400ms linear;
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  z-index: 10;
`;
const StyledEditCategoryBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const StyledEditCategory = styled.div<{ category: boolean }>`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100%;
  background-color: ${({ category }) => (category ? "white" : "gray")};
  color: ${({ category }) => (category ? "#eb7305" : "white")};
  padding: 10px 0;
  font-size: 20px;
  font-weight: 700;

  :hover {
    cursor: pointer;
    background-color: #eb7305;
    color: white;
  }
`;

const StyledFontColorBox = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
  justify-content: space-around;
  align-items: center;
`;

const StyledFontColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: red;
  :hover {
    cursor: pointer;
  }
  &.blue {
    background-color: blue;
  }
  &.purple {
    background-color: purple;
  }
  &.white {
    background-color: white;
  }
  &.yellow {
    background-color: yellow;
  }
`;

const StyledFontBox = styled.div`
  display: flex;
`;

const StyledFontButton = styled.button<{ font: any }>`
  font-family: ${({ font }) => font && `${font.fontFamily}`};
  z-index: 3;
  font-size: 20px;
  width: 100%;
  background-color: gray;
  border: none;
  color: white;
  font-weight: 700;
  :hover {
    cursor: pointer;
    background-color: white;
    color: #eb7305;
  }
`;

const StyledBackButton = styled.div`
  z-index: 3;
  font-size: 20px;
  width: 100%;
  background-color: gray;
  border: none;
  color: white;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  :hover {
    cursor: pointer;
    background-color: white;
    color: #eb7305;
  }
`;

const StyledHideBtn = styled.div<{ modal: boolean }>`
  :hover {
    cursor: pointer;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20px;
  font-size: 14px;
  font-weight: 700;
  transition: all 400ms linear;
  background-color: ${({ modal }) => (modal ? "#eb7305" : "gray")};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  :hover {
    cursor: pointer;
    background-color: white;
    color: #eb7305;
  }
`;

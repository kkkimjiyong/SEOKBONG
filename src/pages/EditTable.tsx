import React, { useState } from "react";
import styled from "styled-components";

export const EditTable = ({
  setFont,
}: {
  setFont: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const fontData = [
    { fontFamily: "Black And White Picture", fontSize: "24px" },
    { fontFamily: "Dokdo", fontSize: "24px" },
    { fontFamily: "Nanum Brush Script", fontSize: "24px" },
    { fontFamily: "Noto Sans KR", fontSize: "24px" },
    { fontFamily: "Song Myung, serif", fontSize: "24px" },
  ];

  const [modal, setModal] = useState<boolean>(true);
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
      <div>
        <StyledFontBox>
          <StyledFontButton
            font={fontData[0]}
            onClick={() => setFont(fontData[0])}
          >
            석봉
          </StyledFontButton>{" "}
          <StyledFontButton
            font={fontData[1]}
            onClick={() => setFont(fontData[1])}
          >
            석봉
          </StyledFontButton>
          <StyledFontButton
            font={fontData[2]}
            onClick={() => setFont(fontData[2])}
          >
            석봉
          </StyledFontButton>{" "}
          <StyledFontButton
            font={fontData[3]}
            onClick={() => setFont(fontData[3])}
          >
            석봉
          </StyledFontButton>{" "}
          <StyledFontButton
            font={fontData[4]}
            onClick={() => setFont(fontData[4])}
          >
            석봉
          </StyledFontButton>{" "}
        </StyledFontBox>
      </div>{" "}
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

const StyledFontTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  padding: 10px 0;
  background-color: gray;
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

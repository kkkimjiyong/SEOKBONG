import React from "react";
import styled, { keyframes } from "styled-components";

export const Layout = ({ children }: { children: any }) => {
  return (
    <FlexBox className="layout">
      {" "}
      <Wrap className="layout">{children}</Wrap>
    </FlexBox>
  );
};

const FlexBox = styled.div`
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  background-color: white;
`;

const Wrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  overflow-x: hidden;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 390px;
  height: 100vh;
  background-color: black;
`;

import React from "react";
import styled from "styled-components";

export const Header = ({ text }: { text?: string }) => {
  return <Container></Container>;
};

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  max-width: 375px;
  height: 80px;
  background-color: gray;
`;

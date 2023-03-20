import { Main } from "../pages/Main";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Write } from "../pages/Write";
import { Result } from "../pages/Result";
import { ShareMain } from "../pages/ShareMain";
import { ShareWrite } from "../pages/ShareWrite";
import { Capture } from "../pages/Capture";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/:id" element={<ShareMain />} />
      <Route path="/write" element={<Write />} />
      <Route path="/write/:id" element={<ShareWrite />} />
      <Route path="/result/:id" element={<Result />} />
      <Route path="/capture/:id" element={<Capture />} />
    </Routes>
  );
};

export default Router;

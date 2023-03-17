import { Main } from "../pages/Main";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Write } from "../pages/Write";
import { Result } from "../pages/Result";
import { ShareMain } from "../pages/ShareMain";
import { ShareWrite } from "../pages/ShareWrite";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<ShareMain />} />
        <Route path="/write" element={<Write />} />
        <Route path="/write/:id" element={<ShareWrite />} />
        <Route path="/result/:id" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

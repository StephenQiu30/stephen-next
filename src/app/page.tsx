"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { PageContainer } from "@ant-design/pro-components";

const Home: React.FC = () => {
  const loginUser = useSelector((state: RootState) => state.loginUser);
  return <PageContainer></PageContainer>;
};

export default Home;

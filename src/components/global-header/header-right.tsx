import React from "react";
import { Button } from "antd";
import { GithubOutlined, SearchOutlined } from "@ant-design/icons";
import { GITHUB } from "@/constants";

interface HeaderRightProps {}

const HeaderRight: React.FC<HeaderRightProps> = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {/* 搜索按钮 */}
      <Button
        type="text"
        icon={<SearchOutlined />}
        size="small"
        onClick={() => {
          // 搜索功能逻辑
          console.log("搜索");
        }}
      />

      {/* GitHub按钮 */}
      <Button
        type="text"
        icon={<GithubOutlined />}
        size="small"
        onClick={() => {
          window.open(GITHUB, "_blank");
        }}
      />
    </div>
  );
};

export default HeaderRight;

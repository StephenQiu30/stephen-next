import React from "react";
import { DefaultFooter } from "@ant-design/pro-layout";
import { GithubOutlined } from "@ant-design/icons";
import { GITHUB, GITHUB_TITLE } from "@/constants";

/**
 * 全局底部栏组件
 * @constructor
 */
const GlobalFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      className={"global-footer"}
      copyright={`${GITHUB_TITLE} ${currentYear}`}
      links={[
        {
          key: "Github",
          title: <GithubOutlined />,
          href: GITHUB,
          blankTarget: true,
        },
      ]}
    />
  );
};

export default GlobalFooter;

import React from "react";
import { DefaultFooter } from "@ant-design/pro-layout";
import { GithubOutlined, MailOutlined } from "@ant-design/icons";
import { GITHUB, GITHUB_TITLE } from "@/constants";

const GlobalFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const email = process.env.NEXT_PUBLIC_EMAIL || "Popcornqhd@gmail.com";
  const icp = process.env.NEXT_PUBLIC_ICP || "";

  return (
    <DefaultFooter
      className={"global-footer"}
      copyright={`${GITHUB_TITLE} ${currentYear}${icp ? ` | ${icp}` : ""}`}
      links={[
        {
          key: "Github",
          title: (
            <>
              <GithubOutlined /> Github
            </>
          ),
          href: GITHUB,
          blankTarget: true,
        },
        {
          key: "Email",
          title: (
            <>
              <MailOutlined /> Email
            </>
          ),
          href: `mailto:${email}`,
        },
      ]}
    />
  );
};

export default GlobalFooter;

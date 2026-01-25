import React from "react";
import { DefaultFooter } from "@ant-design/pro-layout";
import { GithubOutlined, MailOutlined } from "@ant-design/icons";

const GlobalFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      className={"global-footer"}
      copyright={`${process.env.NEXT_PUBLIC_AUTHOR} ${currentYear}`}
      links={[
        {
          key: "Github",
          title: (
            <>
              <GithubOutlined /> Github
            </>
          ),
          href: process.env.NEXT_PUBLIC_GITHUB || "",
          blankTarget: true,
        },
        {
          key: "Email",
          title: (
            <>
              <MailOutlined /> Email
            </>
          ),
          href: `mailto:${process.env.NEXT_PUBLIC_EMAIL}`,
        },
      ]}
    />
  );
};

export default GlobalFooter;

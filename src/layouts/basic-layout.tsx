"use client";
import { ProLayout } from "@ant-design/pro-components";
import React from "react";
import Image from "next/image";
import { GITHUB, LOGO, SUBTITLE, TITLE } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/global-footer";
import { useSelector } from "react-redux";
import { AvatarDropdown } from "@/components/global-header";
import { RootState } from "@/store";
import { GithubFilled } from "@ant-design/icons";
import menuConfig from "@/config/menu-config";

interface Props {
  children: React.ReactNode;
}

/**
 * 通用布局
 * @param props
 * @constructor
 */
const BasicLayout: React.FC<Props> = (props) => {
  const { children } = props;
  const pathname = usePathname();
  const loginUser = useSelector((state: RootState) => state.loginUser);


  return (
    <ProLayout
      layout={"top"}
      contentWidth={"Fixed"}
      fixedHeader={true}
      title={TITLE}
      logo={<Image src={LOGO} width={32} height={32} alt={TITLE} />}
      location={{
        pathname,
      }}
      avatarProps={{
        size: "small",
        render: () => {
          return <AvatarDropdown currentUser={loginUser} />;
        },
      }}
      headerTitleRender={(logo) => {
        return (
          <div>
            <a>{logo}</a>
            <span>{TITLE}</span>
          </div>
        );
      }}
      // 渲染底部栏
      footerRender={() => {
        return <GlobalFooter key={"globalFooter"} />;
      }}
      // 定义菜单
      menuDataRender={() => {
        return menuConfig;
      }}
      actionsRender={(props) => {
        if (props.isMobile) return [];
        return [
          <GithubFilled
            key="GithubFilled"
            onClick={() => {
              window.open(GITHUB, "_target");
            }}
          />,
        ];
      }}
      // 菜单项如何渲染
      menuItemRender={(item, dom) => (
        <Link href={item.path || "/"} target={"_self"}>
          {dom}
        </Link>
      )}
    >
      {children}
    </ProLayout>
  );
};

export default BasicLayout;

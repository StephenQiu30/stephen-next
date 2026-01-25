"use client";
import React, { useEffect, useState } from "react";
import { ProLayout } from "@ant-design/pro-components";
import { Button, ConfigProvider, Space, Spin, theme } from "antd";
import {
  GithubOutlined,
  MoonOutlined,
  SearchOutlined,
  SunOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/global-footer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setLoginUser } from "@/store/modules";
import { getLoginUser } from "@/api/userController";
import menuConfig from "@/config/menu-config";
import AvatarDropdown from "@/components/global-header/avatar-dropdown";

interface Props {
  children: React.ReactNode;
}

const BasicLayout: React.FC<Props> = (props) => {
  const { children } = props;
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize user on mount
  useEffect(() => {
    const initUser = async () => {
      const token = localStorage.getItem("stephen-next-token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res: any = await getLoginUser();
        if (res.code === 0 && res.data) {
          dispatch(setLoginUser(res.data));
        }
      } catch (error) {
        localStorage.removeItem("stephen-next-token");
        console.error("Failed to get user info:", error);
      } finally {
        setLoading(false);
      }
    };

    initUser();
  }, [dispatch]);

  const themeAlgorithm = isDarkMode
    ? theme.darkAlgorithm
    : theme.defaultAlgorithm;

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: themeAlgorithm,
        token: { colorPrimary: "#1890ff" },
      }}
    >
      <ProLayout
        layout={"top"}
        contentWidth={"Fixed"}
        fixedHeader={true}
        title={process.env.NEXT_PUBLIC_TITLE}
        logo={
          <Image
            src={process.env.NEXT_PUBLIC_LOGO || "/logo.png"}
            width={32}
            height={32}
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/")}
            alt={process.env.NEXT_PUBLIC_TITLE || ""}
          />
        }
        location={{ pathname: pathname ?? undefined }}
        headerTitleRender={(logo) => (
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => router.push("/")}
          >
            {logo}
            <span style={{ marginLeft: 8, fontWeight: 600, fontSize: 18 }}>
              {process.env.NEXT_PUBLIC_TITLE || "StephenQiu30"}
            </span>
          </div>
        )}
        footerRender={() => <GlobalFooter />}
        menuDataRender={() => menuConfig}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return (
            <Space size={8}>
              <Button type="text" icon={<SearchOutlined />} size="large" />
              <Button
                type="text"
                icon={<GithubOutlined />}
                size="large"
                onClick={() =>
                  window.open(process.env.NEXT_PUBLIC_GITHUB, "_blank")
                }
              />
              <Button
                type="text"
                icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
                size="large"
                onClick={() => setIsDarkMode(!isDarkMode)}
              />
              <AvatarDropdown currentUser={loginUser} />
            </Space>
          );
        }}
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"}>{dom}</Link>
        )}
      >
        {children}
      </ProLayout>
    </ConfigProvider>
  );
};

export default BasicLayout;

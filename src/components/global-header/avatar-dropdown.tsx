import React, { useState } from "react";
import { Avatar, Button, Dropdown, Space } from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setLoginUser } from "@/store/modules";
import { useRouter } from "next/navigation";
import { userLogout } from "@/api/userController";
import LoginRegisterModal from "@/components/login/login-modal";

export type AvatarDropdownProps = {
  currentUser?: API.LoginUserVO;
};

/**
 * 头像下拉框
 */
const AvatarDropdown: React.FC<AvatarDropdownProps> = ({ currentUser }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);

  const loginOut = async () => {
    try {
      const res = await userLogout();
      if (res.data.code === 0 && res.data.data) {
        dispatch(setLoginUser({}));
        router.replace("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const menuItems = [
    { key: "logout", icon: <LogoutOutlined />, label: "退出登录" },
  ];

  return (
    <div>
      {currentUser?.id ? (
        <Dropdown
          menu={{ items: menuItems, onClick: loginOut }}
          trigger={["click"]}
        >
          <Space>
            <Avatar src={currentUser?.userAvatar} icon={<UserOutlined />} />
          </Space>
        </Dropdown>
      ) : (
        <>
          <Button
            type="text"
            size={"large"}
            onClick={() => setVisible(true)}
            icon={<UserSwitchOutlined />}
          />
          <LoginRegisterModal
            open={visible}
            onCancel={() => setVisible(false)}
          />
        </>
      )}
    </div>
  );
};

export default AvatarDropdown;

import { MenuDataItem } from "@ant-design/pro-components";
import { HomeOutlined, ReadOutlined } from "@ant-design/icons";

const menuConfig: MenuDataItem[] = [
  {
    path: "/",
    name: "首页",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    path: "/blog",
    name: "博客",
    key: "/blog",
    icon: <ReadOutlined />,
  },
];

export default menuConfig;

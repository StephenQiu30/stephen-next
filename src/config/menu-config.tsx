import { MenuDataItem } from '@ant-design/pro-components';
import {
  DashboardOutlined,
  SettingOutlined,
  TeamOutlined,
  PlusOutlined,
  AppstoreOutlined,
  SafetyOutlined,
} from '@ant-design/icons';

const menuConfig: MenuDataItem[] = [
  {
    path: '/dashboard',
    name: '仪表盘',
    key: '/dashboard',
    icon: <DashboardOutlined />,
    children: [
      {
        path: '/dashboard/analysis',
        name: '分析页',
        key: '/dashboard/analysis',
      },
      {
        path: '/dashboard/monitor',
        name: '监控页',
        key: '/dashboard/monitor',
      },
    ],
  },
  {
    path: '/user',
    name: '用户管理',
    key: '/user',
    icon: <TeamOutlined />,
    children: [
      {
        path: '/user/list',
        name: '用户列表',
        key: '/user/list',
      },
      {
        path: '/user/add',
        name: '新增用户',
        key: '/user/add',
        icon: <PlusOutlined />,
      },
    ],
  },
  {
    path: '/system',
    name: '系统设置',
    key: '/system',
    icon: <SettingOutlined />,
    children: [
      {
        path: '/system/menu',
        name: '菜单管理',
        key: '/system/menu',
        icon: <AppstoreOutlined />,
      },
      {
        path: '/system/role',
        name: '角色管理',
        key: '/system/role',
        icon: <SafetyOutlined />,
      },
    ],
  },
];

export default menuConfig;
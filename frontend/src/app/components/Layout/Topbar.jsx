"use client";
import { Layout, Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Header } = Layout;

const Topbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/auth/login");
  };

  return (
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" onClick={handleLogout} icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Topbar;

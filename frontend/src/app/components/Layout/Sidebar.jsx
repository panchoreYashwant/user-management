"use client";
import { Layout, Menu } from "antd";
import { UserOutlined, TeamOutlined, HomeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Sider } = Layout;

const Sidebar = () => {
  const { role } = JSON.parse(localStorage.getItem("user"));

  const router = useRouter();

  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item
          key="1"
          icon={<HomeOutlined />}
          onClick={() => router.push("/auth/login")}
        >
          Home
        </Menu.Item>
        {role === "manager" && (
          <>
            <Menu.Item
              key="2"
              icon={<TeamOutlined />}
              onClick={() => router.push("/auth/departments")}
            >
              Departments
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<UserOutlined />}
              onClick={() => router.push("/auth/employees")}
            >
              Employees
            </Menu.Item>
          </>
        )}
      </Menu>
    </Sider>
  );
};

export default Sidebar;

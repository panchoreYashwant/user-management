"use client";
import { useState } from "react";
import { Button, Form, Input, notification } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/app/appConfig";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE_URL}/users/login`, values);
      localStorage.setItem("user", JSON.stringify(data));
      if (data.role === "employee") {
        router.push(`/auth/employees/${data.userId}`);
      } else {
        router.push("/auth/employees");
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description:
          error?.response?.data?.error ||
          "Something went wrong. Please try again.",
      });

      console.error("Login failed:", error);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <Form name="login" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: "100%" }}
          >
            Login
          </Button>
        </Form.Item>
        <Button
          type="primary"
          onClick={() => router.push("/auth/signup")}
          style={{ width: "100%" }}
        >
          Signup
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;

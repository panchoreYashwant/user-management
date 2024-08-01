import { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "antd/es/form/Form";
import { API_BASE_URL } from "@/app/appConfig";

const { Option } = Select;

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/users/signup`, values);
      router.push("/auth/login"); // Redirect to the login page after signup
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <Form
        initialValues={{ role: "employee" }}
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select your role!" }]}
        >
          <Select placeholder="Select a role">
            <Option value="manager">Manager</Option>
            <Option value="employee">Employee</Option>
            {/* Add more roles as needed */}
          </Select>
        </Form.Item>

        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: "Please enter your location!" }]}
        >
          <Input placeholder="Enter your location" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Submit
          </Button>
        </Form.Item>
        <Button
          type="primary"
          onClick={() => router.push("/auth/login")}
          style={{ width: "100%" }}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default SignupForm;

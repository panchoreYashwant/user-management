"use client";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const EmployeeId = ({ department }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    if (department) {
      form.setFieldsValue(department);
    }
  }, [department, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (department) {
        await axios.put(`${API_BASE_URL}/departments/${id}`, values);
      } else {
        await axios.post(`${API_BASE_URL}/departments`, values);
      }
      router.push("/auth/departments");
    } catch (error) {
      console.error("Error saving department:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} name="department" onFinish={onFinish}>
      <Form.Item
        name="id"
        rules={[{ required: true, message: "Please input the employee id!" }]}
      >
        <Input placeholder="Employee id" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmployeeId;

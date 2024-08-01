"use client";
import { API_BASE_URL } from "@/app/appConfig";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const DepartmentForm = ({ department }) => {
  const { role } = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    if (role === "employee") router.back();
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
        name="name"
        rules={[
          { required: true, message: "Please input the department name!" },
        ]}
      >
        <Input placeholder="Department Name" />
      </Form.Item>
      <Form.Item
        name="description"
        rules={[
          {
            required: true,
            message: "Please input the department description!",
          },
        ]}
      >
        <Input.TextArea placeholder="Department Description" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {department ? "Update" : "Create"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DepartmentForm;

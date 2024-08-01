"use client";
import { Button, Flex, Table } from "antd";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import debounce from "@/hook/useDebounceHook";
import { API_BASE_URL } from "@/app/appConfig";

const DepartmentList = () => {
  const { role } = JSON.parse(localStorage.getItem("user"));

  const [departments, setDepartments] = useState([]);
  const router = useRouter();
  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/departments`);
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const debounceFunc = useCallback(debounce(fetchDepartments, 500), []);
  useEffect(() => {
    if (role === "employee") router.back();
    debounceFunc();
  }, []);

  const handleDelete = async (depId) => {
    try {
      if (depId) {
        await axios.delete(`${API_BASE_URL}/departments/${depId}`);
        fetchDepartments();
      }
    } catch (error) {
      console.error("Error saving department:", error);
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Flex gap={10}>
          <Button
            type="link"
            onClick={() => router.push(`/auth/departments/${record._id}`)}
          >
            Edit
          </Button>
          <Button
            type="text"
            style={{ color: "red" }}
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
          {/* Add a delete button if needed */}
        </Flex>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => router.push("/auth/departments/0")}>
        Create Department
      </Button>
      <Table
        style={{ marginTop: 20 }}
        dataSource={departments}
        columns={columns}
        rowKey="id"
      />
    </>
  );
};

export default DepartmentList;

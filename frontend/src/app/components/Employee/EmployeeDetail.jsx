"use client";
import { Button, Card, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const { Title, Text, Paragraph } = Typography;
const EmployeeDetail = ({ employee }) => {
  const { role } = JSON.parse(localStorage.getItem("user"));
  const router = useRouter();

  return (
    <>
      {role === "employee" && (
        <Text type="danger" style={{ fontSize: "24px" }}>
          If you want to see department and employee section, Please login with
          manager role.
        </Text>
      )}
      <Card
        title={<Title level={4}>{employee?.name}</Title>}
        extra={
          <Button type="primary" onClick={() => router.push("/auth/employees")}>
            Back to Employees
          </Button>
        }
        style={{ width: 300 }}
      >
        <Paragraph>
          <Text strong>Username: </Text>
          <Text>{employee?.username}</Text>
        </Paragraph>
        <Paragraph>
          <Text strong>Location: </Text>
          <Text>{employee?.location}</Text>
        </Paragraph>
        <Paragraph>
          <Text strong>Role: </Text>
          <Text>{employee?.role}</Text>
        </Paragraph>
        <Paragraph>
          <Text strong>Department: </Text>
          <Text>{employee?.department?.name}</Text>
        </Paragraph>
        <Paragraph>
          <Text strong>Department Description: </Text>
          <Text>{employee?.department?.description}</Text>
        </Paragraph>
      </Card>
    </>
  );
};

export default EmployeeDetail;

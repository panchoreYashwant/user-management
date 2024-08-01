"use client";
import { Button, Table, Input, Select, Popover, Flex } from "antd";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import debounce from "@/hook/useDebounceHook";
import { API_BASE_URL } from "@/app/appConfig";

const { Search } = Input;
const { Option } = Select;

const EmployeeList = () => {
  const { role } = JSON.parse(localStorage.getItem("user"));

  const [employees, setEmployees] = useState([]);
  const [location, setLocation] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [selectedDep, setSelectedDep] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const router = useRouter();

  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      const locationResp = await axios.get(
        `${API_BASE_URL}/users/location/uniqueLocations`
      );
      const departmentData = await axios.get(`${API_BASE_URL}/departments`);
      setLocationData(locationResp.data);
      setEmployees(response.data);
      setDepartments(departmentData.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const filterEmployees = async (value) => {
    let url = "users/filter/filterEmployees?";

    if (location) {
      url += `location=${location}&`;
    }
    if (sortField) {
      url += `field=${sortField}&order=${sortOrder}`;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/${url}`);

      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const debounceFunc = useCallback(debounce(fetchEmployees, 500), []);

  useEffect(() => {
    if (role === "employee") router.back();
    debounceFunc();
  }, []);

  const updateDepartment = async (department, empId) => {
    const filterDep = departments.find((item) => item._id === department);
    try {
      if (department) {
        await axios.put(
          `${API_BASE_URL}/users/updateEmployeeDepartment/${empId}`,
          { department: filterDep }
        );
      }
      fetchEmployees();
    } catch (error) {
      console.error("Error saving department:", error);
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Department", dataIndex: ["department", "name"], key: "location" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Flex gap={20}>
          <Button
            type="link"
            onClick={() => router.push(`/auth/employees/${record._id}`)}
          >
            Details
          </Button>
          <Popover
            content={
              <Select
                placeholder="Select department"
                style={{ width: "100%" }}
                onChange={(val) => {
                  updateDepartment(val, record._id);
                  setSelectedDep(val);
                  hide();
                }}
                value={selectedDep}
              >
                {departments.map((depart) => (
                  <Option key={depart._id} value={depart._id}>
                    {depart.name}
                  </Option>
                ))}
              </Select>
            }
            title="Departments"
            trigger="click"
            open={open === record._id}
            onOpenChange={() => handleOpenChange(record._id)}
          >
            <Button type="primary">Assign Department</Button>
          </Popover>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <Flex gap={10} style={{ marginBottom: 16 }}>
        <Select
          placeholder="Location"
          onChange={(value) => setLocation(value)}
          style={{ width: 200 }}
        >
          <Option value="">All</Option>
          {locationData.map((emp) => (
            <Option value={emp}>{emp}</Option>
          ))}
        </Select>
        <Select value={sortField} onChange={(val) => setSortField(val)}>
          <Option value="">Sort By</Option>
          <Option value="name">Name</Option>
          <Option value="location">Location</Option>
        </Select>
        <Select value={sortOrder} onChange={(val) => setSortOrder(val)}>
          <Option value="asc">Ascending</Option>
          <Option value="desc">Descending</Option>
        </Select>

        <Button onClick={filterEmployees} type="primary">
          Filter
        </Button>
      </Flex>
      <Table dataSource={employees} columns={columns} rowKey="id" />
    </>
  );
};

export default EmployeeList;

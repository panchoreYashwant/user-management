"use client";
// import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import EmployeeDetail from "@/app/components/Employee/EmployeeDetail";
import { API_BASE_URL } from "@/app/appConfig";
import debounce from "@/hook/useDebounceHook";

const EmployeeDetailPage = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${id}`);
      setEmployee(response.data);
    } catch (error) {
      console.error("Error fetching employee:", error);
    }
  };

  const handleDebounce = useCallback(debounce(fetchEmployee, 500), []);
  useEffect(() => {
    if (id) {
      handleDebounce();
    }
  }, [id]);

  return <EmployeeDetail employee={employee} />;
};

export default EmployeeDetailPage;

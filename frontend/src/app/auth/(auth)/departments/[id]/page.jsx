"use client";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import DepartmentForm from "@/app/components/Department/DepartmentForm";
import { useParams, useRouter } from "next/navigation";
import debounce from "@/hook/useDebounceHook";
import { API_BASE_URL } from "@/app/appConfig";

const DepartmentDetailPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [department, setDepartment] = useState(null);

  const fetchDepartment = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/departments/${id}`);
      setDepartment(response.data);
    } catch (error) {
      console.error("Error fetching department:", error);
    }
  };

  const debounceFunc = useCallback(debounce(fetchDepartment, 500), []);

  useEffect(() => {
    if (id) {
      debounceFunc();
    }
  }, [id]);

  return (
    <div>
      <h1>{department ? "Edit Department" : "Create Department"}</h1>
      <DepartmentForm
        department={department}
        onSuccess={() => router.push("/auth/departments")}
      />
    </div>
  );
};

export default DepartmentDetailPage;

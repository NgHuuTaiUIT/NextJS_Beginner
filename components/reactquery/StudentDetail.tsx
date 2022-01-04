import axiosClient from "@/api/axios-client";
import React from "react";
import { useMutation, useQuery } from "react-query";

interface StudentDetailProps {
  studentId: string;
}

export const StudentDetail = ({ studentId }: StudentDetailProps) => {
  const { data, isLoading } = useQuery(
    ["/student", studentId],
    () => axiosClient.get(`/students/${studentId}`),
    {
      staleTime: 5000,
      retry: 0,
      cacheTime: 600000,
      onSuccess: () => console.log("Fetching data thành công"),
      onError: () => console.log("Fetching data lỗi")
    }
  );

  const { mutate: addNewStudent } = useMutation(newStudent => {
    return axiosClient.post(`/students/${studentId}`, newStudent);
  });
  const handleMutateClick = () => {
    addNewStudent({ name: "Essay" } as any);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {(data as any)?.name}
      <button onClick={handleMutateClick}>Mutate</button>
    </div>
  );
};

import { StudentDetail } from "@/components/reactquery";
import React, { useState } from "react";

export default function QueryPage() {
  const [detailList, setDetailList] = useState([1, 2, 3]);
  function handleAddClick() {
    setDetailList(prevList => [...prevList, 1]);
  }

  return (
    <div>
      <h1>React Query Playground</h1>
      <button onClick={handleAddClick}>Click</button>
      <ul>
        {detailList.map((detail, index) => (
          <li key={index}>
            <StudentDetail studentId="sktwi1cgkkuif36f3" />
          </li>
        ))}
      </ul>
    </div>
  );
}

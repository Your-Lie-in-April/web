import { useEffect, useState } from "react";

export type ProjectData = {
  projectId: number;
  title: string;
  description: string;
};

const useProjectList = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);

  useEffect(() => {
    fetch("/v1/projects/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("API 호출 실패");
        }
        return response.json();
      })
      .then((data) => setProjects(data.data))
      .catch((error) => console.error("에러 발생:", error));
  }, []);

  return projects;
};

export default useProjectList;

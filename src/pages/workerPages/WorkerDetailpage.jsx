import React, { useState, useEffect } from "react";
import "./styles/WorkerDetailpage.css";
import axios from "axios";
import Cookies from "js-cookie";
import config from "../../config";

export default function WorkerDetailpage() {
  const [projects, setProjects] = useState(null);
  const [projectID, setProjectID] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [projectDetails, setProjectDetails] = useState(null); // State to store project details for editing
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(false); // State for loading indication

  useEffect(() => {
    const authData = Cookies.get("authData");

    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      setUserInfo(parsedAuthData);

      // Fetch all projects
      fetchProjects(parsedAuthData.token);
    }
  }, []);

  const fetchProjects = async (token) => {
    try {
      setLoading(true); // Set loading state
      const response = await axios.get(`${config.backendUrl}/api/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(response.data);
    } catch (error) {
      setError("Failed to fetch projects.");
      console.error(error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleChange = async (e) => {
    const selectedProjectId = e.target.value;
    setProjectID(selectedProjectId);

    if (userInfo) {
      try {
        const response = await axios.get(
          `${config.backendUrl}/api/details/project/${selectedProjectId}`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        setProjectDetails(response.data); // Update project details state
      } catch (error) {
        setError("Failed to fetch project details.");
        console.error(error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Parse input values as integers before setting state
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value ? parseInt(value, 10) : "", // Convert to integer or set to empty if value is empty
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (projectID && projectDetails) {
      // Создаем объект только с необходимыми полями
      const updateData = {
        id: parseInt(projectID),
        project_id: projectDetails.project_id, // Убедитесь, что это поле правильно задано в state
        paid_materials: projectDetails.paid_materials,
        necessary_materials: projectDetails.necessary_materials,
        deadline_days: projectDetails.deadline_days,
        completion_days: projectDetails.completion_days,
        project_price: projectDetails.project_price || projectDetails.price, // Используйте project_price, если это поле необходимо
      };

      console.log(updateData); // Проверяем, что данные выглядят корректно
      try {
        await axios.patch(`${config.backendUrl}/api/details`, updateData, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        alert("Успешно");
        // Optionally, refresh project details or show a success message
      } catch (error) {
        setError("Failed to update project details.");
        console.error(error);
      }
    }
  };

  return (
    <div className="workerDetail">
      <div className="workerDetail-container">
        {error && <div className="error-message">{error}</div>}{" "}
        {/* Error message display */}
        <label className="workerDetail-label" htmlFor="">
          Выберите проект
        </label>
        <select
          className="workerDetail-select"
          defaultValue={""}
          onChange={handleChange}
        >
          <option value="">Выберите Проект</option>
          {projects &&
            projects.map((project) => (
              <option key={project.ID} value={project.ID}>
                {project.title} (ID: {project.ID})
              </option>
            ))}
        </select>
        {loading && <div>Loading project details...</div>}{" "}
        {/* Loading indication */}
        {projectDetails && (
          <form onSubmit={handleSubmit}>
            <h2 className="workerDetail-header">Детали проекта</h2>
            <div>
              <label className="workerDetail-label">
                Оплаченные материалы:
              </label>
              <input
                className="workerDetail-input"
                type="number"
                name="paid_materials"
                value={projectDetails.paid_materials || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="workerDetail-label">
                Необходимые материалы:
              </label>
              <input
                className="workerDetail-input"
                type="number"
                name="necessary_materials"
                value={projectDetails.necessary_materials || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="workerDetail-label">Оплаченные работы:</label>
              <input
                className="workerDetail-input"
                type="number"
                name="paid_work"
                value={projectDetails.paid_work || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="workerDetail-label">Необходимые работы:</label>
              <input
                className="workerDetail-input"
                type="number"
                name="necessary_work"
                value={projectDetails.necessary_work || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="workerDetail-label">Сроки (дни):</label>
              <input
                className="workerDetail-input"
                type="number"
                name="deadline_days"
                value={projectDetails.deadline_days || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="workerDetail-label">Дни до завершения:</label>
              <input
                className="workerDetail-input"
                type="number"
                name="completion_days"
                value={projectDetails.completion_days || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="workerDetail-label">Цена проекта:</label>
              <input
                className="workerDetail-input"
                type="number"
                name="project_price" // Убедитесь, что это имя совпадает с тем, что ожидает ваш API
                value={
                  projectDetails.project_price || projectDetails.price || ""
                }
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="workerDetail-button">
              Сохранить изменения
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

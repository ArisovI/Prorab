import React, { useState, useEffect } from "react";
import "./styles/ManagerFifthpage.css";
import config from "../../config";
import axios, { all } from "axios";
import Cookies from "js-cookie";

export default function ManagerFifthpage() {
  const [userInfo, setUserInfo] = useState(null);
  const [projects, setProjects] = useState([]);
  const [projectID, setProjectID] = useState("");
  const [job, setJob] = useState("");
  const [necessaryMoney, setNecessaryMoney] = useState("");
  const [paidMoney, setPaidMoney] = useState("");
  const [deadline, setDeadline] = useState("");
  const [progress, setProgress] = useState("");
  const [status, setStatus] = useState("");
  const [position, setPosition] = useState("");
  const [allPrice, setAllPrice] = useState("");

  useEffect(() => {
    const authData = Cookies.get("authData");
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      setUserInfo(parsedAuthData);

      axios
        .get(`${config.backendUrl}/api/projects`, {
          headers: {
            Authorization: `Bearer ${parsedAuthData.token}`,
          },
        })
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  // Валидация данных перед отправкой
  const validateFormData = () => {
    if (!projectID) {
      alert("Требуется идентификатор проекта");
      return false;
    }
    if (!job.trim()) {
      alert("Требуется название работы");
      return false;
    }
    if (!position || isNaN(position)) {
      alert("Позиция должна быть числом");
      return false;
    }
    if (!necessaryMoney || isNaN(necessaryMoney)) {
      alert("Необходимая сумма должна быть числом");
      return false;
    }
    if (!paidMoney || isNaN(paidMoney)) {
      alert("Выплаченная сумма должна быть числом");
      return false;
    }
    if (!progress || isNaN(progress)) {
      alert("Прогресс должен быть числом");
      return false;
    }
    if (!status.trim()) {
      alert("Требуется статус");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateFormData()) {
      console.log(
        "Данные формы недействительны. Пожалуйста, исправьте ошибки."
      );
      return;
    }

    // Собираем данные в объект
    const formData = {
      project_id: parseInt(projectID),
      job,
      position: parseInt(position),
      necessary_money: parseInt(necessaryMoney),
      paid_money: parseInt(paidMoney),
      deadline: deadline, // Если формат даты не важен, можно передавать null
      done_part: parseInt(progress),
      status,
    };

    // Логирование данных перед отправкой
    console.log("Prepared form data for submission:", JSON.stringify(formData));

    axios
      .post(`${config.backendUrl}/api/states`, formData, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json", // Указываем формат JSON
        },
      })
      .then((response) => {
        console.log("Submitted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Submission failed:", error);
      });
  };

  // Обработчик изменения поля
  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  return (
    <div className="managerFifthpage">
      <div className="fifth-container">
        <h2>Детали проекта</h2>
        <select
          value={projectID}
          onChange={(e) => setProjectID(e.target.value)}
        >
          <option value="" disabled>
            Выбрать проект
          </option>
          {projects &&
            projects.map((project) => (
              <option key={project.ID} value={project.ID}>
                {project.title} ID {project.ID}
              </option>
            ))}
        </select>
        <label>Название работы</label>
        <input type="text" value={job} onChange={handleInputChange(setJob)} />
        <label>Позиция</label>
        <input
          type="text"
          value={position}
          onChange={handleInputChange(setPosition)}
        />
        <label>Стоимость</label>
        <input
          type="text"
          value={necessaryMoney}
          onChange={handleInputChange(setNecessaryMoney)}
        />
        <label>Заплачено</label>
        <input
          type="text"
          value={paidMoney}
          onChange={handleInputChange(setPaidMoney)}
        />
        <label>Дедлайн</label>
        <input
          type="text"
          value={deadline}
          onChange={handleInputChange(setDeadline)}
        />
        <label>Прогресс в процентах</label>
        <input
          type="text"
          value={progress}
          onChange={handleInputChange(setProgress)}
        />
        <label>Статус</label>
        <input
          type="text"
          value={status}
          onChange={handleInputChange(setStatus)}
        />
        <label>Стоимость проекта</label>
        <button onClick={handleSubmit}>Отправить?</button>
      </div>
    </div>
  );
}

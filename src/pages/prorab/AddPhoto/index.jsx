import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import config from "../../../config";
import styles from "./AddPhoto.module.scss";

export const AddPhoto = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [folders, setFolders] = useState([]);
  const [title, setTitle] = useState("");
  const [folderID, setFolderID] = useState(null);
  const [file, setFile] = useState(null);

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
        .then((response) => setProjects(response.data))
        .catch((error) => console.log(error));
    }
  }, []);

  const handleProjectChange = (e) => {
    const projectId = e.target.value;
    setSelectedProjectId(projectId);

    if (projectId) {
      axios
        .get(`${config.backendUrl}/api/photo-folder/project/${projectId}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        })
        .then((response) => {
          setFolders(response.data.data);
          console.log("Folders loaded:", response.data.data);
        })
        .catch((error) => console.log(error));
    }
  };

  const sendPhotoToServer = async () => {
    if (!title || !file || !selectedProjectId || !folderID) {
      alert("Пожалуйста, заполните все поля перед загрузкой.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append("projectID", selectedProjectId);
    formData.append("folderID", folderID);

    const authData = Cookies.get("authData");
    if (authData) {
      const parsedAuthData = JSON.parse(authData);

      try {
        await axios.post(`${config.backendUrl}/api/photos`, formData, {
          headers: {
            Authorization: `Bearer ${parsedAuthData.token}`,
          },
        });
        alert("Успешно добавлен");
      } catch (error) {
        console.error("Ошибка при загрузке:", error);
        alert("Ошибка при загрузке. Пожалуйста, попробуйте еще раз.");
      }
    }
  };
  return (
    <div>
      <div className={styles.managerPhotoDetail}>
        <div className={styles["managerPhotoDetail-firstContainer"]}>
          <label>Выберите проект</label>
          <select
            onChange={handleProjectChange}
            value={selectedProjectId || ""}
          >
            <option value="">-- Выберите проект --</option>
            {projects.map((project) => (
              <option key={project.ID} value={project.ID}>
                {project.title} (ID: {project.ID})
              </option>
            ))}
          </select>

          <label>Выберите папку</label>
          {selectedProjectId && folders.length > 0 ? (
            <div className={styles["managerPhotoDetail-secondContainer"]}>
              <select onChange={(e) => setFolderID(e.target.value)}>
                <option value="">-- Выберите папку --</option>
                {folders.map((folder) => (
                  <option key={folder.ID} value={folder.ID}>
                    {folder.title} (ID: {folder.ID})
                  </option>
                ))}
              </select>
            </div>
          ) : selectedProjectId && folders.length === 0 ? (
            <p>Нет доступных папок для этого проекта.</p>
          ) : null}

          <input type="text" onChange={(e) => setTitle(e.target.value)} />
          <label> Выберите фото</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button className={styles.btn} onClick={sendPhotoToServer}>
            Загрузить фото
          </button>
        </div>
      </div>
    </div>
  );
};

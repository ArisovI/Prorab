import React from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import styles from "./Home.module.scss";

export const HomeProrab = () => {
  return (
    <div className={styles.home}>
      <nav className={styles.nav}>
        <h1>Панель прораба</h1>
        <NavLink
          to="/prorab/add-description"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          Добавить описание
        </NavLink>
        <NavLink
          to="/prorab/resfresh-stage"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          Обновить стадию
        </NavLink>
        <NavLink
          to="/prorab/update-stage"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          Обновить этап
        </NavLink>
        <NavLink
          to="/prorab/add-photo-folder"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          Добавить папку фото
        </NavLink>
        <NavLink
          to="/prorab/add-photo"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          Добавить фото
        </NavLink>
        <NavLink
          to="/prorab/add-documents-folder"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          Добавить папку документов
        </NavLink>
        <NavLink
          to="/prorab/add-documents"
          className={({ isActive }) => (isActive ? styles.activeLink : "")}
        >
          Добавить документ
        </NavLink>
      </nav>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

import React from "react";
import "./styles/Sidebar.css";
import { Link } from "react-router-dom";
import { useUser } from "../UserContext";

export default function Sidebar() {
  const { userRole } = useUser();

  return (
    <div className="sidebar">
      {userRole === "client" && (
        <nav className="navbar">
          <Link to="/firstPage">
            <svg
              width="63"
              height="57"
              viewBox="0 0 63 57"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 20.4167L31.5 3L60 20.4167"
                stroke="#000"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M53.6678 31.5V51.7667C53.6678 52.8161 52.8172 53.6667 51.7678 53.6667H11.2345C10.1851 53.6667 9.33447 52.8161 9.33447 51.7667V31.5"
                stroke="#000"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Главная страница
          </Link>
          <Link to="/contacts">
            <svg
              width="62"
              height="51"
              viewBox="0 0 62 51"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.875 47.6001V8.57501C30.875 5.49602 33.3709 3 36.45 3H57.0776C58.0013 3 58.7501 3.74881 58.7501 4.6725V41.2287"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
              />
              <path
                d="M30.8751 47.6001V8.57501C30.8751 5.49602 28.3791 3 25.3001 3H4.6725C3.74881 3 3 3.74881 3 4.6725V41.2287"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
              />
              <path
                d="M36.4502 42.0249H58.7502"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
              />
              <path
                d="M25.3001 42.0249H3"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
              />
              <path
                d="M30.875 47.5999C30.875 44.5208 33.3709 42.0249 36.45 42.0249"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M30.8758 47.5999C30.8758 44.5208 28.3799 42.0249 25.3008 42.0249"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Контакты
          </Link>
          <Link to="/state">
            <svg
              width="55"
              height="55"
              viewBox="0 0 55 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.312 24.437L27.4995 33.6245L51.9995 9.12451"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M52 27.5C52 41.031 41.031 52 27.5 52C13.969 52 3 41.031 3 27.5C3 13.969 13.969 3 27.5 3C30.4011 3 33.1843 3.50421 35.7669 4.42976"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Детали ремонта
          </Link>
          <Link to="details">
            <svg
              width="55"
              height="48"
              viewBox="0 0 55 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.7285 7.23438H52.0004"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3 6.62967L5.41978 9.04941L11.4692 3"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3 24.7776L5.41978 27.1974L11.4692 21.1479"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3 42.9265L5.41978 45.3463L11.4692 39.2969"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.7285 25.3823H52.0004"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.7285 43.5308H52.0004"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Стадия работ
          </Link>
          <Link to="/photos">
            <svg
              width="56"
              height="51"
              viewBox="0 0 56 51"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 43V18C3 15.2386 5.23857 13 8 13H9.25C10.8238 13 12.3057 12.259 13.25 11L18.8 3.6C19.0833 3.2223 19.5279 3 20 3H36C36.4722 3 36.9168 3.2223 37.2 3.6L42.75 11C43.6942 12.259 45.1763 13 46.75 13H48C50.7615 13 53 15.2386 53 18V43C53 45.7615 50.7615 48 48 48H8C5.23857 48 3 45.7615 3 43Z"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M28 37.9995C33.5227 37.9995 38 33.5223 38 27.9995C38 22.4768 33.5227 17.9995 28 17.9995C22.4771 17.9995 18 22.4768 18 27.9995C18 33.5223 22.4771 37.9995 28 37.9995Z"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Фотография
          </Link>
          <Link to="/documents">
            <svg
              width="54"
              height="56"
              viewBox="0 0 54 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.5591 31.5059C11.5296 31.5059 10.7061 32.3294 10.7061 33.153C10.7061 34.1825 11.5296 34.8002 12.5591 34.8002H26.9736C28.003 34.8002 28.8266 33.9766 28.8266 33.153C28.8266 32.1236 28.003 31.5059 26.9736 31.5059H12.5591Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.35251 52.304C4.32304 52.304 3.49947 51.4804 3.49947 50.6568V5.35475C3.49947 4.32528 4.32304 3.70757 5.35251 3.70757H44.8893C45.9188 3.70757 46.7423 4.53115 46.7423 5.35475V41.3903L48.1836 39.9489C48.8013 39.3313 49.625 38.9195 50.2426 38.7136L50.2436 3.50075C50.2436 1.6477 48.5964 0 46.7428 0H3.50075C1.64718 0 0 1.64718 0 3.50075V52.3028C0 54.1558 1.64718 55.8035 3.50075 55.8035H38.9189L35.2123 52.3028L5.35251 52.304Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M39.7398 26.1521C39.7398 25.1226 38.9162 24.5049 37.8868 24.5049H12.5591C11.5296 24.5049 10.7061 25.3285 10.7061 26.1521C10.7061 27.1815 11.5296 27.7992 12.5591 27.7992H37.6814C38.9168 28.0051 39.7403 27.1816 39.7403 26.1521H39.7398Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.5591 21.0048H26.9736C28.003 21.0048 28.8266 20.1812 28.8266 19.3576C28.8266 18.3282 28.003 17.7104 26.9736 17.7104H12.5591C11.5296 17.7104 10.7061 18.534 10.7061 19.3576C10.9114 20.1812 11.7355 21.0048 12.5591 21.0048Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M37.8868 10.5029H12.5591C11.5296 10.5029 10.7061 11.3265 10.7061 12.1501C10.7061 13.1796 11.5296 13.7973 12.5591 13.7973H37.6814C38.7109 13.7973 39.5345 12.9737 39.5345 12.1501C39.7404 11.327 38.9168 10.5029 37.8873 10.5029H37.8868Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M53.537 42.4203C52.9194 41.8026 51.684 41.8026 51.0657 42.4203L43.2413 49.833L39.123 45.9205C38.2994 45.3028 37.2699 45.3028 36.4458 45.9205C35.6222 46.5382 35.6222 47.7736 36.4458 48.3918L41.7996 53.5396C42.0055 53.7455 42.2114 53.9514 42.4173 53.9514C43.035 54.1573 43.8586 54.1573 44.4762 53.5396L53.5365 44.8911C54.1547 44.2734 54.1547 43.038 53.537 42.4203Z"
                fill="black"
              />
            </svg>
            Документы
          </Link>
        </nav>
      )}

      {userRole === "manager" && (
        <nav className="navbar">
          <Link to="/managerFirstpage">Все сотрудники</Link>
          <Link to="/managerSecondpage">Добавить пользователя</Link>
          <Link to="/managerThirdPage">Добавить роль</Link>
          <Link to="/managerFourthPage">Добавить проект</Link>
          <Link to="/managerFifthPage">Добавить этап</Link>
          <Link to="/managerSixthPage">Добавить стадию</Link>
          <Link to="/managerSevenPage">Добавить описание</Link>
          <Link to="/managerPermissions">Добавить Возможности</Link>
        </nav>
      )}

      {userRole === "worker" && (
        <nav className="navbar">
          <Link to="/workerCharsPage">Добавить описание</Link>
          <Link to="/workerStadePage">Обновить стадию</Link>
          <Link to="/workerDetailPage">Обновить этап</Link>
          <Link to="/workerPhotoPage">Добавить папку фото</Link>
          <Link to="/workerPhotoDetailPage">Добавить фото</Link>
          <Link to="/workerDocumentFolderPage">Добавить папку документов</Link>
          <Link to="/workerDocumentDetailPage">Добавить документ</Link>
        </nav>
      )}

      {userRole === "prorab" && (
        <nav className="navbar">
          <Link to="/add-description">Добавить описание</Link>
          <Link to="/resfresh-stage">Обновить стадию</Link>
          <Link to="/workerDetailPage">Обновить этап</Link>
          <Link to="/update-stage">Добавить папку фото</Link>
          <Link to="/add-photo">Добавить фото</Link>
          <Link to="/add-documents-folder">Добавить папку документов</Link>
          <Link to="/add-documents">Добавить документ</Link>
        </nav>
      )}
    </div>
  );
}
